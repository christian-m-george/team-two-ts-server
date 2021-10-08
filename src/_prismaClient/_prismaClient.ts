import { PrismaClient } from '@prisma/client';
import { SurveyData } from '../survey/survey';
import User from '../user/user';

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



// Retrieve survey from db by id
const getSurveyByID = async (id: number) => await prisma.survey.findMany({
    where: {
        authorId: id
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
        numQuestions: surveyData.numQuestions

}}).catch((e) => {
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








// Exports all the survey primsa methods, 
const surveyMethods = {
    createInitialSurvey: createInitialSurvey,
    getSurveyByUser: getSurveyByID
}

// Exports all the user prisma methods
const userMethods = {
    getUserByEmail: getUserByEmail,
    getUserById: getUserById,
    createUser: createUser,
    deleteUser: deleteUser,
    updateEmail: updateEmail,
    updatePassword: updatePassword
}

const dbMethods = {
    userMethods: userMethods,
    surveyMethods: surveyMethods
}


export default dbMethods;