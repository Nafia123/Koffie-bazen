import axios from "axios";

interface IQuizQuestion {
    id: string;
    image: string;
    question: string;
    relevantField: string;
    answers: object[];
}

const url = 'https://tomcat.jordanvanbeijnhem.nl/koffiechefs/quiz-questions';
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
}

export async function getQuizQuestions() {
    return await axios.get<Array<IQuizQuestion>>(url, {headers: headers});
}
