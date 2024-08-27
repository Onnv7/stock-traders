import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from '../schema/stock.schema';
import { VNINDEX30_TICKERS } from '../common/constant/data.constant';

@Injectable()
export class StockRepository {
  constructor(@InjectModel(Stock.name) private stockModel: Model<Stock>) {}

  async getStockCardPage(skip: number, limit: number) {
    const totalCount = await this.stockModel.countDocuments().exec();
    return {
      cardList: await this.stockModel.aggregate([
        {
          $match: {
            ticker: { $in: VNINDEX30_TICKERS }, // Kiểm tra xem 'ticker' có nằm trong mảng 'ticketArray' hay không
          },
        },
        {
          $addFields: {
            parsedDate: {
              $toDate: '$date',
            },
          },
        },
        {
          $sort: {
            ticker: 1,
            parsedDate: -1,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $group: {
            _id: '$ticker',
            data: {
              $push: {
                close: '$close',
                date: '$date',
              },
            },
            vol: {
              $last: '$vol',
            },
            closes: {
              $push: '$close',
            },
          },
        },
        {
          $addFields: {
            latestClose: {
              $arrayElemAt: ['$closes', 0],
            },
            previousClose: {
              $arrayElemAt: ['$closes', 1],
            },
          },
        },
        {
          $addFields: {
            growthRate: {
              $cond: {
                if: {
                  $or: {
                    $ne: ['$previousClose', null],
                  },
                },
                then: {
                  $multiply: [
                    {
                      $divide: [
                        {
                          $subtract: ['$latestClose', '$previousClose'],
                        },
                        '$previousClose',
                      ],
                    },
                    100,
                  ],
                },
                else: null,
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            ticker: '$_id',
            data: 1,
            vol: 1,
            growthRate: 1,
          },
        },
      ]),
      totalPage: Math.ceil(totalCount / limit),
    };
  }

  async getStockHistoryByTicker(ticker: string) {
    return (await this.stockModel.aggregate([
      {
        $match: { ticker: ticker },
      },
      { $sort: { createdAt: -1 } },
    ])) as Stock[];
  }
  async getStockPage(
    date: string,
    page: number,
    size: number,
    ticker?: string,
  ) {
    const query: any = { date };
    if (ticker) {
      query.ticker = ticker;
    }

    const totalCount = await this.stockModel.countDocuments(query).exec();

    const offset = (page - 1) * size;
    return {
      data: await this.stockModel.find(query).skip(offset).limit(size),
      totalPage: Math.ceil(totalCount / size),
    };
  }

  async findByTickerAndUpdate(ticker: string, stock: Stock) {
    const currentStock = await this.stockModel.findOne({ ticker }).exec();
    if (!currentStock) {
      await this.stockModel.create(stock);
    }
    const isChanged = Object.keys(stock).some(
      (key) => currentStock[key] !== stock[key],
    );
    if (isChanged) {
      const updatedStock = await this.stockModel
        .findOneAndUpdate(
          { ticker: ticker },
          { $set: { ...stock } },
          { new: true },
        )
        .exec();
    }
  }

  async createStock(stock: Stock): Promise<Stock> {
    return await this.stockModel.create(stock);
  }

  async findAndCreateStock(ticker: string, stock: Stock) {
    const currentStock = await this.stockModel
      .findOne({ ticker: ticker })
      .sort({ created: -1 })
      .exec();
    if (
      currentStock.close !== stock.close ||
      currentStock.high !== stock.high ||
      currentStock.low !== stock.low ||
      currentStock.vol !== stock.vol
    ) {
      await this.stockModel.create(stock);
    }
  }
  async getNewestTickerByName(ticker: string, date: string) {
    return await this.stockModel.findOne({ ticker: ticker, date: date }).exec();
  }
}
