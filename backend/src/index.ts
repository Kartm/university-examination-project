import { createConnection } from "typeorm";
//import express from 'express';
import { questionTypeEntity } from './entity/questionType.entity';

//const app =  express();

createConnection({
    type: 'mysql',
    database: "myStarterDatabase",
    username: "yourUser",
    password: "password",
    synchronize: true,
    entities: []
})
