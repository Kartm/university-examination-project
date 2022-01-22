import {Injectable} from "@nestjs/common";
import {TestInterface} from "./interfaces/test.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";
import * as nodemailer from "nodemailer"
import {ParticipantInterface} from "../participant/interfaces/participant.interface";
import {v4 as uuidv4} from "uuid";
import {LinkInterface} from "../link/interface/link.interface";
import {ParticipantService} from "../participant/participant.service";
import {ParticipantController} from "../participant/participant.controller";
import {LinkService} from "../link/link.service";
import {constants} from "http2";
import HTTP_STATUS_NOT_ACCEPTABLE = module
import HTTP_STATUS_METHOD_NOT_ALLOWED = module

@Injectable()
export class TestService {

    static tests: TestInterface[] = [];


    static getAllTests() {

        return this.tests;
    }



    static addTest(test: TestInterface) {

        return CommonApi.addEntity(test, this.tests)
    }


     generateLinks (test_id : string)
    {
        const participants : ParticipantInterface[] = this.getParticipantsFromDatabase(test_id);
        participants.forEach(participant => {

            const linkGuid = uuidv4();
            const link : LinkInterface = {
                id: linkGuid,
                participant_id: participant.id,
                used: false,
                sent_at: Date.now().toString(),
                link: linkGuid,
            };
            this.saveLinkInDatabase(link);
            this.sendMail(link.link, participant.email);
        })
    }

   getParticipantsFromDatabase(test_id : string)
    {
        return ParticipantService.participants.filter(participant => participant.test_id === test_id);
    }


    sendMail(link : string, email : string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                //TODO change mail
                user: 'berkaymertkocak99@gmail.com',
                pass: 'okclkwhxjnojpmhn'
            }
        });

        const mailOptions = {
            from: 'berkaymertkocak99@gmail.com',
            to: `${email}`,
            subject: 'Sending Email using Node.js',
            text: `http://localhost:3000/api/link/${link}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    static getOneTest(id: string, userId: string) : TestInterface {
        // this.generateLinks(id);
        const test =  CommonApi.findEntity(id, this.tests)[0];
        if(test.owner_id === id)
        {
            return test;
        }

        if(TestService.hasStarted(test))
        {
            return test;
        }

        return new HTTP_STATUS_METHOD_NOT_ALLOWED();
    }

    private static hasStarted(test)
    {
        //TODO implement test start time in Test
        return true;
    }

    static updateTest(id: string, newTest: TestInterface) {
        const test : TestInterface = CommonApi.findEntity(id, this.tests)[0];
        if(newTest.settings_id)
        {
            test.settings_id = newTest.settings_id
        }
        if (newTest.name) {
            test.name = newTest.name;
        }
        if(newTest.owner_link)
        {
            test.owner_link = newTest.owner_link;
        }
        this.tests[id] = test;
        return test;
    }

    static removeTest(id: string) {
        CommonApi.removeEntity(id, this.tests)
    }

     saveLinkInDatabase(link: LinkInterface) {
        LinkService.links.push(link);
    }

}