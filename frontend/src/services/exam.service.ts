import { APIResponse } from "../models/api.model";
import {Exam, ExamDraft} from "../models/exam.model";

export const getExam = async (uuid: string): Promise<APIResponse<Exam>> => {
    // const res = await get(`/users/me`);
    // return await res.json();

    const mockExam: Exam = {
        exam_uuid: 'placeholder-exam-uuid',
        title: 'Super cool exam',
        settings: {
            settings_uuid: 'xdddd',
            allow_going_back: false,
            // todo points per question
            show_points_per_question: true,
            show_results_overview: false,
        },
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

    const mockData = await new Promise((res, rej) => {
        res(mockExam)
    });

    return {
        statusCode: 200,
        message: [],
        data: mockData
    } as APIResponse<Exam>;
};

export const apiCreateExam = async (): Promise<APIResponse<Exam>> => {
    // const res = await get(`/users/me`);
    // return await res.json();

    const emptyExamFromBackend: Exam = {
        exam_uuid: '123e4567-e89b-12d3-a456-426652340000',
        title: '',
        settings: {
            settings_uuid: '2d5598a9-7067-4b2f-bd72-97b290fa1fcf',
            allow_going_back: false,
            show_points_per_question: false,
            show_results_overview: false,
        },
        questions: [
            // {
            //     question_uuid: 'eins',
            //     name: 'What is your favorite food?',
            //     question_type: 'OPEN',
            //     question_choices: [
            //
            //     ]
            // },
            // {
            //     question_uuid: 'zwei',
            //     name: 'Which pill?',
            //     question_type: 'SINGLE_CHOICE',
            //     question_choices: [
            //         {
            //             question_choice_id: 'asssss',
            //             is_correct: true,
            //             text: 'Red'
            //         },
            //         {
            //             question_choice_id: 'bsssss',
            //             is_correct: false,
            //             text: 'Blue'
            //         }
            //     ]
            // },
            // {
            //     question_uuid: 'drei',
            //     name: 'What does CSS stand for?',
            //     question_type: 'MULTI_CHOICE',
            //     question_choices: [
            //         {
            //             question_choice_id: 'ammmm',
            //             is_correct: true,
            //             text: 'Cascading Style Sheet'
            //         },
            //         {
            //             question_choice_id: 'bmmmm',
            //             is_correct: false,
            //             text: 'Computing Style Sheet'
            //         },
            //         {
            //             question_choice_id: 'cmmmm',
            //             is_correct: false,
            //             text: 'Creative Styling Sheet'
            //         }
            //     ]
            // }
        ]
    }

    const mockData = await new Promise((res, rej) => {
        res(emptyExamFromBackend)
    });

    return {
        statusCode: 200,
        message: [],
        data: mockData
    } as APIResponse<Exam>;
};

export const apiGetExamTemplates = async (): Promise<APIResponse<ExamDraft[]>> => {
    // const res = await get(`/users/me`);
    // return await res.json();

    const examTemplatesFromBackend: ExamDraft[] = [
        {
            title: 'Simple ABC',
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
            title: 'Medical exam',
            settings: {
                show_results_overview: false,
                show_points_per_question: true,
                allow_going_back: true,
            },
            questions: [
            ],
        },
        {
            title: 'Test exam',
            settings: {
                show_results_overview: false,
                show_points_per_question: true,
                allow_going_back: true,
            },
            questions: [
            ],
        },
        {
            title: 'CSS basic exam',
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