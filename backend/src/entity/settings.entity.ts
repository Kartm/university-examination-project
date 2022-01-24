import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("settings")
export class settingsEntity{

    @PrimaryGeneratedColumn('uuid')
    settings_id: string;

    @Column()
    show_results_overview: boolean;

    @Column()
    allow_going_back: boolean;

    @Column()
    show_points_per_question: boolean;

    
}
