import SlotWheelComponent from "../SlotWheel.vue";
import Vue from "vue";
import renderComponentToString from "../../functions/renderComponentToString";

test.concurrent("passes a smoke test", async (): Promise<void> => {
  const result = await renderComponentToString(SlotWheelComponent);

  expect(result).toMatchSnapshot();
});

test.concurrent("spins", async (): Promise<void> => {
  const options = ["one", "two", "three"];

  const Component = Vue.extend(SlotWheelComponent);

  const TestComponent = new Component({ propsData: { options }}) as SlotWheel;

  await TestComponent.spin();

  expect(options).toContain(TestComponent.displayValue);
});
