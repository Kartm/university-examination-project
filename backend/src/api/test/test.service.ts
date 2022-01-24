import { Injectable, NotFoundException } from '@nestjs/common';
import { TestInterface } from './interfaces/test.interface';
import * as nodemailer from 'nodemailer';
import { ParticipantInterface } from '../participant/interfaces/participant.interface';
import { v4 as uuidv4 } from 'uuid';
import { LinkInterface } from '../link/interface/link.interface';
import { ParticipantService } from '../participant/participant.service';
import { LinkService } from '../link/link.service';
import { testEntity } from 'src/entity/test.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {linkEntity} from "../../entity/link.entity";
import {participantEntity} from "../../entity/participant.entity";

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(testEntity)
    private testRepository: Repository<testEntity>,
    @InjectRepository(linkEntity)
    private linkRepository: Repository<linkEntity>,
    @InjectRepository(participantEntity)
    private participantRepository: Repository<participantEntity>,
  ) {}
  tests: TestInterface[] = [];

  async getAllTests(): Promise<testEntity[]> {
    return await this.testRepository.find();
  }

  async addTest(test: testEntity) {
    const newTest = this.testRepository.create(test);
    await this.testRepository.save(newTest);
    return newTest;
  }

  async generateLinks(test: string) {
    const participants = await this.getParticipantsFromDatabase(
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

  private getParticipantsFromDatabase(test: string) {
    return this.participantRepository.find({where : {test : test}})
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
      throw new NotFoundException('Test is not found');
    }
    existingTest.name = editedTest.name;
    await this.testRepository.save(existingTest);
    return editedTest;
  }

  async removeTest(test: testEntity) {
    const deletedTest = await this.testRepository.findOne(test);
    if (!deletedTest) {
      throw new NotFoundException('Test is not found');
    }
    await this.testRepository.delete(test);
    return {
      message: `${deletedTest.name} deleted successfully`,
    };
  }

  protected saveLinkInDatabase(link: LinkInterface) {
    this.linkRepository.save(link);
  }
}
