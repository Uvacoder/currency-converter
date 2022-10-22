<template>
  <select class="cc-select" v-model="selected">
    <option v-for="item in items" :value="item.value">
      {{ item.text }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, watchEffect } from "vue";
import { SelectOption } from "./types/ccSelect.types";

export default defineComponent({
  name: "CcSelect",
  props: {
    value: {
      type: String,
      default: "",
    },
    items: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
    },
  },
  emits: ["update:select"],
  setup(props, context) {
    const selected = ref<string>("");

    watch(selected, () => {
      if (selected.value !== props.value) {
        context.emit("update:select", selected.value);
      }
    });

    watch(
      () => props.value,
      () => (selected.value = props.value)
    );

    return {
      selected,
    };
  },
});
</script>
<style lang="scss" scoped>
.cc-select {
  border: 1px solid lightgrey;
  background: none;
  border-radius: 7px;
  padding: 6px;
  width: 100%;
}
</style>
