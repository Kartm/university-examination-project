import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { settingsEntity } from 'src/entity/settings.entity';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [TypeOrmModule.forFeature([settingsEntity])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
