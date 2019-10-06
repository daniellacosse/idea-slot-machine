import randomIntFactory from "../functions/randomIntFactory";

/**
 *
 *
 * @export
 * @class ShuffleQueue
 * @template T
 */
export default class ShuffleQueue<T> {
  public items: T[];
  private _previousItem?: T;
  private _futureItems: T[];

  /**
   *Creates an instance of ShuffleQueue.
   * @param {T[]} items
   * @memberof ShuffleQueue
   */
  public constructor(items: T[] = []) {
    this.items = items;

    this._previousItem = null;
    this._futureItems = [...items];
  }

  public pick = (): T => {
    let randomIndex: number, randomElement: T;

    const randomInt = randomIntFactory(this._futureItems.length - 1);
    const generateElement = (): void => {
      randomIndex = randomInt();
      randomElement = this._futureItems[randomIndex];
    };

    generateElement();

    while (randomElement === this._previousItem) generateElement();

    this._previousItem = this._futureItems.splice(randomIndex, 1)[0];

    if (!this._futureItems.length) {
      this._futureItems = [...this.items];
    }

    return randomElement;
  };
}
