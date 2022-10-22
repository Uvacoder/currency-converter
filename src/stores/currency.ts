import axios from "axios";
import { defineStore } from "pinia";
import { CurrencyData, CurrencyState } from "./types/currency.types";

export const useCurrencyStore = defineStore("currency", {
  state: (): CurrencyState => ({
    from: {
      value: 1,
      type: ''
    },
    to: {
      value: 0,
      type: ''
    },
  }),
  actions: {
    async getCurrency(currency: string): Promise<Record<string, CurrencyData>> {
      let response: Record<string, CurrencyData> = {};

      await axios
        .get(`http://www.floatrates.com/daily/${currency}.json`)
        .then((res) => (response = res.data));

      return response;
    },
  },
});
