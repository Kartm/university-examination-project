import {Injectable} from "@nestjs/common";
import {CommonApi} from "../../APIHelpers/CommonApi";
import {SettingsInterface} from "./interfaces/settings.interface";

@Injectable()
export class SettingsService
{
    settings : SettingsInterface[] = [];


    getAllSettings() {
        return this.settings;
    }

    getOneSettings(id: string) {
        return CommonApi.findEntity(id, this.settings)[0];
    }

    addSettings(settings: SettingsInterface) {
        return CommonApi.addEntity(settings, this.settings);
    }

    removeOneSetting(id: string) {
        return CommonApi.removeEntity(id, this.settings);
    }

    deleteAllSettings() {
        return CommonApi.removeAllEntities(this.settings);
    }

    updateSettings(id: string, newSettings: SettingsInterface) {
        const [settings, index] = CommonApi.findEntity(id, this.settings);
        if(newSettings.show_results_overview !== undefined)
        {
            settings.show_results_overview = !!newSettings.show_results_overview;
        }
        if(newSettings.allow_going_back !== undefined)
        {
            settings.allow_going_back = !!newSettings.allow_going_back;
        }
        if(newSettings.show_points_per_question !== undefined)
        {
            settings.show_points_per_question = !!newSettings.show_points_per_question;
        }
        this.settings[index] = settings;
        return settings;
    }
}