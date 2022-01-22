import {Injectable} from "@nestjs/common";
import {TestInterface} from "./interfaces/test.interface";
import {CommonApi} from "../../APIHelpers/CommonApi";
import * as nodemailer from "nodemailer"

@Injectable()
export class TestService {

    tests: TestInterface[] = [];


    getAllTests() {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'berkaymertkocak99@gmail.com',
                pass: 'okclkwhxjnojpmhn'
            }
        });

        const mailOptions = {
            from: 'berkaymertkocak99@gmail.com',
            to: "berkaymertkocak_99@outlook.com",
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        return this.tests;
    }

    addTest(test: TestInterface) {

        return CommonApi.addEntity(test, this.tests)
    }

    getOneTest(id: string) : TestInterface {
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
}