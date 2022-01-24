import {APIResponse} from "../models/api.model";
import {
  Exam,
  LocalQuestion,
  Participant,
  ParticipantDraft, Question, QuestionChoice,
  QuestionTypeEnum,
  Settings
} from "../models/exam.model";
import {patch, put, post, get} from "./utils.service";
import {
  questionToLocalQuestion,
  UpdateExamParticipants,
  UpdateExamQuestions,
  UpdateExamSettings
} from "../store/slices/exam.slice";

export const getExam = async (uuid: string): Promise<APIResponse<Exam>> => {
  const examRequest = await get(`/tests/${uuid}/`);

  const exam = await examRequest.json()

  const settingsRequest = await get(`/settings/${exam.data.settings_id}/`);

  const settings = await settingsRequest.json()

  const questionsRequest = await get(`/question/?test_id=${exam.data.id}`);

  const questions = await questionsRequest.json()

  const questionsChoicesRequest = await get(`/questionChoice/`);

  const questionChoices = await questionsChoicesRequest.json()

  console.log(exam, settings, questions)

  const mergedQuestionsWithChoices: LocalQuestion[] = (questions.data as Question[]).map(q => questionToLocalQuestion(q, questionChoices.data))
  console.log(mergedQuestionsWithChoices)
  const examFromBackend: Exam = {
    test_id: exam.data.id,
    name: exam.data.name,
    owner_name: exam.data.owner_name,
    settings: settings.data,
    questions: mergedQuestionsWithChoices
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
    test_id: exam.data.id,
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
    test_id: exam.data.id,
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

export const apiUpdateExamParticipants = async (update: UpdateExamParticipants): Promise<APIResponse<Participant[]>> => {
  const participantPromises = update.participants.map(participant => "id" in participant ?
    put(`/participant/${(participant as Participant).id}/`, participant) :
    post(`/participant/`, participant))

  const updatedParticipants: Participant[] = await new Promise((res, rej) => {
    Promise.all(participantPromises).then(values => {
      Promise.all(values.map(response => response.json())).then(jsons => {
        const finalParticipants = jsons.map(j => j.data)
        res(finalParticipants)
      })
    });
  });

  return {
    statusCode: 200,
    message: [],
    data: updatedParticipants
  } as APIResponse<Participant[]>;
};

export const apiUpdateExamQuestions = async (update: UpdateExamQuestions): Promise<APIResponse<{questions: Question[], questionChoices: QuestionChoice[]}>> => {
  const localQuestionToQuestion = (lc: LocalQuestion): Omit<Question, "id"> => ({
    name: lc.name,
    question_type: lc.question_type,
    test_id: update.testId,
  })

  const questionPromises = update.questions.map(localQuestionToQuestion).map(question => "id" in question ?
    put(`/question/${(question as any).id}/`, question) :
    post(`/question/`, question))

  const updatedQuestions: Question[] = await new Promise((res, rej) => {
    Promise.all(questionPromises).then(values => {
      Promise.all(values.map(response => response.json())).then(jsons => {
        const finalQuestions = jsons.map(j => j.data)
        res(finalQuestions)
      })
    });
  });

  let questionChoicesToSave: QuestionChoice[] = [];

  update.questions.forEach(q => {
    const updatedQuestion = updatedQuestions.find(uq => uq.name === q.name) // i hate it

    q.question_choices.forEach(qc => {
      questionChoicesToSave.push({...qc, question_id: updatedQuestion.id, id:qc.id})
    })
  })

  const questionChoicePromises = questionChoicesToSave.map(qc => "id" in qc && qc.id !== undefined ?
    put(`/questionChoice/${(qc as any).id}/`, qc) :
    post(`/questionChoice/`, qc))

  const updatedQuestionChoices: QuestionChoice[] = await new Promise((res, rej) => {
    Promise.all(questionChoicePromises).then(values => {
      Promise.all(values.map(response => response.json())).then(jsons => {
        const finalQuestionChoices = jsons.map(j => j.data)
        res(finalQuestionChoices)
      })
    });
  });

  return {
    statusCode: 200,
    message: [],
    data: {questions: updatedQuestions, questionChoices: updatedQuestionChoices}
  } as APIResponse<{questions: Question[], questionChoices: QuestionChoice[]}>;
};

export const apiPublishExam = async (exam: Exam): Promise<APIResponse<Exam>> => {
  // todo

  return {
    statusCode: 200,
    message: [],
    // @ts-ignore
    data: {}
  } as APIResponse<Exam>;
};