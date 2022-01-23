import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ownerEntity } from 'src/entity/owner.entity';
import { OwnerInterface } from './interfaces/owner.interface';
import { ownerService } from './owner.service';

@Controller('owner')
export class OwnerController {
  constructor(private ownerService: ownerService) {}

  @Get()
  getAllOwners() {
    return this.ownerService.getAllowner();
  }

  @Get(':id')
  getOneOwner(@Param('id') owner: ownerEntity) {
    return this.ownerService.getOneowner(owner);
  }

  @Post()
  addOwner(@Body() owner: OwnerInterface) {
    return this.ownerService.addOwner(owner);
  }

  @Delete()
  removeAllOwner() {
    return this.ownerService.removeAllowner();
  }

  @Delete(':id')
  removeOneOwner(@Param('id') owner: ownerEntity) {
    return this.ownerService.removeOneowner(owner);
  }

  @Patch(':id')
  updateOwner(@Param('id') owner: OwnerInterface, @Body() newOwner: OwnerInterface) {
    return this.ownerService.updateowner(owner, newOwner);
  }
}
