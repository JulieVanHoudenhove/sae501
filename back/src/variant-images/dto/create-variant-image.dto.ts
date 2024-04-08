import {ApiProperty} from "@nestjs/swagger";

export class CreateVariantImageDto {
    @ApiProperty({ required: false })
    image?: string;

    @ApiProperty()
    variantId: number;

    file?: File;
}
