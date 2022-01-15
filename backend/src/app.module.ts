import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {APP_GUARD} from '@nestjs/core';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './api/users/users.module';
import {AuthModule} from './api/auth/auth.module';
import {ConfigModule} from './shared/config/config.module';
import {AuthGuard} from './shared/guards/auth.guard';
import {ConfigService} from './shared/config/config.service';
import {TestModule} from "./api/test/test.module";
import {SettingsModule} from "./api/settings/settings.module";
import {QuestionTypeModule} from "./api/questionType/questionType.module";
import {QuestionPresetModule} from "./api/questionPreset/questionPresetModule";
import {TemplateModule} from "./api/template/template.module";
import {QuestionChoiceModule} from "./api/questionChoice/questionChoice.module";
import {QuestionModule} from "./api/question/question.module";
import {QuestionAnswerModule} from "./api/questionAnswer/questionAnswer.module";
import {ParticipantModule} from "./api/participant/participant.module";

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
            }),
            inject: [ConfigService],
        }),
        UsersModule,
        AuthModule,
        ConfigModule,
        TestModule,
        SettingsModule,
        QuestionTypeModule,
        QuestionPresetModule,
        TemplateModule,
        QuestionChoiceModule,
        QuestionModule,
        QuestionAnswerModule,
        ParticipantModule

    ],
    controllers: [
        AppController
    ],
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
