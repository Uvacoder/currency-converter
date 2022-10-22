<template>
  <currency-converter />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import CurrencyConverter from "./components/currency-converter/CurrencyConverter.vue";

export default defineComponent({
  name: "App",
  components: {
    CurrencyConverter,
  },
});
</script>
