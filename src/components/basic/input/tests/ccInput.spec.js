import { mount } from "@vue/test-utils";

import CcInput from "../CcInput.vue";

describe("CcInput.vue", () => {
  const wrapper = mount(CcInput);

  test("Component has mounted", () => {
    expect(wrapper.findComponent(CcInput).exists()).toBe(true);
  });

  test("value is emitted on input", () => {
    wrapper.vm.onInput({ target: { value: "test" } });
    expect(wrapper.emitted("update:modelValue")[0]).toStrictEqual(["test"]);
  });
});
