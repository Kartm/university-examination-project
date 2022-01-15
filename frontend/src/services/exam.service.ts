import { APIResponse } from "../models/api.model";
import {Exam} from "../models/exam.model";

export const getExam = async (uuid: string): Promise<APIResponse<Exam>> => {
    // const res = await get(`/users/me`);
    // return await res.json();

    const mockExam: Exam = {
        uuid: 'placeholder-exam-uuid',
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
                question_type: {
                    question_type_uuid: 'open-uuid',
                    name: 'OPEN'
                },
                question_choices: [

                ]
            },
            {
                question_uuid: 'zwei',
                name: 'Which pill?',
                question_type: {
                    question_type_uuid: 'single-choice-uuid',
                    name: 'SINGLE_CHOICE'
                },
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
                question_type: {
                    question_type_uuid: 'multi-choice-uuid',
                    name: 'MULTI_CHOICE'
                },
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