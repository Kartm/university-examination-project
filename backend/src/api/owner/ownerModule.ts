import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ownerEntity } from 'src/entity/owner.entity';
import { OwnerController } from './owner.controller';
import { ownerService } from './owner.service';

@Module({
  imports: [TypeOrmModule.forFeature([ownerEntity])],
  controllers: [OwnerController],
  providers: [ownerService],
})
export class OwnerModule {}
