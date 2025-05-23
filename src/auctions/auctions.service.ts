import { Injectable } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { AuctionsRepository } from './auctions.repository';

@Injectable()
export class AuctionsService {
constructor(private autionsRepository: AuctionsRepository){}

  create(createAuctionDto: CreateAuctionDto) {
    return this.autionsRepository.createAuction(createAuctionDto);
  }

  findAll(limit: number, page: number) {
    return this.autionsRepository.findAll(limit, page);
  }

  findOne(id: string) {
    return this.autionsRepository.findOne(id);
  }

  update(id: string, updateAuctionDto: UpdateAuctionDto) {
    return this.autionsRepository.updateAution(id, updateAuctionDto);
  }

  remove(id: string) {
    return this.autionsRepository.deleteAuction(id);
  }
}
