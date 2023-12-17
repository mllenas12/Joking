
const GET_JOKES_FROM_API = async (): Promise<string> => {
    try {
        const ANS: Response = await
            fetch('https://icanhazdadjoke.com/', {
                headers: {
                    Accept: "application/json"
                },
            });
        const JOKE_DATA : {joke: string} = await ANS.json();
        return JOKE_DATA.joke;

    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

const DISPLAY_JOKE = (joke: string): void => {
    let displayJoke: HTMLElement | null = document.querySelector("#displayed-joke")!;
    if (displayJoke) {
        displayJoke.innerHTML = joke;
        console.log(joke);
    } else {
        console.error("element not found")
    }
}

const HANDLE_CLICK = async (): Promise<void> => {
    try {
        const CURRENT_JOKE : string = await GET_JOKES_FROM_API();
        DISPLAY_JOKE(CURRENT_JOKE);
    } catch (error) {
        console.error(error);
    }
}

const INITIALIZE = (): void => {
    const element: HTMLElement | null = document.querySelector("#btn");
    if (element) {
        element.addEventListener("click", HANDLE_CLICK);
    } else {
        console.error("Element not found");
    }
}

INITIALIZE();


