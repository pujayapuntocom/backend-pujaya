import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Auction } from './entities/auction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
@Injectable()
export class AuctionsRepository {
  constructor(
    @InjectRepository(Auction) private auctionsRepository: Repository<Auction>,
  ) {}

  async createAuction(createAuctionDto: CreateAuctionDto): Promise<Auction> {
    const newAuction = this.auctionsRepository.create(createAuctionDto);
    if (newAuction instanceof Auction) {
      await this.auctionsRepository.save(newAuction);
      return newAuction;
    }
    throw new BadRequestException('La subasta no fue creda');
  }

  async findAll(limit: number, page: number): Promise<Auction[]> {
    const [data] = await this.auctionsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    if (!data) {
      throw new BadRequestException('Error al consultar las subastas');
    }
    return data;
  }

  async findOne(id: string): Promise<Auction> {
    const oneAuction = await this.auctionsRepository.findOneBy({ id });
    if (!oneAuction) {
      throw new BadRequestException(
        'No existe una subasta con el ID suministrado',
      );
    }
    return oneAuction;
  }

  async updateAution(id: string, updateAutionDto: UpdateAuctionDto) {
    const oneAuction = this.findOne(id);
    if (oneAuction instanceof Auction) {
      const oneAuctionUpdate = { oneAuction, ...updateAutionDto };
      await this.auctionsRepository
        .createQueryBuilder()
        .update()
        .set(oneAuctionUpdate)
        .where({ id })
        .execute();
      return `La subasta de ID: ${id} fue actualizado correctamente`;
    }
    throw new BadRequestException('No fue posible actualizar el usuario');
  }

  async deleteAuction(id: string) {
    const oneAuction = this.findOne(id);
    if (oneAuction instanceof Auction) {
      const oneAuctionUpdate = { oneAuction, isActive: false };
      await this.auctionsRepository
        .createQueryBuilder()
        .update()
        .set(oneAuctionUpdate)
        .where({ id })
        .execute();
      return `La subasta de ID: ${id} ya se encuentra inactiva`;
    }
    throw new BadRequestException('No fue posible eliminar la subasta');
  }
}
