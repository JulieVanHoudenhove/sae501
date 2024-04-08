import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateVariantDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiProperty({ required: false })
    material?: string;

    @ApiProperty({ required: false })
    textureImage?: string;

    @ApiProperty()
    productId: number;

    materialFile?: File;

    textureFile?: File;
}
