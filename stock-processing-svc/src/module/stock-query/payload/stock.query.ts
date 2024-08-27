export class GetStockPageQuery {
  date: string;
  page: number;
  size: number;
  ticker: string;
}

export class GetStockDetailCurrentQuery {
  ticker: string;
}

export class GetStockCardListQuery {
  page: number;
  size: number;
}
export class GetStockHistoryQuery {
  ticker: string;
}
