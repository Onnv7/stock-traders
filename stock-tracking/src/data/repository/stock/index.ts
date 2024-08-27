import { StockAPI } from '../../api/stock.api';
import { StockRepository } from './stock.repository';

const stockApi = new StockAPI();
const stockRepository = new StockRepository(stockApi);

export default stockRepository;
