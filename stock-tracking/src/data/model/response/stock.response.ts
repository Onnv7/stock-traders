export type GetCardListResponse = {
  cardList: {
    data: {
      close: number;
      date: string;
    }[];
    vol: number;
    growthRate: number;
    ticker: string;
  }[];
  totalPage: number;
};

export type GetStockHistoryResponse = {
  vol: number;
  growthRate: number;
  data: {
    open: number;
    high: number;
    low: number;
    close: number;
    date: string;
  }[];
};
