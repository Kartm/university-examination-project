import {IIdHaver} from "../../../APIHelpers/IIdHaver";

export interface SettingsInterface extends IIdHaver {
    
    show_results_overview?: boolean;
    allow_going_back?: boolean;
    show_points_per_question?: boolean;
}
