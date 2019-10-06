import SlotMachine from "../SlotMachine.vue";
import renderComponentToString from "../../functions/renderComponentToString";

test.concurrent("passes a smoke test", async (): Promise<void> => {
  const result = await renderComponentToString(SlotMachine);

  expect(result).toMatchSnapshot();
});
