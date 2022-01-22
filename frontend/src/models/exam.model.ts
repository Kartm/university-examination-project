export interface Settings {
    id: string;
    show_results_overview: boolean;
    allow_going_back: boolean;
    show_points_per_question: boolean;
}

export type SettingsDraft = Omit<Settings, 'id'>

export interface QuestionChoice {
    question_choice_id: string;
    text: string;
    is_correct: boolean;
}

export interface QuestionChoiceDraft extends Omit<QuestionChoice, 'question_choice_id'> {question_choice_id?: string}

export interface QuestionType {
    id: string;
    name: 'OPEN' | 'SINGLE_CHOICE' | 'MULTI_CHOICE';
}

export type QuestionTypeDraft = Omit<QuestionType, 'id'>

export interface LocalQuestion {
    id?: string;
    name: string;
    question_type: QuestionType;
    question_choices: QuestionChoiceDraft[];
}

export interface Question {
    id: string;
    name: string;
    test_id : string;
    question_type_id : string;
}

export interface Exam {
    id: string;
    name: string;
    owner_name: string;
    settings: Settings;
    questions: Question[];
}

export interface ExamDraft extends Omit<Omit<Omit<Exam, 'id'>, 'settings'>, 'questions'> {settings: SettingsDraft, questions: Question[]}

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