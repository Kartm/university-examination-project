import { Injectable } from '@nestjs/common';
import { TestInterface } from './interfaces/test.interface';
import { CommonApi } from '../../APIHelpers/CommonApi';
import * as nodemailer from 'nodemailer';
import { ParticipantInterface } from '../participant/interfaces/participant.interface';
import { v4 as uuidv4 } from 'uuid';
import { LinkInterface } from '../link/interface/link.interface';
import { ParticipantService } from '../participant/participant.service';
import { LinkService } from '../link/link.service';
import { testEntity } from 'src/entity/test.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TestService {
  constructor(@InjectRepository(testEntity) private testRepository: Repository<testEntity>,) {}
  tests: TestInterface[] = [];

  async getAllTests(): Promise<testEntity[]> {
    return await this.testRepository.find();
  }

  addTest(test: TestInterface) {
    return CommonApi.addEntity(test, this.tests);
  }

  private generateLinks(test: testEntity) {
    const participants: ParticipantInterface[] = this.getParticipantsFromDatabase(
      test,
    );
    participants.forEach(participant => {
      const linkGuid = uuidv4();
      const link: LinkInterface = {
        id: linkGuid,
        participant: participant,
        used: false,
        sent_at: Date.now().toString(),
        link: linkGuid,
      };
      this.saveLinkInDatabase(link);
      this.sendMail(link.link, participant.email);
    });
  }

  private getParticipantsFromDatabase(test: testEntity) {
    return ParticipantService.participants.filter(
      participant => participant.test === test,
    );
  }

  private sendMail(link: string, email: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'berkaymertkocak99@gmail.com',
        pass: 'okclkwhxjnojpmhn',
      },
    });

    const mailOptions = {
      from: 'berkaymertkocak99@gmail.com',
      to: `${email}`,
      subject: 'Sending Email using Node.js',
      text: `http://localhost:3000/api/link/${link}`,
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  getOneTest(test: testEntity): TestInterface {
    this.generateLinks(test);
    return CommonApi.findEntity(test.test_id, this.tests)[0];
  }

  updateTest(id: string, newTest: TestInterface) {}

  removeTest(id: string) {
    CommonApi.removeEntity(id, this.tests);
  }

  private saveLinkInDatabase(link: LinkInterface) {
    LinkService.links.push(link);
  }
}
