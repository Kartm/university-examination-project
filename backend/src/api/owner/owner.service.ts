import { Injectable, NotFoundException } from '@nestjs/common';
import { OwnerInterface } from './interfaces/owner.interface';
import { CommonApi } from '../../APIHelpers/CommonApi';
import { InjectRepository } from '@nestjs/typeorm';
import { ownerEntity } from 'src/entity/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ownerService {
  constructor(
    @InjectRepository(ownerEntity)
    private testRepository: Repository<ownerEntity>,
  ) {}
  owners: OwnerInterface[] = [];

  async getAllowner(): Promise<ownerEntity[]> {
    return await this.testRepository.find();
  }

  async getOneowner(owner: OwnerInterface) {
    return await this.testRepository.findOne(owner);
  }

  async addOwner(owner: OwnerInterface) {
    const newOwner = this.testRepository.create(owner);
    await this.testRepository.save(newOwner);
    return newOwner;
  }

  async removeAllowner() {
    const allOwners = await this.testRepository.find();
    allOwners.forEach(e => {
      this.testRepository.delete(e);
    });
  }

  async removeOneowner(owner: ownerEntity) {
    const deletedUser = await this.testRepository.findOne(owner);
    if (!deletedUser) {
      throw new NotFoundException('Owner is not found');
    }
    await this.testRepository.delete(owner);
    return {
      message: `${deletedUser.name} deleted successfully`,
    };
  }

  async updateowner(owner: OwnerInterface, editedOwner: OwnerInterface) {
    const existingOwner = await this.testRepository.findOne(owner);
    if (!existingOwner) {
      throw new NotFoundException('Owner is not found');
    }
    existingOwner.name = editedOwner.name;
    await this.testRepository.save(existingOwner);
    return editedOwner;
  }
}
