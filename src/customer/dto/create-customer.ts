import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDto {
    @ApiProperty({description: 'Customer name'})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({description: 'Customer Email'})
    @IsNotEmpty()
    @IsString()
    email: string;

}