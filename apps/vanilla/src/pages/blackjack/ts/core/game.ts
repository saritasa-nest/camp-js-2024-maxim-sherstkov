import { ResultDisplayer } from '../views/resultDisplayer';

import { WinnerDisplayer } from '../views/winnerDisplayer';

import { DebugDisplayer } from '../views/debugDisplayer';

import { TurnGenerator } from './turnGenerator';
import { Player } from './player';
import { DiceGenerator } from './diceGenerator';
import { Publisher } from './publisher';

/**
 * Type for Game class constructor.
 */
type GameConstructorData = {

	/** The number of players. */
	playersCount: number;

	/** The number of sides on the dice. */
	diceSidesCount: number;

	/** Array of HTML elements to display player results. */
	playerElements: HTMLElement[];

	/** The HTML element to display debug information. */
	debugElement: HTMLElement;
};

/**
 * Game class that manages the game logic and UI updates.
 * @param GameConstructorData - Params needed for the Game class instance.
 */
export class Game {
	private readonly players: readonly Player[];

	private readonly turnGenerator$: TurnGenerator;

	private readonly diceGenerator$: DiceGenerator;

	private readonly debugPublisher$: Publisher<number>;

	private readonly debugDisplayer: DebugDisplayer;

	public constructor(constructorData: GameConstructorData) {
		this.players = new Array(constructorData.playersCount).fill(null)
			.map(() => new Player());
		this.turnGenerator$ = new TurnGenerator(constructorData.playersCount);
		this.diceGenerator$ = new DiceGenerator(constructorData.diceSidesCount);
		this.debugPublisher$ = new Publisher<number>();
		this.debugDisplayer = new DebugDisplayer(constructorData.debugElement);

		this.players.forEach((player, index) => {
			const resultDisplayer = new ResultDisplayer(constructorData.playerElements[index]);

			const winnerDisplayer = new WinnerDisplayer(constructorData.playerElements[index]);

			player.results$.subscribe(resultDisplayer);
			player.winStatus$.subscribe(winnerDisplayer);
		});

		this.turnGenerator$.subscribe({
			update: (currentPlayerIndex: number) => {
				const currentPlayer = this.players[currentPlayerIndex];

				/* Unsubscribe all players from DiceGenerator */
				this.players.forEach(player => this.diceGenerator$.unsubscribe(player));

				/* Subscribe the current player to DiceGenerator */
				this.diceGenerator$.subscribe(currentPlayer);

				/* Roll the dice for the current player */
				const diceResult = this.diceGenerator$.roll();

				/* Sends result of the roll to debug subscribers */
				this.debugPublisher$.notify(diceResult);
			},
		});

		this.debugPublisher$.subscribe(this.debugDisplayer);
	}

	/**
	 * Plays a turn by executing turnGenerator's method.
	 */
	public playTurn(): void {
		this.turnGenerator$.next();
	}
}
