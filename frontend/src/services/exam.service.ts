import { APIResponse } from "../models/api.model";
import {Exam, ExamDraft, Settings} from "../models/exam.model";
import {patch, put, post, get} from "./utils.service";
import {UpdateExamSettings} from "../store/slices/exam.slice";

export const getExam = async (uuid: string): Promise<APIResponse<Exam>> => {
    const examRequest = await get(`/tests/${uuid}/`);

    const exam = await examRequest.json()

    const settingsRequest = await get(`/settings/${exam.data.settings_id}/`);

    const settings = await settingsRequest.json()

    console.log(exam, settings)

    const examFromBackend: Exam = {
        id: exam.data.id,
        name: exam.data.name,
        owner_name: exam.data.owner_name,
        settings: settings.data,
        // todo
        questions: [
            {
                question_uuid: 'eins',
                name: 'What is your favorite food?',
                question_type: 'OPEN',
                question_choices: [

                ]
            },
            {
                question_uuid: 'zwei',
                name: 'Which pill?',
                question_type: 'SINGLE_CHOICE',
                question_choices: [
                    {
                        question_choice_id: 'asssss',
                        is_correct: true,
                        text: 'Red'
                    },
                    {
                        question_choice_id: 'bsssss',
                        is_correct: false,
                        text: 'Blue'
                    }
                ]
            },
            {
                question_uuid: 'drei',
                name: 'What does CSS stand for?',
                question_type: 'MULTI_CHOICE',
                question_choices: [
                    {
                        question_choice_id: 'ammmm',
                        is_correct: true,
                        text: 'Cascading Style Sheet'
                    },
                    {
                        question_choice_id: 'bmmmm',
                        is_correct: false,
                        text: 'Computing Style Sheet'
                    },
                    {
                        question_choice_id: 'cmmmm',
                        is_correct: false,
                        text: 'Creative Styling Sheet'
                    }
                ]
            }
        ]
    }

    return {
        statusCode: 200,
        message: [],
        data: examFromBackend
    } as APIResponse<Exam>;
};

export const apiCreateExam = async (): Promise<APIResponse<Exam>> => {
    const settingsRequest = await post(`/settings/`, {
        show_results_overview: true,
        allow_going_back: true,
        show_points_per_question: true,
    });

    const settings = await settingsRequest.json()

    const examRequest = await post(`/tests/`, {
        name: 'some exam',
        owner_name: 'jan kowalski',
        settings_id: settings.data.id,
    });

    const exam = await examRequest.json()

    const examFromBackend: Exam = {
        id: exam.data.id,
        name: exam.data.name,
        owner_name: exam.data.owner_name,
        settings: settings.data,
        questions: []
    }

    return {
        statusCode: 200,
        message: [],
        data: examFromBackend
    } as APIResponse<Exam>;
};

export const apiUpdateExamSettings = async (update: UpdateExamSettings): Promise<APIResponse<Exam>> => {

    const settingsRequest = await patch(`/settings/${update.settings.id}/`, {
        show_results_overview: update.settings.show_results_overview,
        allow_going_back: update.settings.allow_going_back,
        show_points_per_question: update.settings.show_points_per_question,
    });

    const settings = await settingsRequest.json()

    const examRequest = await patch(`/tests/${update.id}/`, {
        name: update.name,
        owner_name: update.owner_name,
        settings_id: settings.data.id,
    });

    const exam = await examRequest.json()

    const examFromBackend: Exam = {
        id: exam.data.id,
        name: exam.data.name,
        owner_name: exam.data.owner_name,
        settings: settings.data,
        questions: []
    }

    return {
        statusCode: 200,
        message: [],
        data: examFromBackend
    } as APIResponse<Exam>;
};

export const apiGetExamTemplates = async (): Promise<APIResponse<ExamDraft[]>> => {
    // const res = await get(`/users/me`);
    // return await res.json();

    const examTemplatesFromBackend: ExamDraft[] = [
        {
            name: 'Simple ABC',
            owner_name: 'jan kowalski',
            settings: {
                show_results_overview: false,
                show_points_per_question: true,
                allow_going_back: true,
            },
            questions: [
                {
                    name: 'Which one?',
                    question_type: 'SINGLE_CHOICE',
                    question_choices: [
                        {
                            text: 'A',
                            is_correct: true,
                        },
                        {
                            text: 'B',
                            is_correct: false,
                        },
                        {
                            text: 'C',
                            is_correct: false,
                        }
                    ]
                }
            ],
        },
        {
            name: 'Medical exam',
            owner_name: 'jan kowalski',
            settings: {
                show_results_overview: false,
                show_points_per_question: true,
                allow_going_back: true,
            },
            questions: [
            ],
        },
        {
            name: 'Test exam',
            owner_name: 'jan kowalski',
            settings: {
                show_results_overview: false,
                show_points_per_question: true,
                allow_going_back: true,
            },
            questions: [
            ],
        },
        {
            name: 'CSS basic exam',
            owner_name: 'jan kowalski',
            settings: {
                show_results_overview: false,
                show_points_per_question: true,
                allow_going_back: true,
            },
            questions: [
            ],
        }
    ]

    const mockData = await new Promise((res, rej) => {
        res(examTemplatesFromBackend)
    });

    return {
        statusCode: 200,
        message: [],
        data: mockData
    } as APIResponse<ExamDraft[]>;
};

export const apiUseExamTemplate = async (examTemplate: ExamDraft): Promise<APIResponse<Exam>> => {
    // const res = await get(`/users/me`);
    // return await res.json();

    const createdExamFromBackend: Exam = {
        id: '856ad28a-74a4-4f2a-bff7-ca93e9280143',
        name: '',
        owner_name: 'jan kowalski',
        settings: {
            id: '14999764-317c-4692-827a-558adce51bc7',
            ...examTemplate.settings
        },
        questions: examTemplate.questions.map((q, i) => ({
            question_uuid: `d10e63fd-11ed-4042-8f89-2cb0233bca65------${i}`,
            name: q.name,
            question_type: q.question_type,
            question_choices: q.question_choices.map((choice, j) => ({
                question_choice_id: `5e31a0b6-6ca0-4c01-91ba-10abb65d0f0c-----${i}${j}`,
                text: choice.text,
                is_correct: choice.is_correct
            }))
        }))
    }

    console.log(JSON.parse(JSON.stringify(createdExamFromBackend)))

    const mockData = await new Promise((res, rej) => {
        res(createdExamFromBackend)
    });

    return {
        statusCode: 200,
        message: [],
        data: mockData
    } as APIResponse<Exam>;
};

export const apiPublishExam = async (exam: Exam): Promise<APIResponse<Exam>> => {
    const exampleExam = {
        "exam_uuid": "856ad28a-74a4-4f2a-bff7-ca93e9280143",
        "title": "new exam",
        "settings": {
            "id": "14999764-317c-4692-827a-558adce51bc7",
            "show_results_overview": false,
            "show_points_per_question": true,
            "allow_going_back": true
        },
        "questions": [
            {
                "question_uuid": "d10e63fd-11ed-4042-8f89-2cb0233bca65------0",
                "name": "Which one?",
                "question_type": "SINGLE_CHOICE",
                "question_choices": [
                    {
                        "question_choice_id": "5e31a0b6-6ca0-4c01-91ba-10abb65d0f0c-----00",
                        "text": "A",
                        "is_correct": true
                    },
                    {
                        "question_choice_id": "5e31a0b6-6ca0-4c01-91ba-10abb65d0f0c-----01",
                        "text": "B",
                        "is_correct": false
                    },
                    {
                        "question_choice_id": "5e31a0b6-6ca0-4c01-91ba-10abb65d0f0c-----02",
                        "text": "C",
                        "is_correct": false
                    }
                ]
            }
        ]
    }

    const settingsToCreate = {...exampleExam.settings, id: undefined}

    const settingsResponse = await (await post(`/settings`, settingsToCreate)).json();
    console.log(`created settings with id ${settingsResponse.data.id}`)

    const questionsToCreate = exampleExam.questions.map(q => ({...q, question_uuid: undefined}))

    // todo not now, there's missing endpoint
    const questionResponse = await (await post(`/question`, {

    })).json();

    const questionChoiceResponse = await (await post(`/question`, {

    })).json();

    return {
        statusCode: 200,
        message: [],
        // @ts-ignore
        data: {}
    } as APIResponse<Exam>;
};