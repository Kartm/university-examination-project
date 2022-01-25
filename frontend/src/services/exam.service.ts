import {APIResponse} from "../models/api.model";
import {
  Exam, LocalExam,
  LocalQuestion, LocalQuestionAnswer,
  Participant,
  ParticipantDraft, Question, QuestionAnswer, QuestionChoice,
  QuestionTypeEnum,
  Settings
} from "../models/exam.model";
import {patch, put, post, get} from "./utils.service";
import {
  ExamResults,
  questionToLocalQuestion,
  UpdateExamParticipants,
  UpdateExamQuestions,
  UpdateExamSettings
} from "../store/slices/exam.slice";

export const getExam = async (uuid: string): Promise<APIResponse<LocalExam>> => {
  const examRequest = await get(`/tests/${uuid}/`);

  const examFromBackend = (await examRequest.json()).data as Exam

  const settingsRequest = await get(`/settings/${examFromBackend.settings_id}/`);

  const settings = (await settingsRequest.json()).data as Settings

  const questionsRequest = await get(`/question/?test_id=${examFromBackend.test_id}`);

  const questions = await questionsRequest.json()

  const questionsChoicesRequest = await get(`/questionChoice/`);

  const questionChoices = await questionsChoicesRequest.json()

  const mergedQuestionsWithChoices: LocalQuestion[] = (questions.data as Question[]).map(q => questionToLocalQuestion(q, questionChoices.data))

  const localExam = {
    test_id: examFromBackend.test_id,
    name: examFromBackend.name,
    owner_name: examFromBackend.owner_name,
    owner_email: examFromBackend.owner_email,
    time_end: examFromBackend.time_end,
    time_start: examFromBackend.time_start,
    settings: settings,
    questions: mergedQuestionsWithChoices
  }

  return {
    statusCode: 200,
    message: [],
    data: localExam
  } as APIResponse<LocalExam>;
};

export const apiCreateExam = async (): Promise<APIResponse<LocalExam>> => {
  const settingsRequest = await post(`/settings/`, {
    show_results_overview: true,
    allow_going_back: true,
    show_points_per_question: true,
  });

  const settings = await settingsRequest.json()

  const examRequest = await post(`/tests/`, {
    name: '',
    owner_name: '',
    owner_email: '',
    settings_id: settings.data.settings_id,
  });

  const examFromBackend = (await examRequest.json()).data as Exam;

  const localExam = {
    test_id: examFromBackend.test_id,
    name: examFromBackend.name,
    owner_name: examFromBackend.owner_name,
    owner_email: examFromBackend.owner_email,
    settings: settings.data,
    questions: []
  }

  return {
    statusCode: 200,
    message: [],
    data: localExam
  } as APIResponse<LocalExam>;
};

export const apiUpdateExamSettings = async (update: UpdateExamSettings): Promise<APIResponse<LocalExam>> => {

  const settingsRequest = await patch(`/settings/${update.settings.settings_id}/`, {
    show_results_overview: update.settings.show_results_overview,
    allow_going_back: update.settings.allow_going_back,
    show_points_per_question: update.settings.show_points_per_question,
  });

  const settings = (await settingsRequest.json()).data as Settings

  const examRequest = await patch(`/tests/${update.test_id}/`, {
    test_id: update.test_id,
    name: update.name,
    owner_name: update.owner_name,
    owner_email: update.owner_email,
    settings_id: settings.settings_id,
    time_start: update.time_start,
    time_end: update.time_end,
  } as Exam);

  const examFromBackend = (await examRequest.json()).data as Exam;

  const localExam = {
    test_id: examFromBackend.test_id,
    name: examFromBackend.name,
    owner_name: examFromBackend.owner_name,
    owner_email: examFromBackend.owner_email,
    settings: settings,
    questions: []
  }

  return {
    statusCode: 200,
    message: [],
    data: localExam
  } as APIResponse<LocalExam>;
};

export const apiUpdateExamParticipants = async (update: UpdateExamParticipants): Promise<APIResponse<Participant[]>> => {
  const participantPromises = update.participants.map(participant => "participant_id" in participant ?
    put(`/participant/${(participant as Participant).participant_id}/`, participant) :
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
  const localQuestionToQuestion = (lc: LocalQuestion): Omit<Question, "question_id"> => ({
    name: lc.name,
    question_type: lc.question_type,
    test_id: update.testId,
    points: lc.points,
  })

  const questionPromises = update.questions.map(localQuestionToQuestion).map(question => "question_id" in question ?
    put(`/question/${(question as Question).question_id}/`, question) :
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
      questionChoicesToSave.push({...qc, question_id: updatedQuestion.question_id, questionChoice_id:qc.questionChoice_id})
    })
  })

  const questionChoicePromises = questionChoicesToSave.map(qc => "questionChoice_id" in qc && qc.questionChoice_id !== undefined ?
    put(`/questionChoice/${(qc as QuestionChoice).questionChoice_id}/`, qc) :
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

export const apiGetParticipantByLinkUuid = async (link_uuid: string): Promise<APIResponse<Participant>> => {
  const req = await get(`/link/${link_uuid}/`);

  const response = (await req.json()).data

  return {
    statusCode: 200,
    message: [],
    data: response
  } as APIResponse<Participant>;
};

export const apiSendParticipantAnswers = async (answers: LocalQuestionAnswer[], participant_uuid: string): Promise<APIResponse<QuestionAnswer[]>> => {
  const questionAnswers: QuestionAnswer[] = []

  answers.forEach((localAnswer) => {


    localAnswer.question_choice_ids.forEach(qc_id => {
      const answer: QuestionAnswer = {
        questionChoiceId: qc_id,
        participant_id: participant_uuid,
        answer_text: '',
      }

      questionAnswers.push(answer)
    })


  })

  const questionAnswerPromises = questionAnswers.map(qa => post(`/questionAnswer/`, qa))

  const receivedAnswersFromBackend: QuestionAnswer[] = await new Promise((res, rej) => {
    Promise.all(questionAnswerPromises).then(values => {
      Promise.all(values.map(response => response.json())).then(jsons => {
        const finalQuestionAnswers = jsons.map(j => j.data)
        res(finalQuestionAnswers)
      })
    });
  });

  console.log(receivedAnswersFromBackend)

  // const req = await get(`/link/${link_uuid}/`);
  //
  // const response = (await req.json()).data

  return {
    statusCode: 200,
    message: [],
    data: []
  } as APIResponse<QuestionAnswer[]>;
};

export const apiPublishExam = async (test_id: string): Promise<APIResponse<any>> => {
  const req = await get(`/publish/${test_id}/`);

  const response = (await req.json()).data

  return {
    statusCode: 200,
    message: [],
    data: response
  } as APIResponse<any>;
};

export const apiGetExamResults = async (participant_id: string): Promise<APIResponse<ExamResults>> => {
  const req = await get(`/results/${participant_id}/`);

  const response = (await req.json()).data

  return {
    statusCode: 200,
    message: [],
    data: response
  } as APIResponse<ExamResults>;
};