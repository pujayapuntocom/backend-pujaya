import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { AuctionsController } from './auctions.controller';
import { AuctionsRepository } from './auctions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auction])],
  controllers: [AuctionsController],
  providers: [AuctionsService, AuctionsRepository],
})
export class AuctionsModule {}
