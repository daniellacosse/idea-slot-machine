import ShuffleQueue from "../ShuffleQueue";

test.concurrent("constructs", async (): Promise<void> => {
  expect(new ShuffleQueue()).toBeTruthy();
});

test.concurrent("pick", async (): Promise<void> => {
  const elements = ["one", "two", "three"];
  const queue = new ShuffleQueue<string>(elements);

  const randomElement1 = queue.pick();
  const randomElement2 = queue.pick();
  const randomElement3 = queue.pick();
  const randomElement4 = queue.pick();
  const randomElement5 = queue.pick();
  const randomElement6 = queue.pick();

  expect(elements).toContain(randomElement1);
  expect(elements).toContain(randomElement2);
  expect(elements).toContain(randomElement3);
  expect(elements).toContain(randomElement4);
  expect(elements).toContain(randomElement5);
  expect(elements).toContain(randomElement6);

  expect(new Set([
    randomElement1,
    randomElement2,
    randomElement3,
    randomElement4,
    randomElement5,
    randomElement6
  ]).size).toEqual(elements.length);
});
