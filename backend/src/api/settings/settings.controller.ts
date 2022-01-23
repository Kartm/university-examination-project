import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsInterface } from './interfaces/settings.interface';
import { settingsEntity } from 'src/entity/settings.entity';

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get()
  getAllSettings() {
    return this.settingsService.getAllSettings();
  }

  @Get(':id')
  getOneSettings(@Param('id') setting: settingsEntity) {
    return this.settingsService.getOneSettings(setting);
  }

  @Post()
  addSettings(@Body() settings: SettingsInterface) {
    return this.settingsService.addSettings(settings);
  }

  @Delete(':id')
  deleteOneSettings(@Param('id') setting: settingsEntity) {
    return this.settingsService.removeOneSetting(setting);
  }

  @Delete()
  deleteAllSettings() {
    return this.settingsService.deleteAllSettings();
  }

  @Patch(':id')
  updateSettings(@Param('id') id: string, @Body() settings: SettingsInterface) {
    return this.settingsService.updateSettings(id, settings);
  }
}
