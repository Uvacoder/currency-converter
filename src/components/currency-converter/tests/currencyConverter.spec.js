import { mount } from "@vue/test-utils";
import { useCurrencyStore } from "../../../stores/currency";

import CurrencyConverter from "../CurrencyConverter.vue";

describe("CurrencyConverter.vue", () => {
  let wrapper;
  const currencyStore = useCurrencyStore();

  beforeEach(() => {
    wrapper = mount(CurrencyConverter);

    jest.spyOn(currencyStore, "getCurrency").mockImplementationOnce(() => ({
      usd: {
        rate: 2,
      },
    }));
  });

  test("Component has mounted", () => {
    expect(wrapper.findComponent(CurrencyConverter).exists()).toBe(true);
  });

  describe("isValueNumber", () => {
    test("value is number", () => {
      expect(wrapper.vm.isValueNumber(1)).toBe(true);
    });

    test("value is number", () => {
      expect(wrapper.vm.isValueNumber("test")).toBe(false);
    });
  });

  describe("calculateValue", () => {
    test("from value is a valid number", () => {
      currencyStore.from.value = 20;
      wrapper.vm.calculateValue("usd");

      expect(currencyStore.to.value).toBe(40);
    });

    test("from value is NOT a valid number", () => {
      currencyStore.$reset();

      currencyStore.from.value = "test";
      wrapper.vm.calculateValue("usd");

      expect(currencyStore.to.value).toBe(0);
    });
  });

  describe("updateCurrencyRates", () => {
    test("type = from", async () => {
      await wrapper.vm.updateCurrencyRates("usd", "from");

      expect(currencyStore.from.type).toBe("usd");
    });

    test("type = to", async () => {
        await wrapper.vm.updateCurrencyRates("usd", "to");
  
        expect(currencyStore.to.type).toBe("usd");
      });
  });
});
