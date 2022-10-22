<template>
  <div class="currency-converter">
    <div class="currency-converter-content">
      <h1>Currency Converter</h1>

      <div class="currency-converter-input">
        <cc-input
          v-model="from.value"
          @update:model-value="calculateValue(to.type)"
        />

        <cc-select
          :value="from.type"
          :items="currenciesDropdownList"
          @update:select="updateCurrencyRates($event, 'from')"
        />
      </div>

      <div class="currency-converter-input">
        <cc-input :model-value="to.value" disabled />
        <cc-select
          :value="to.type"
          :items="currenciesDropdownList"
          @update:select="updateCurrencyRates($event, 'to')"
        />
      </div>

      <p v-if="!isValueNumber(from.value)" class="error-message">
        {{ isValueNumber(from.value) ? "" : "Value must be a number" }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { storeToRefs } from "pinia";
import { useCurrencyStore } from "../../stores/currency";
import { CurrencyData } from "../../stores/types/currency.types";
import { SelectOption } from "../basic/select/types/ccSelect.types";

import CcInput from "../basic/input/CcInput.vue";
import CcSelect from "../basic/select/CcSelect.vue";

export default defineComponent({
  name: "CurrencyConverter",
  components: {
    CcInput,
    CcSelect,
  },
  setup() {
    const currencyStore = useCurrencyStore();

    const { from, to } = storeToRefs(currencyStore);

    let currencyRates: Record<string, CurrencyData> = {};
    const currenciesDropdownList = ref<SelectOption[]>([]);

    const calculateValue = (currency: string): void => {
      if (isValueNumber(from.value.value)) {
        to.value.value = parseFloat(
          (
            from.value.value *
            (currencyRates[currency.toLowerCase()]?.rate || 1)
          ).toFixed(2)
        );
      }
    };

    /*
     * When a new currency is selected to convert FROM - call API for new rates
     * Set the store values and re-convert the currency using new rates
     */
    const updateCurrencyRates = async (
      currency: string,
      type: string
    ): Promise<void> => {
      if (type === "from") {
        currencyRates = await currencyStore.getCurrency(currency);
        from.value.type = currency;
      } else if (type === "to") {
        to.value.type = currency;
      }

      calculateValue(to.value.type);
    };

    /*
     * Gets a list of all the currencies to allow them to always be presented
     * in the list and sets the default values
     */
    onBeforeMount(async () => {
      const res: Record<string, CurrencyData> = await currencyStore.getCurrency(
        "all"
      );

      if (res) {
        currenciesDropdownList.value = Object.keys(res).map((currencyKey) => ({
          text: res[currencyKey].name,
          value: res[currencyKey].code,
        }));
      }

      currencyStore.from.type = "GBP";
      currencyStore.to.type = "USD";

      await updateCurrencyRates("GBP", "from");
    });

    const isValueNumber = (value: any): boolean => {
      return value.length ? /^-?\d+$/.test(value) : true;
    };

    return {
      from,
      to,
      currencyRates,
      currenciesDropdownList,
      isValueNumber,
      calculateValue,
      updateCurrencyRates,
    };
  },
});
</script>

<style lang="scss" scoped>
.currency-converter {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 5px;

  &-input {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;
  }

  .error-message {
    margin: 0;
    margin-top: 2px;
    color: #f06c7c;
    font-size: 12px;
  }

  &-content {
    border: 1px solid lightgrey;
    border-radius: 10px;
    margin: 10px;
    padding: 20px;

    h1 {
      color: #f06c7c;
      text-align: center;
      margin-top: 0;
      margin-bottom: 30px;
      letter-spacing: 1.5px;
    }

    @media (min-width: 768px) {
      padding: 40px;
    }
  }
}
</style>
