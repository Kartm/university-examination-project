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

@Injectable()
export class TestService {

    tests: TestInterface[] = [];


    getAllTests() {

        return this.tests;
    }



    addTest(test: TestInterface) {

        return CommonApi.addEntity(test, this.tests)
    }


    private generateLinks (test_id : string)
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

    private getParticipantsFromDatabase(test_id : string)
    {
        return ParticipantService.participants.filter(participant => participant.test_id === test_id);
    }


    private sendMail(link : string, email : string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
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

    getOneTest(id: string) : TestInterface {
        this.generateLinks(id);
        return CommonApi.findEntity(id, this.tests)[0];
    }

    updateTest(id: string, newTest: TestInterface) {
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

    removeTest(id: string) {
        CommonApi.removeEntity(id, this.tests)
    }

    private saveLinkInDatabase(link: LinkInterface) {
        LinkService.links.push(link);
    }

}