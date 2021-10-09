export default interface Question {
    surveyId: number, 
    questionType: string,  
    order: number,
    questionText: string,
    answers: string[]
}