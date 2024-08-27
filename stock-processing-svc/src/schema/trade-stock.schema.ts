import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {} from 'mongoose';

@Schema()
export class TradeStock {
  @Prop({ required: true })
  ticker: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  vol: number;
}

export const TradeStockSchema = SchemaFactory.createForClass(TradeStock);
