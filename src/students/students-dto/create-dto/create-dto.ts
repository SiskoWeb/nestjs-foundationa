import { IsString, IsNumber, Length, isArray } from 'class-validator';

export class CreateDto {
  @IsString({ message: 'should be string' })
  // @Length(6, 20, { groups: ['create'] }) // if you want use this you need add validatpipes to controller not global with groups:['create']
  // @Length(2, 20, { groups: ['update'] }) // if you want add defrent requireds to create or update ...
  @Length(2, 20)
  readonly name: string;
  @IsNumber({}, { message: 'should be number' })
  readonly age: number;

  readonly address: string[];
}
// @IsNumber({}, { message: 'shoud' })
// @IsString({ message: 'should be string' })
// @IsString({ each: true })
// readonly name: string[];
