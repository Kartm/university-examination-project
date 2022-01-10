import {TestInterface} from "../interfaces/test.interface";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {OwnerInterface} from "../../owner/interfaces/owner.interface";
import {OwnerEntity} from "../../owner/entities/owner.entity";
import {SettingsInterface} from "../../settings/interfaces/settings.interface";
import {SettingsEntity} from "../../settings/entities/settings.entity";

@Entity("Test")
export class TestEntity implements TestInterface
{
    @PrimaryGeneratedColumn()
    id: string;

    // @ManyToOne(() => SettingsEntity, settings => settings.tests, {cascade :true})
    // settings: SettingsInterface;
    //
    // @ManyToOne(() => OwnerEntity, owner => owner.tests, {cascade :true})
    // owner : OwnerInterface;

    @Column()
    name : string;

    @Column()
    owner_link : string;
}