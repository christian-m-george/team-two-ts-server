"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Retrieve user from db by email address
const getUserByEmail = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({
        where: {
            email: userEmail
        }
    });
});
// Retrieve user from db by id
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({
        where: {
            id: id
        }
    });
});
// Post User to db
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.create({
        data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
        }
    }).catch((e) => {
        throw e;
    });
});
// Delete User from db
const deleteUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.delete({
        where: {
            email: userData.email,
        }
    }).catch((e) => {
        throw e;
    });
});
// Update User's email address in db
const updateEmail = (userData, newEmail) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.update({
        where: {
            email: userData.email
        },
        data: {
            email: newEmail
        }
    }).catch((e) => {
        throw e;
    });
});
// Update User's password in db
const updatePassword = (userData, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.update({
        where: {
            email: userData.email
        },
        data: {
            password: newPassword
        }
    }).catch((e) => {
        throw e;
    });
});
// Update a question
const updateQuestionByIdAndOrder = (question) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.question.update({
        where: {
            surveyId: question.surveyId,
            order: question.order
        },
        data: {
            answers: question.answers
        }
    }).catch((e) => {
        throw e;
    });
});
// Retrieve survey from db by id
const getSurveyByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.survey.findMany({
        where: {
            authorId: id
        }
    });
});
// Retrieve all questions from db by surveyid
const getAllQuestionsById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.question.findMany({
        where: {
            surveyId: id
        }
    });
});
// Retrieve survey from db by user
const getSurveyByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.survey.findMany({
        where: {
            authorId: id
        }
    });
});
// Post survey to db
const createInitialSurvey = (surveyData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.survey.create({
        data: {
            title: surveyData.title,
            authorId: surveyData.authorId,
            authorEmail: surveyData.authorEmail,
            category: surveyData.category,
            singleQuestion: surveyData.singleQuestion,
            isPrivate: surveyData.isPrivate,
            isRandom: surveyData.isRandom,
            numQuestions: surveyData.numQuestions
        }
    }).catch((e) => {
        throw e;
    });
});
// Delete User from db
const addQuestion = (question) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.question.create({
        data: {
            surveyId: question.surveyId,
            questionType: question.questionType,
            questionText: question.questionText,
            order: question.order,
            answers: question.answers
        }
    }).catch((e) => {
        throw e;
    });
});
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
const questionMethods = {
    addQuestion: addQuestion,
    getAllQuestionsById: getAllQuestionsById,
    updateQuestionByIdAndOrder: updateQuestionByIdAndOrder
};
// Exports all the survey primsa methods, 
const surveyMethods = {
    createInitialSurvey: createInitialSurvey,
    getSurveyByUser: getSurveyByID
};
// Exports all the user prisma methods
const userMethods = {
    getUserByEmail: getUserByEmail,
    getUserById: getUserById,
    createUser: createUser,
    deleteUser: deleteUser,
    updateEmail: updateEmail,
    updatePassword: updatePassword
};
const dbMethods = {
    userMethods: userMethods,
    surveyMethods: surveyMethods,
    questionMethods: questionMethods
};
exports.default = dbMethods;
