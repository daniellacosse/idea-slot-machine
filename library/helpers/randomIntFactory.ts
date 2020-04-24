/**
 *
 *
 * @export
 * @param {number} max
 * @param {number} [min=0]
 * @returns {() => number}
 */
export default function randomIntFactory(
  max: number,
  min: number = 0
): () => number {
  return (): number => Math.round(Math.random() * (max - min)) + min;
}
