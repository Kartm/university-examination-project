import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {APP_GUARD} from '@nestjs/core';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from './shared/config/config.module';
import {AuthGuard} from './shared/guards/auth.guard';
import {ConfigService} from './shared/config/config.service';
import {TestModule} from './api/test/test.module';
import {SettingsModule} from './api/settings/settings.module';
import {QuestionChoiceModule} from './api/questionChoice/questionChoice.module';
import {QuestionModule} from './api/question/question.module';
import {QuestionAnswerModule} from './api/questionAnswer/questionAnswer.module';
import {ParticipantModule} from './api/participant/participant.module';
import {LinkModule} from './api/link/link.module';
import {ResultsModule} from "./api/results/results.module";
import {PublishModule} from "./api/publish/publishModule";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.environment.database.host,
                port: configService.environment.database.port,
                username: configService.environment.database.username,
                password: configService.environment.database.password,
                database: configService.environment.database.database,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: configService.environment.database.synchronize,
                charset: 'utf8mb4'
                // type: 'mysql',
                // host: 'localhost',
                // port: 3306,
                // username: 'root',
                // password: 'root',
                // database: 'mystarterdatabase',
                // entities: [__dirname + '/**/*.entity{.ts,.js}'],
                // dropSchema: true,
                // synchronize: true,
            }),
            inject: [ConfigService],
        }),
        ConfigModule,
        TestModule,
        SettingsModule,
        QuestionChoiceModule,
        QuestionModule,
        QuestionAnswerModule,
        ParticipantModule,
        PublishModule,
        LinkModule,
        ResultsModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        }
    ],
})
export class AppModule {
}
