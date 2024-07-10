import { TSubscriber } from "./subscriber";

export default class Player implements TSubscriber<number> {
    private diceResults: number[] = [];
}