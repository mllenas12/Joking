import { Report } from './interfaces.js'

// Fetch a random joke from the API url
const getDadJokesFromApi = async (): Promise<string> => {
    try {
        const res: Response = await
            fetch('https://icanhazdadjoke.com/', {
                headers: {
                    Accept: "application/json"
                },
            });
        if (!res.ok) {
            throw new Error('Error fetching joke from API.')
        }
        const JOKE_DATA: { joke: string } = await res.json();
        return JOKE_DATA.joke;

    } catch (error) {
        console.error('Error fetching joke');
        throw error;
    }
}

const getChuckJokesFromApi = async (): Promise<string> => {
    try {
        const res: Response = await
            fetch('https://api.chucknorris.io/jokes/random');
        if (!res.ok) {
            throw new Error('Error fetching joke from API.')
        }
        const JOKE_DATA: { value: string } = await res.json();
        return JOKE_DATA.value;

    } catch (error) {
        console.error('Error fetching joke');
        throw error;
    }
}

// Display joke on screen and console
const displayJoke = (joke: string): void => {
    let newP: HTMLElement | null = document.createElement("p");
    newP.setAttribute("id", "displayed-joke");
    let newJoke: Text = document.createTextNode(joke);
    newP.appendChild(newJoke);
    console.log(newJoke);
    let element: HTMLElement | null = document.querySelector("#cont");
    if (element !== null) {
        let oldJoke: HTMLElement | null = element.querySelector("p");
        if (oldJoke !== null) {
            element.replaceChild(newP, oldJoke);
        }
    } else {
        console.error("element not found")
    }
}

// Choose randomly if the joke is from Dad Api or Chuck Norris Api
const chooseRandomApi = (API_DAD: string, API_CHUCK: string) => {
    const randomNum = Math.random();
    let apiReturned: string = "";
    if (randomNum < 0.5) {
        return apiReturned = API_DAD;
    } else {
        return apiReturned = API_CHUCK;
    }
}

// Handle click when clicking the "Següent acudit" button
const handleClick = async (): Promise<void> => {
    try {
        const API_DAD: string = await getDadJokesFromApi();
        const API_CHUCK: string = await getChuckJokesFromApi();
        const chosenApi: any = chooseRandomApi(API_DAD, API_CHUCK);
        displayJoke(chosenApi);
    } catch (error) {
        console.error('Failed to get a joke');
    }
}

// Initialize the handleClick function
const initialize = (): void => {
    const element: HTMLElement | null = document.querySelector("#btn");
    if (element) {
        element.addEventListener("click", handleClick);

    } else {
        console.error("Element not found");
    }
}

//Array to add new joke reports
const reportAcudits: Report[] = []

// Joke report class
class JokeReport implements Report {
    constructor(public joke: string, public score: 1 | 2 | 3, public date: string) { }
}

// Handle which score is given 
const handleScores = () => {
    let btn1: HTMLElement | null = document.querySelector("#score-1");
    if (btn1 !== null) {
        btn1.addEventListener("click", () => addReportInArray(1));
    }
    let btn2: HTMLElement | null = document.querySelector("#score-2");
    if (btn2 !== null) {
        btn2.addEventListener("click", () => addReportInArray(2));
    }
    let btn3: HTMLElement | null = document.querySelector("#score-3");
    if (btn3 !== null) {
        btn3.addEventListener("click", () => addReportInArray(3));
    }
}

// Get the current date in ISO format
const getCurrentDate = (): string => (new Date()).toISOString();

// Add the report with the voted score to the reportAcudits array
const addReportInArray = (score: 1 | 2 | 3): void => {
    const element: HTMLEmbedElement | null = document.querySelector("#cont");
    if (element) {
        const jokeElement: HTMLElement | null = element.querySelector("p");

        if (jokeElement) {
            let joke: string = jokeElement.textContent ?? "Element not found";
            const newReport: JokeReport = new JokeReport(joke, score, getCurrentDate());

            if (reportAcudits.find(e => e.joke === newReport.joke)) {
                reportAcudits.pop();
                reportAcudits.push(newReport)
                console.log(reportAcudits);
            } else {
                reportAcudits.push(newReport)
                console.log(reportAcudits)
            }
        } else {
            console.error("Element p not found")
        }
    } else {
        console.error("Element not found")
    }
}

initialize();
handleScores();

