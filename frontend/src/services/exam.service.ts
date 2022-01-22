import {APIResponse} from "../models/api.model";
import {
  Exam,
  ExamDraft, LocalQuestion,
  Participant,
  ParticipantDraft, Question, QuestionChoice,
  QuestionType,
  QuestionTypeDraft,
  Settings
} from "../models/exam.model";
import {patch, put, post, get} from "./utils.service";
import {UpdateExamParticipants, UpdateExamQuestions, UpdateExamSettings} from "../store/slices/exam.slice";

export const getExam = async (uuid: string): Promise<APIResponse<Exam>> => {
  const examRequest = await get(`/tests/${uuid}/`);

  const exam = await examRequest.json()

  const settingsRequest = await get(`/settings/${exam.data.settings_id}/`);

  const settings = await settingsRequest.json()

  const questionsRequest = await get(`/question/?test_id=${exam.data.id}`);

  const questions = await questionsRequest.json()

  console.log(exam, settings, questions)

  const examFromBackend: Exam = {
    id: exam.data.id,
    name: exam.data.name,
    owner_name: exam.data.owner_name,
    settings: settings.data,
    // todo
    questions: [
      // {
      //   id: 'eins',
      //   name: 'What is your favorite food?',
      //   question_type_id: 'OPEN',
      //   question_choices: []
      // },
      // {
      //   id: 'zwei',
      //   name: 'Which pill?',
      //   question_type_id: 'SINGLE_CHOICE',
      //   question_choices: [
      //     {
      //       question_choice_id: 'asssss',
      //       is_correct: true,
      //       text: 'Red'
      //     },
      //     {
      //       question_choice_id: 'bsssss',
      //       is_correct: false,
      //       text: 'Blue'
      //     }
      //   ]
      // },
      // {
      //   id: 'drei',
      //   name: 'What does CSS stand for?',
      //   question_type_id: 'MULTI_CHOICE',
      //   question_choices: [
      //     {
      //       question_choice_id: 'ammmm',
      //       is_correct: true,
      //       text: 'Cascading Style Sheet'
      //     },
      //     {
      //       question_choice_id: 'bmmmm',
      //       is_correct: false,
      //       text: 'Computing Style Sheet'
      //     },
      //     {
      //       question_choice_id: 'cmmmm',
      //       is_correct: false,
      //       text: 'Creative Styling Sheet'
      //     }
      //   ]
      // }
    ]
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
    id: exam.data.id,
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
    id: exam.data.id,
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
    question_type_id: lc.question_type.id,
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

export const apiGetExamTemplates = async (): Promise<APIResponse<ExamDraft[]>> => {
  // const res = await get(`/users/me`);
  // return await res.json();

  const examTemplatesFromBackend: ExamDraft[] = [
    {
      name: 'Simple ABC',
      owner_name: 'jan kowalski',
      settings: {
        show_results_overview: false,
        show_points_per_question: true,
        allow_going_back: true,
      },
      questions: [
        // {
        //   name: 'Which one?',
        //   question_type_id: 'SINGLE_CHOICE',
        //   // question_choices: [
        //   //   {
        //   //     text: 'A',
        //   //     is_correct: true,
        //   //   },
        //   //   {
        //   //     text: 'B',
        //   //     is_correct: false,
        //   //   },
        //   //   {
        //   //     text: 'C',
        //   //     is_correct: false,
        //   //   }
        //   // ]
        // }
      ],
    },
    {
      name: 'Medical exam',
      owner_name: 'jan kowalski',
      settings: {
        show_results_overview: false,
        show_points_per_question: true,
        allow_going_back: true,
      },
      questions: [],
    },
    {
      name: 'Test exam',
      owner_name: 'jan kowalski',
      settings: {
        show_results_overview: false,
        show_points_per_question: true,
        allow_going_back: true,
      },
      questions: [],
    },
    {
      name: 'CSS basic exam',
      owner_name: 'jan kowalski',
      settings: {
        show_results_overview: false,
        show_points_per_question: true,
        allow_going_back: true,
      },
      questions: [],
    }
  ]

  const mockData = await new Promise((res, rej) => {
    res(examTemplatesFromBackend)
  });

  return {
    statusCode: 200,
    message: [],
    data: mockData
  } as APIResponse<ExamDraft[]>;
};

export const apiUseExamTemplate = async (examTemplate: ExamDraft): Promise<APIResponse<Exam>> => {
  // const res = await get(`/users/me`);
  // return await res.json();

  const createdExamFromBackend: Exam = {
    id: '856ad28a-74a4-4f2a-bff7-ca93e9280143',
    name: '',
    owner_name: 'jan kowalski',
    settings: {
      id: '14999764-317c-4692-827a-558adce51bc7',
      ...examTemplate.settings
    },
    questions: examTemplate.questions.map((q, i) => ({
      id: `d10e63fd-11ed-4042-8f89-2cb0233bca65------${i}`,
      name: q.name,
      question_type_id: q.question_type_id,
      test_id: '856ad28a-74a4-4f2a-bff7-ca93e9280143',
      question_choices: [],
    }))
  }

  console.log(JSON.parse(JSON.stringify(createdExamFromBackend)))

  const mockData = await new Promise((res, rej) => {
    res(createdExamFromBackend)
  });

  return {
    statusCode: 200,
    message: [],
    data: mockData
  } as APIResponse<Exam>;
};

export const apiPublishExam = async (exam: Exam): Promise<APIResponse<Exam>> => {
  const exampleExam = {
    "exam_uuid": "856ad28a-74a4-4f2a-bff7-ca93e9280143",
    "title": "new exam",
    "settings": {
      "id": "14999764-317c-4692-827a-558adce51bc7",
      "show_results_overview": false,
      "show_points_per_question": true,
      "allow_going_back": true
    },
    "questions": [
      {
        "id": "d10e63fd-11ed-4042-8f89-2cb0233bca65------0",
        "name": "Which one?",
        "question_type_id": "SINGLE_CHOICE",
        "question_choices": [
          {
            "question_choice_id": "5e31a0b6-6ca0-4c01-91ba-10abb65d0f0c-----00",
            "text": "A",
            "is_correct": true
          },
          {
            "question_choice_id": "5e31a0b6-6ca0-4c01-91ba-10abb65d0f0c-----01",
            "text": "B",
            "is_correct": false
          },
          {
            "question_choice_id": "5e31a0b6-6ca0-4c01-91ba-10abb65d0f0c-----02",
            "text": "C",
            "is_correct": false
          }
        ]
      }
    ]
  }

  const settingsToCreate = {...exampleExam.settings, id: undefined}

  const settingsResponse = await (await post(`/settings`, settingsToCreate)).json();
  console.log(`created settings with id ${settingsResponse.data.id}`)

  const questionsToCreate = exampleExam.questions.map(q => ({...q, id: undefined}))

  // todo not now, there's missing endpoint
  const questionResponse = await (await post(`/question`, {})).json();

  const questionChoiceResponse = await (await post(`/question`, {})).json();

  return {
    statusCode: 200,
    message: [],
    // @ts-ignore
    data: {}
  } as APIResponse<Exam>;
};

export const apiGetQuestionTypes = async (): Promise<APIResponse<QuestionType[]>> => {
  const questionTypesRequest = await get(`/questionType/`);
  const questionTypesResponse = await questionTypesRequest.json();

  let questionTypesFromBackend: QuestionType[] = [];

  if(questionTypesResponse.data.length === 0) {
    questionTypesFromBackend = await new Promise((res, rej) => {
      const questionTypesToCreate: QuestionTypeDraft[]  = [
        {name: 'OPEN',},
        {name: 'SINGLE_CHOICE',},
        {name: 'MULTI_CHOICE',},
      ]

      const creationPromises = questionTypesToCreate.map(qt => post(`/questionType/`, qt))

      Promise.all(creationPromises).then(values => {
        Promise.all(values.map(response => response.json())).then(jsons => {
          const createdQuestionTypes = jsons.map(j => j.data)
          res(createdQuestionTypes)
        })
      });
    });
  } else {
    questionTypesFromBackend = questionTypesResponse.data;
  }

  return {
    statusCode: 200,
    message: [],
    data: questionTypesFromBackend
  } as APIResponse<QuestionType[]>;
};