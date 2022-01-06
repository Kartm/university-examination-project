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
            show_points_per_question: false,
            show_results_overview: false,
        },
        questions: [
            {
                question_uuid: 'eins',
                name: 'question 1',
                question_type: {
                    question_type_uuid: 'open-uuid',
                    name: 'OPEN'
                },
                question_choices: [

                ]
            },
            {
                question_uuid: 'zwei',
                name: 'question 2',
                question_type: {
                    question_type_uuid: 'single-choice-uuid',
                    name: 'SINGLE_CHOICE'
                },
                question_choices: [
                    {
                        question_choice_id: 'a',
                        is_correct: true,
                        text: 'AAA'
                    },
                    {
                        question_choice_id: 'b',
                        is_correct: false,
                        text: 'BBB'
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