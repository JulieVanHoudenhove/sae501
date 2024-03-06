import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
