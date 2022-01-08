import {TestInterface} from "../../test/interfaces/test.interface";

export interface SettingsInterface
{
    id?: number;
    show_results_overview?: boolean;
    allow_going_back?: boolean;
    show_points_per_question?: boolean;
    tests?: TestInterface[];
}