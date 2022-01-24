import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { settingsEntity } from 'src/entity/settings.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(settingsEntity)
    private testRepository: Repository<settingsEntity>,
  ) {}

  async getAllSettings(): Promise<settingsEntity[]> {
    return await this.testRepository.find();
  }

  async getOneSettings(setting: settingsEntity) {
    return await this.testRepository.findOne(setting);
  }

  async addSettings(settings: settingsEntity) {
    const newSettings = this.testRepository.create(settings);
    await this.testRepository.save(newSettings);
    return newSettings;
  }

  async removeOneSetting(setting: settingsEntity) {
    const deletedSetting = await this.testRepository.findOne(setting);
    if (!deletedSetting) {
      throw new NotFoundException('Setting is not found');
    }
    await this.testRepository.delete(setting);
    return {
      message: `${deletedSetting.settings_id} deleted successfully`,
    };
  }

  async deleteAllSettings() {
    const allSettings = await this.testRepository.find();
    allSettings.forEach(e => {
      this.testRepository.delete(e);
    });
  }

  async updateSettings(settings: string, newSettings: settingsEntity) {
    const existingSettings = await this.testRepository.findOne(settings);
    if (!existingSettings) {
      throw new NotFoundException('Setting is not found');
    }
    existingSettings.show_points_per_question = newSettings.show_points_per_question;
    existingSettings.show_results_overview = newSettings.show_results_overview;
    existingSettings.allow_going_back = newSettings.allow_going_back;
    await this.testRepository.save(existingSettings);
    return newSettings;
  }
}
