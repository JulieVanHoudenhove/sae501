import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    description?: string;

    @ApiProperty({ required: false })
    image?: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    categoryId: number;
}
