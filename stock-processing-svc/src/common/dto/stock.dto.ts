export class StockDto {
  ticker: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  vol: number;
  toString() {
    return `${this.close} ${this.open} ${this.high} ${this.low}`;
  }
}
