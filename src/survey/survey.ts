export interface SurveyData {
    title: string,
    authorId: number,
    authorEmail: string,
    category: string,
    singleQuestion: boolean,
    isPrivate: boolean,
    isRandom: boolean,
    numQuestions: number
}