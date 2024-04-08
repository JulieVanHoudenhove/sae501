import { Injectable } from '@nestjs/common';
import { CreateVariantImageDto } from './dto/create-variant-image.dto';
import { UpdateVariantImageDto } from './dto/update-variant-image.dto';
import {PrismaService} from "../prisma.service";
import {VariantImage, Prisma} from "@prisma/client";

@Injectable()
export class VariantImagesService {
  constructor(private prisma: PrismaService) {}

  async variantImage(
      variantImageWhereUniqueInput: Prisma.VariantImageWhereUniqueInput,
  ): Promise<VariantImage | null> {
    return this.prisma.variantImage.findUnique({
      where: variantImageWhereUniqueInput,
      include: {
        variant: true,
      },
    });
  }

  async variantImages(params: {
  }): Promise<VariantImage[]> {
    return this.prisma.variantImage.findMany({
      include: {
        variant: true,
      }
    });
  }

  async create(createVariantImageDto: CreateVariantImageDto): Promise<VariantImage> {
    return this.prisma.variantImage.create({
      data: createVariantImageDto,
      include: {
        variant: true,
      },
    });
  }

  async update(
      id: number,
      updateVariantImageDto: UpdateVariantImageDto
  ): Promise<VariantImage> {
    return this.prisma.variantImage.update({
      where: { id },
      data: updateVariantImageDto,
      include: {
        variant: true,
      },
    });
  }

  async remove(where: Prisma.VariantImageWhereUniqueInput): Promise<VariantImage> {
    return this.prisma.variantImage.delete({
      where,
    });
  }
}