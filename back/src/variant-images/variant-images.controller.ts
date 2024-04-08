import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ParseIntPipe,
  UploadedFile
} from '@nestjs/common';
import { VariantImagesService } from './variant-images.service';
import { CreateVariantImageDto } from './dto/create-variant-image.dto';
import { UpdateVariantImageDto } from './dto/update-variant-image.dto';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {VariantImage as VariantImageModel} from ".prisma/client";
import {VariantImageEntity} from "./entities/variant-image.entity";
import * as path from "path";
import * as fs from 'fs';

@Controller('variant-images')
@ApiTags('variant-images')
export class VariantImagesController {
  constructor(private readonly variantImagesService: VariantImagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file',
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
  @ApiCreatedResponse({ type: VariantImageEntity })
  async create(
      @Body() createVariantImageDto: CreateVariantImageDto,
      @UploadedFile() file: Express.Multer.File
  ): Promise<VariantImageModel> {
    createVariantImageDto.image = file.path.toString();
    createVariantImageDto.variantId = Number(createVariantImageDto.variantId);

    return new VariantImageEntity(await this.variantImagesService.create(createVariantImageDto));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: VariantImageEntity, isArray: true })
  async findAll(): Promise<VariantImageModel[]> {
    const variants = await this.variantImagesService.variantImages({});
    return variants.map((variant) => new VariantImageEntity(variant))
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: VariantImageEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<VariantImageModel> {
    return new VariantImageEntity(await this.variantImagesService.variantImage({id: id}));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file',
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
  @ApiCreatedResponse({ type: VariantImageEntity })
  async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateVariantImageDto: UpdateVariantImageDto,
      @UploadedFile() file: Express.Multer.File
  ): Promise<VariantImageModel> {
    if (file) {
      const variantImage = new VariantImageEntity(await this.variantImagesService.variantImage({id: id}))
      updateVariantImageDto.image = file.path.toString();

      if (variantImage.image) {
        fs.unlink(variantImage.image, (err) => {
          if (err) {
            console.log(err);
            return err;
          }
        });
      }
    }

    return new VariantImageEntity(await this.variantImagesService.update(id, updateVariantImageDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: VariantImageEntity })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<VariantImageModel> {
    const variantImage = new VariantImageEntity(await this.variantImagesService.remove({id: id}))

    fs.unlink(variantImage.image, (err) => {
      if (err) {
        console.log(err);
        return err;
      }
    });

    return variantImage;
  }
}
