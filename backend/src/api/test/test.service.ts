import { Injectable, NotFoundException } from '@nestjs/common';
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
  constructor(
    @InjectRepository(testEntity)
    private testRepository: Repository<testEntity>,
  ) {}
  tests: TestInterface[] = [];

  async getAllTests(): Promise<testEntity[]> {
    return await this.testRepository.find();
  }

  async addTest(test: TestInterface) {
    const newTest = this.testRepository.create(test);
    await this.testRepository.save(newTest);
    return newTest;
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

  async getOneTest(test: testEntity) {
    return await this.testRepository.findOne(test);
  }

  async updateTest(test: testEntity, editedTest: testEntity) {
    const existingTest = await this.testRepository.findOne(test);
    if (!existingTest) {
      throw new NotFoundException('Owner is not found');
    }
    existingTest.name = editedTest.name;
    await this.testRepository.save(existingTest);
    return editedTest;
  }

  async removeTest(test: testEntity) {
    const deletedTest = await this.testRepository.findOne(test);
    if (!deletedTest) {
      throw new NotFoundException('Owner is not found');
    }
    await this.testRepository.delete(test);
    return {
      message: `${deletedTest.name} deleted successfully`,
    };
  }

  private saveLinkInDatabase(link: LinkInterface) {
    LinkService.links.push(link);
  }
}
