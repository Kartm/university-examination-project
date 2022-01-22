import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { SettingsInterface } from '../api/settings/interfaces/settings.interface';

@Entity("settings")
export class settingsEntity implements SettingsInterface {

    @PrimaryGeneratedColumn('uuid')
    settings_id: string;

    @Column()
    show_results_overview: boolean;

    @Column()
    allow_going_back: boolean;

    @Column()
    show_points_per_question: boolean;

    
}
