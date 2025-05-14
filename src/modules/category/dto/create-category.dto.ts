import { IsNotEmpty, IsString } from 'class-validator';
import { CategoryStatus, CategoryType } from '../category.constant';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  type: CategoryType;

  status?: CategoryStatus;
}
