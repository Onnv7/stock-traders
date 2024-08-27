export class StockCardEntity {
  ticker: string | undefined;
  data:
    | {
        close: number;
        date: string;
      }[]
    | undefined;
  vol: number | undefined;
  growthRate: number | undefined;
}

export class StockCardPageEntity {
  cardList: StockCardEntity[] | undefined;
  totalPage: number | undefined;
}

export class StockChartEntity {
  x: Date | undefined;
  y: number[] | undefined;
}

export class StockCurrentChartEntity {
  vol: number | undefined;
  growthRate: number | undefined;
}
