import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
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

  async getAllTests(): Promise<testEntity[]> {
    return await this.testRepository.find();
  }

  async addTest(test: testEntity) {
    return this.testRepository.save(test)
    // const newTest = this.testRepository.create(test);
    // await this.testRepository.save(newTest);
    // return newTest;
  }

  async generateLinks(test: string) {
    const participants = await this.getParticipantsFromDatabase(
      test,
    );

    console.log(participants)
    participants.forEach(participant => {
      const linkGuid = uuidv4();
      const link: linkEntity = {
        link_id: linkGuid,
        participant: participant,
        used: false,
      };
      this.saveLinkInDatabase(link)
          .then(newLink => {
      this.sendMail(newLink.link_id, participant.email);})
    });
  }

  private getParticipantsFromDatabase(test: string) {
    return this.participantRepository.find({where : {test_id : test}})
  }


  async sendOwnerMail(test_id: string) {
    const test = await this.testRepository.findOne({where: {test_id: test_id}})
    const link = `http://localhost:8080/${test_id}/results`;

    console.log(test)

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'berkaymertkocak99@gmail.com',
        pass: 'okclkwhxjnojpmhn',
      },
    });
    const mailOptions = {
      from: 'berkaymertkocak99@gmail.com',
      to: test.owner_email,
      subject: 'Your exam results available here',
      text: link,
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }




  private sendMail(link: string, email: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'berkaymertkocak99@gmail.com',
        pass: 'okclkwhxjnojpmhn',
      },
    });
   //const mail_list =`${email},${owner_email}`
    const mailOptions = {
      from: 'berkaymertkocak99@gmail.com',
     to: `${email}` ,
     // to: `${mail_list}`,
      subject: 'Please participate to exam',
      text: `http://localhost:8080/${link}/`,
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  async getOneTest(test_id: string) {
    const relatedOwnedTest = await this.testRepository.findOne(test_id);
    if (relatedOwnedTest === undefined) {
      const relatedParticipateLink = await this.linkRepository.findOne({where: {link_id: test_id}});

      if(relatedParticipateLink === undefined) {
        throw new BadRequestException('Invalid test id');
      }

      // participant flow
      return relatedParticipateLink.participant.test;
    }

    // owner flow
    return relatedOwnedTest;
  }

  async updateTest(test: testEntity, editedTest: testEntity) {
    // return this.testRepository.update(test.test_id, editedTest);
    const existingTest = await this.testRepository.findOne(test);
    if (!existingTest) {
      throw new NotFoundException('Test is not found');
    }
    existingTest.name = editedTest.name;
    existingTest.owner_email = editedTest.owner_email;
    existingTest.owner_name = editedTest.owner_name;
    existingTest.time_end = editedTest.time_end;
    existingTest.time_start = editedTest.time_start;

    // todo participating in tests
    // todo results page
    // todo time left view
    // todo check if exam has already started
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

  protected saveLinkInDatabase(link: linkEntity) {
    return this.linkRepository.save(link);
  }
}
