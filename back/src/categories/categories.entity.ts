import {ApiProperty} from "@nestjs/swagger";
import {Category} from "./entities/category.entity";

export class CategoryEntity implements Category {
    constructor(partial: Partial<CategoryEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}