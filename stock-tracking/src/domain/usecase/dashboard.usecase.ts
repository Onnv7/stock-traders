import stockRepository from '../../data/repository/stock';

export const getStockCardList = async (page: number, size: number) => {
  const data = await stockRepository.getStockCardList(page, size);
  return data;
};

export const getStockChart = async (ticker: string) => {
  const data = await stockRepository.getStockChart(ticker);
  return data;
};
