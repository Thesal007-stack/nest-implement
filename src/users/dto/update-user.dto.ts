import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Add this

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class UpdateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
    minLength: 2,
  })
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john_doe',
    description: 'Unique username (alphanumeric only)',
    minLength: 3,
  })
  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have at least 3 characters' })
  @IsAlphanumeric(undefined, {
    message: 'Username allows only alphanumeric characters',
  })
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Valid email address',
  })
  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Please provide a valid email' })
  email: string;

  @ApiProperty({
    example: 30,
    description: 'Age of the user',
    type: Number,
  })
  @IsInt()
  age: number;

  @ApiProperty({
    example: 'm',
    enum: ['f', 'm', 'u'],
    description: 'Gender: f (female), m (male), u (unknown)',
  })
  @IsString()
  @IsEnum(['f', 'm', 'u'])
  gender: string;

  @ApiProperty({
    example: 'NewP@ssw0rd!',
    description:
      'Password (8-20 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char)',
  })
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message:
      'Password must contain 8-20 characters with uppercase, lowercase, number, and special character',
  })
  password: string;
}
