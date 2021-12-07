import database from "./../db.json";
import Person from "./Person.js";
import TerminalController from "../src/controllers/TerminalController.js";
import { save } from './repository.js';

const DEFAULT_LANG = "pt-br";
const STOP_TERM = ":q";

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
    try {
        const answer = await terminalController.question()
        if(answer === STOP_TERM) {
            terminalController.closeTerminal();
            console.log("Process Finished!");
        }

        const person = Person.generateInstanceFromString(answer);
        terminalController.updateTable(person.formatted(DEFAULT_LANG));

        save(person);

        return mainLoop();
    } catch(error) {
        console.log("An error has ocourred: ", error);

        return mainLoop();
    }
}

await mainLoop()
