import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { VariantsModule } from './variants/variants.module';
import { VariantImagesModule } from './variant-images/variant-images.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, CategoriesModule, ProductsModule, VariantsModule, VariantImagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
