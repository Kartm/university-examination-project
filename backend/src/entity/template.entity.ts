import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { TemplateInterface } from '../api/template/interfaces/template.interface';
import { settingsEntity } from './settings.entity';

@Entity("template")
export class templateEntity implements TemplateInterface {

    @PrimaryGeneratedColumn('uuid')
    template_id: string;

    @OneToOne(() => settingsEntity)
    @JoinColumn()
    setting: settingsEntity

    @Column({length:45})
    name: string;
    
}
