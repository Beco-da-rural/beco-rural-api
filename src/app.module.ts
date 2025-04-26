import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from '@config/typeorm.config';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { CategoryModule } from '@modules/category/category.module';
import { ListingController } from './modules/listing/listing.controller';
import { ListingService } from './modules/listing/listing.service';
import { ListingModule } from './modules/listing/listing.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    UserModule,
    AuthModule,
    CategoryModule,
    ListingModule,
  ],
  controllers: [ListingController],
  providers: [ListingService],
})
export class AppModule {}
