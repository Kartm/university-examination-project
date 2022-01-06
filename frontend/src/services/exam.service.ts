import { APIResponse } from "../models/api.model";
import {Exam} from "../models/exam.model";

export const getExam = async (uuid: string): Promise<APIResponse<Exam>> => {
    // const res = await get(`/users/me`);
    // return await res.json();

    const mockData = await new Promise((res, rej) => {
        res({
            uuid: '123e4567-e89b-12d3-a456-426652340000',
            title: 'test exam'
        } as Exam)
    });

    return {
        statusCode: 200,
        message: [],
        data: mockData
    } as APIResponse<Exam>;
};