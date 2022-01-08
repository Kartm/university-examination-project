import {OwnerInterface} from "../interfaces/owner.interface";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TestInterface} from "../../test/interfaces/test.interface";
import {TestEntity} from "../../test/entities/test.entity";

@Entity("Owner")
export class OwnerEntity implements OwnerInterface
{
    @PrimaryGeneratedColumn()
    id_owner: number;

    @Column()
    name: string;

    // @OneToMany(() => TestEntity, test => test.owner)
    // tests: TestInterface[]

}