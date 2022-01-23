import {Injectable} from "@nestjs/common";

import {testEntity} from "../../entity/test.entity";
import {questionAnswerEntity} from "../../entity/questionAnswer.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";



@Injectable()
export class SubmitService {

    constructor(@InjectRepository(questionAnswerEntity) private questionAnswerRepository: Repository<questionAnswerEntity>)
    {

    }




    checkTime(test: testEntity) {
       // const start=  Math.round(new Date().getDate() /1000);
       // const end=   Math.round(test.time_end.getDate() /1000)
       //  const diff = end - start;
       if(new Date()>test.time_end){
           return true;
       }
        // if (diff>0)
        // {
        //     return true;
          else {
            return false; }
    }

    submitAnswer(test: testEntity, answers: questionAnswerEntity[]) {
        if(this.checkTime(test))
        {
            this.submitQuestionAnswerToDatabase(answers);

        } else {
            return alert("Exam has finished, sorry");
        }



    }


    private submitQuestionAnswerToDatabase(answers: questionAnswerEntity[]) {
     this.questionAnswerRepository.save(answers)

    }
}