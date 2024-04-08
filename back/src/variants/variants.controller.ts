import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, UploadedFile, UploadedFiles,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {VariantsService} from "./variants.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {VariantEntity} from "./entities/variant.entity";
import {CreateVariantDto} from "./dto/create-variant.dto";
import {Variant as VariantModel} from ".prisma/client";
import {UpdateVariantDto} from "./dto/update-variant.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as path from "path";

@Controller('variants')
@ApiTags('variants')
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([
      { name: 'materialFile', maxCount: 1 },
      { name: 'textureFile', maxCount: 1 },
    ],
      {
        storage: diskStorage({
          destination: 'public/uploads',
          filename: (req, file, cb) => {
            cb(null, path.parse(file.originalname).name + Date.now() + path.parse(file.originalname).ext);
          },
        }),
      })
  )
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: VariantEntity })
  async create(
      @Body() createVariantDto: CreateVariantDto,
      @UploadedFiles() files: { materialFile?: Express.Multer.File[], textureFile?: Express.Multer.File[] }
  ): Promise<VariantModel> {
    createVariantDto.material = files.materialFile[0].path.toString()
    createVariantDto.textureImage = files.textureFile[0].path.toString()
    createVariantDto.productId = Number(createVariantDto.productId)

    return new VariantEntity(await this.variantsService.create(createVariantDto));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: VariantEntity, isArray: true })
  async findAll(): Promise<VariantModel[]> {
    const variants = await this.variantsService.variants({});
    return variants.map((variant) => new VariantEntity(variant))
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: VariantEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<VariantModel> {
    return new VariantEntity(await this.variantsService.variant({id: id}));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: VariantEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateVariantDto: UpdateVariantDto) {
    return new VariantEntity(await this.variantsService.update(id, updateVariantDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: VariantEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new VariantEntity(await this.variantsService.remove({ id: id }));
  }
}