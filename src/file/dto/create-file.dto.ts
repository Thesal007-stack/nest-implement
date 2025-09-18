import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  minType: string;

  @IsNotEmpty()
  @IsNumber()
  size: number;

  @IsUUID('4', { message: 'folderId must be a valid UUID v4' })
  folderId: string;
}
