import randomIntFactory from "../randomIntFactory";

test.concurrent(
  "generates a number within the given range",
  async (): Promise<void> => {
    const testFactory = randomIntFactory(4, 2);

    expect(testFactory()).toBeGreaterThanOrEqual(2);
    expect(testFactory()).toBeGreaterThanOrEqual(2);
    expect(testFactory()).toBeGreaterThanOrEqual(2);

    expect(testFactory()).toBeLessThanOrEqual(4);
    expect(testFactory()).toBeLessThanOrEqual(4);
    expect(testFactory()).toBeLessThanOrEqual(4);
  }
);

test.concurrent(
  "defaults to a min of zero",
  async (): Promise<void> => {
    const testFactory = randomIntFactory(4);

    expect(testFactory()).toBeGreaterThanOrEqual(0);
    expect(testFactory()).toBeGreaterThanOrEqual(0);
    expect(testFactory()).toBeGreaterThanOrEqual(0);
  }
);
