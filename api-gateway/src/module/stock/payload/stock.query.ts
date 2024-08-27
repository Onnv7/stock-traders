import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { getCurrentDateFormatted } from '../../../common/util/date.util';
import { CharFilterDateType } from '../../../common/enum/enum';

export class GetStockPageQuery {
  @IsOptional()
  @IsString()
  date: string = getCurrentDateFormatted();

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  size: number = 10;

  @IsOptional()
  @IsString()
  @Type(() => String)
  ticker: string;
}

export class GetStockDetailCurrentQuery {
  @IsNotEmpty()
  @Type(() => String)
  ticker: string;
}

export class GetStockCardListQuery {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  size: number = 10;
}

export class GetStockHistoryQuery {
  @IsString()
  @Type(() => String)
  ticker: string;

  // @IsOptional()
  // @IsEnum(CharFilterDateType)
  // filter: CharFilterDateType;
}
