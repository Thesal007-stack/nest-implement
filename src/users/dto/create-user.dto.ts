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
import { ApiProperty } from '@nestjs/swagger';
const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @ApiProperty({
    example: 'Jonh Doe',
    minLength: 2,
    description: 'Full name of the user',
  })
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'jonh123',
    minLength: 3,
    description: 'Unique name (alphanumeric only) ',
    
  })
  @IsNotEmpty()
  @MinLength(3, { message: 'User must have at leas 3 characters' })
  @IsAlphanumeric(undefined, {
    message: 'Username does not allow other that alpha numeric chars.',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'john@email.com',
    description: 'Valid email address',
  })
  @IsEmail(undefined, { message: 'Please provide valid email' })
  email: string;

  @ApiProperty({
    example: 25,
    description: 'Age of the user',
    minimum: 0,
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

  @IsNotEmpty()
  @ApiProperty({
    example: '@Visal123',
    description: 'Password Minimum 8 and maximum 20 characters',
  })
  @Matches(passwordRegEx, {
    message:
      'Password must confirm contain Minimum 8 and maximum 20 characters ',
  })
  password: string;
}
