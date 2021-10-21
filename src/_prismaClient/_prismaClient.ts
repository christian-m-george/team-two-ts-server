import { PrismaClient } from '@prisma/client';
import { SurveyData } from '../survey/survey';
import User from '../user/user';
import Question from '../question/question';

const prisma = new PrismaClient();

// Retrieve user from db by email address
const getUserByEmail = async (userEmail: string) => await prisma.user.findUnique({
    where: {
        email: userEmail
    }
})

// Retrieve user from db by id
const getUserById = async (id: number) => await prisma.user.findUnique({
    where: {
        id: id
    }
})

// Post User to db
const createUser = async (userData: User) => await prisma.user.create({
    data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
}}).catch((e) => {
    throw e
})

// Delete User from db
const deleteUser = async (userData: User) => await prisma.user.delete({
    where: {
        email: userData.email,
    }
}).catch((e) => {
    throw e
})

// Update User's email address in db
const updateEmail = async (userData: User, newEmail: string) => await prisma.user.update({
    where: {
        email: userData.email
    },
    data: {
        email: newEmail
    }
}).catch((e) => {
    throw e
})

// Update User's password in db
const updatePasswordByUserId = async (id: number, newPassword: string) => await prisma.user.update({
    where: {
        id: id
    },
    data: {
        password: newPassword
    }
}).catch((e) => {
    throw e
})

// Update User's password in db
const updatePassword = async (userData: User, newPassword: string) => await prisma.user.update({
    where: {
        email: userData.email
    },
    data: {
        password: newPassword
    }
}).catch((e) => {
    throw e
})

// Update a question
const updateQuestionByIdAndOrder = async (question: Question) => await prisma.question.updateMany({
    where: {
        surveyId: question.surveyId,
        order: question.order
    },
    data: {
        questionText: question.questionText,
        questionType: question.questionType,
        answers: question.answers
    }
}).catch((e) => {
    throw e
})

// Retrieve user from db by id
const getQuestionBySurveyId = async (surveyId: number) => await prisma.question.findMany({
    where: {
        surveyId: surveyId
    }
})

// Retrieve user from db by id
const getQuestionBySurveyIdAndOrder = async (question: Question) => await prisma.question.findMany({
    where: {
        surveyId: question.surveyId,
        order: question.order
    }
})

// Retrieve user from db by id
const getQuestionBySurveyIdAndOrderFrag = async (surveyId: number, order: number) => await prisma.question.findMany({
    where: {
        surveyId: surveyId,
        order: order
    }
})



// Retrieve survey from db by id
const getSurveyById = async (id: number) => await prisma.survey.findUnique({
    where: {
        id: id
    }
})

// Delete survey from db
const deleteSurvey = async (surveyId: number) => await prisma.survey.delete({
    where: {
        id: surveyId,
    }
}).catch((e) => {
    throw e
})


// Delete questions by survey id from db
const deleteQuestionsBySurveyId = async (surveyId: number) => await prisma.survey.deleteMany({
    where: {
        id: surveyId,
    }
}).catch((e) => {
    throw e
})


// Retrieve all questions from db by surveyid
const getAllQuestionsById = async (id: number) => await prisma.question.findMany({
    where: {
        surveyId: id
    }
})

// Retrieve survey from db by user
const getSurveyByUser = async (id: number) => await prisma.survey.findMany({
    where: {
        authorId: id
    }
})

// Post survey to db
const createInitialSurvey = async (surveyData: SurveyData) => await prisma.survey.create({
    data: {
        title: surveyData.title,
        authorId: surveyData.authorId,
        authorEmail: surveyData.authorEmail,
        category: surveyData.category,
        singleQuestion: surveyData.singleQuestion,
        isPrivate: surveyData.isPrivate,
        isRandom: surveyData.isRandom,
        requiresIdentifiers: surveyData.requiresIdentifiers,
        numQuestions: surveyData.numQuestions

}}).catch((e) => {
    throw e
})

// Alter a field on the a survey in db
const publishSurvey = async (id: number, published: boolean) => await prisma.survey.update({
    where: {
        id: id
    },
    data: {
        published: published
    }
}).catch((e) => {
    throw e
})

// Delete User from db
const addQuestion = async (question: Question) => await prisma.question.create({
    data: {
        surveyId: question.surveyId,
        questionType: question.questionType,
        questionText: question.questionText,
        order: question.order,
        answers: question.answers
    }
}).catch((e) => {
    throw e
})


// Create Response for a survey
const addResponse = async (id: number, responses: []) => await prisma.response.create({
    data: {
        surveyId: id,
        answers: responses
    }
}).catch((e) => {
    throw e
})

const getResponsesBySurveyId = async(id: number) => await prisma.response.findMany({
    where: {
        surveyId: id
    }
}).catch((e) => {
    throw e
})

// Delete User from db
// const deleteUser = async (userData: User) => await prisma.survey.delete({
//     where: {
//         email: userData.email,
//     }
// }).catch((e) => {
//     throw e
// })

// Update User's email address in db
// const updateEmail = async (userData: User, newEmail: string) => await prisma.survey.update({
//     where: {
//         email: userData.email
//     },
//     data: {
//         email: newEmail
//     }
// }).catch((e) => {
//     throw e
// })

// Update User's password in db
// const updatePassword = async (userData: User, newPassword: string) => await prisma.survey.update({
//     where: {
//         email: userData.email
//     },
//     data: {
//         password: newPassword
//     }
// }).catch((e) => {
//     throw e
// })



const responseMethods = {
    addResponse: addResponse,
    getResponsesBySurveyId: getResponsesBySurveyId,
}

const questionMethods = {
    addQuestion: addQuestion,
    getAllQuestionsById: getAllQuestionsById,
    updateQuestionByIdAndOrder: updateQuestionByIdAndOrder,
    getQuestionBySurveyIdAndOrder: getQuestionBySurveyIdAndOrder,
    getQuestionBySurveyIdAndOrderFrag: getQuestionBySurveyIdAndOrderFrag,
    deleteQuestionsBySurveyId: deleteQuestionsBySurveyId,
    getQuestionBySurveyId: getQuestionBySurveyId
}


// Exports all the survey primsa methods, 
const surveyMethods = {
    createInitialSurvey: createInitialSurvey,
    getSurveyByUser: getSurveyByUser,
    getSurveyById: getSurveyById,
    deleteSurvey: deleteSurvey,
    publishSurvey: publishSurvey
}

// Exports all the user prisma methods
const userMethods = {
    getUserByEmail: getUserByEmail,
    getUserById: getUserById,
    createUser: createUser,
    deleteUser: deleteUser,
    updateEmail: updateEmail,
    updatePassword: updatePassword,
    updatePasswordByUserId: updatePasswordByUserId
}

const dbMethods = {
    userMethods: userMethods,
    surveyMethods: surveyMethods,
    questionMethods: questionMethods,
    responseMethods: responseMethods
}


export default dbMethods;