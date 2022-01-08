import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SettingsInterface} from "../interfaces/settings.interface";
import {TestInterface} from "../../test/interfaces/test.interface";
import {TestEntity} from "../../test/entities/test.entity";

@Entity("Settings")
export class SettingsEntity implements SettingsInterface
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    allow_going_back: boolean;

    @Column()
    show_points_per_question: boolean;

    @Column()
    show_results_overview: boolean;

    // @OneToMany(() => TestEntity, test => test.settings)
    // tests: TestInterface[];

}