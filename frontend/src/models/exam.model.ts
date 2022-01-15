export interface Settings {
    settings_uuid: string;
    show_results_overview: boolean;
    allow_going_back: boolean;
    show_points_per_question: boolean;
}

export interface SettingsDraft extends Settings {settings_uuid: null}

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

export interface QuestionDraft extends Question {question_uuid: null}

export interface Exam {
    exam_uuid: string;
    title: string;
    settings: Settings;
    questions: Question[];
}

export interface ExamDraft extends Exam {exam_uuid: null, settings: SettingsDraft, questions: QuestionDraft[]}


export interface QuestionAnswer {
    question_answer_id?: string;
    question_id: string;
    question_choice_ids: string[];
    answer_text: string | null;
    seconds_spent?: number;
    tab_focus_lost_count?: number;
    // todo check_status
}