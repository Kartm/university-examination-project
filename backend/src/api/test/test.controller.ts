import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TestService } from './test.service';
import { testEntity } from 'src/entity/test.entity';

@Controller('tests')
export class TestsController {
  constructor(private service: TestService) {}

  @Get()
  getAllTests() {
    return this.service.getAllTests();
  }

  @Get(':id')
  getOneTest(@Param('id') test: testEntity) {
    return this.service.getOneTest(test);
  }

  @Post()
  addTest(@Body() test: testEntity) {
    return this.service.addTest(test);
  }

  @Delete(':id')
  removeTest(@Param('id') test: testEntity) {
    return this.service.removeTest(test);
  }

  @Patch(':id')
  updateTest(@Param('id') test: testEntity, @Body() editedTest: testEntity) {
    return this.service.updateTest(test, editedTest);
  }
}
