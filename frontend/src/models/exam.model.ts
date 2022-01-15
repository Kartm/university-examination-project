export interface Settings {
    settings_uuid: string;
    show_results_overview: boolean;
    allow_going_back: boolean;
    show_points_per_question: boolean;
}

export type SettingsDraft = Omit<Settings, 'settings_uuid'>

export interface QuestionChoice {
    question_choice_id: string;
    text: string;
    is_correct: boolean;
}

export type QuestionChoiceDraft = Omit<QuestionChoice, 'question_choice_id'>

export interface Question {
    question_uuid: string;
    name: string;
    question_type: 'OPEN' | 'SINGLE_CHOICE' | 'MULTI_CHOICE';
    question_choices: QuestionChoice[];
}

export interface QuestionDraft extends Omit<Omit<Question, 'question_uuid'>, 'question_choices'> {question_choices: QuestionChoiceDraft[]}

export interface Exam {
    exam_uuid: string;
    title: string;
    settings: Settings;
    questions: Question[];
}

export interface ExamDraft extends Omit<Omit<Omit<Exam, 'exam_uuid'>, 'settings'>, 'questions'> {settings: SettingsDraft, questions: QuestionDraft[]}

export interface QuestionAnswer {
    question_answer_id?: string;
    question_id: string;
    question_choice_ids: string[];
    answer_text: string | null;
    seconds_spent?: number;
    tab_focus_lost_count?: number;
    // todo check_status
}