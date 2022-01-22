import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { SettingsInterface } from '../api/settings/interfaces/settings.interface';

@Entity("settings")
export class settingsEntity implements SettingsInterface {

    @PrimaryGeneratedColumn()
    settings_id: number;

    @Column({length: 45})
    name: string;

    @Column()
    show_results_overview: boolean;

    @Column()
    allow_going_back: boolean;

    @Column()
    show_points_per_question: boolean;

    
}
