import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {SettingsService} from "./settings.service";
import {SettingsInterface} from "./interfaces/settings.interface";

@Controller("settings")
export class SettingsController {
<<<<<<< Updated upstream
    constructor(private settingsService: SettingsService) {
    }

    @Get()
    getAllSettings() {

        return this.settingsService.getAllSettings();
    }

    @Get(":id")
    getOneSettings(@Param("id") id: string) {
        return this.settingsService.getOneSettings(id);
    }

    @Post()
    addSettings(@Body() settings: SettingsInterface) {
        return this.settingsService.addSettings(settings);
    }

    @Delete(":id")
    deleteOneSettings(@Param("id") id : string) {
        return this.settingsService.removeOneSetting(id);
    }

    @Delete()
    deleteAllSettings()
    {
        return this.settingsService.deleteAllSettings();
    }

    @Patch(":id")
    updateSettings(@Param("id") id : string, @Body() settings : SettingsInterface)
    {
        return this.settingsService.updateSettings(id, settings);
    }

=======
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
  addSettings(@Body() settings: settingsEntity) {
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
>>>>>>> Stashed changes
}
