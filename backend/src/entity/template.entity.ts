import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TemplateInterface } from '../api/template/interfaces/template.interface';

@Entity("template")
export class templateEntity implements TemplateInterface {

    @PrimaryGeneratedColumn()
    template_id: number;

    @Column()
    settings_id: string;

    @Column({length:45})
    name: string;
    
}
