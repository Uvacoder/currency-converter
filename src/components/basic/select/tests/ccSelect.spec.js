import { mount } from "@vue/test-utils";

import CcSelect from "../CcSelect.vue";

describe("CcSelect.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CcSelect);
  });

  test("Component has mounted", () => {
    expect(wrapper.findComponent(CcSelect).exists()).toBe(true);
  });

  test("value prop updates selected value", async () => {
    expect(wrapper.vm.selected).toBe("");
    await wrapper.setProps({ value: "test" });
    expect(wrapper.vm.selected).toBe("test");
  });

  describe("watch(select)", () => {
    test("selected NOT the same a value prop - emits value", async () => {
      wrapper.vm.selected = "test1";

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(wrapper.emitted("update:select")[0]).toStrictEqual(["test1"]);
    });

    test("selected IS the same a value prop - does not emit", async () => {
      await wrapper.setProps({ value: "test2" });
      wrapper.vm.selected = "test2";

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(wrapper.emitted("update:select")).toBe(undefined);
    });
  });
});
