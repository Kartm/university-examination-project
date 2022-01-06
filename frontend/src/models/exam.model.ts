export interface Settings {
    settings_uuid: string;
    show_results_overview: boolean;
    allow_going_back: boolean;
    show_points_per_question: boolean;
}

export interface QuestionType {
    question_type_uuid: string;
    name: string;
}

export interface QuestionChoice {
    question_choice_id: string;
    text: string;
    is_correct: boolean;
}

export interface Question {
    question_uuid: string;
    name: string;
    question_type: QuestionType;
    question_choices: QuestionChoice[];
}

export interface Exam {
    uuid: string;
    title: string;
    settings: Settings;
    questions: Question[];
}