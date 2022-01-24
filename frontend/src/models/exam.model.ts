export interface Settings {
    id: string;
    show_results_overview: boolean;
    allow_going_back: boolean;
    show_points_per_question: boolean;
}

export type SettingsDraft = Omit<Settings, 'id'>

export interface QuestionChoice {
    id: string;
    question_id: string;
    text: string;
    is_correct: boolean;
}

export interface QuestionChoiceDraft extends Omit<Omit<QuestionChoice, 'id'>, 'question_id'> {id?: string; question_id?: string}

export enum QuestionTypeEnum {
    OPEN = "OPEN",
    SINGLE_CHOICE = "SINGLE_CHOICE",
    MULTI_CHOICE = "MULTI_CHOICE"
}

export interface LocalQuestion {
    id?: string;
    name: string;
    question_type: QuestionTypeEnum;
    question_choices: QuestionChoiceDraft[];
}

export interface Question {
    id: string;
    name: string;
    test_id : string;
    question_type : QuestionTypeEnum;
}

export interface Exam {
    test_id: string;
    name: string;
    owner_name: string;
    settings: Settings;
    questions: LocalQuestion[];
}

export interface QuestionAnswer {
    question_answer_id?: string;
    question_id: string;
    question_choice_ids: string[];
    answer_text: string | null;
    seconds_spent?: number;
    tab_focus_lost_count?: number;
    // todo check_status
}

export interface Participant {
    id: string;
    test_id: string,
  email: string,
  name: string,
  score: number,
}

export interface ParticipantDraft extends Omit<Omit<Participant, 'id'>, 'score'> {};