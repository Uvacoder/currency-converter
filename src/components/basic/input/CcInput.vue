<template>
  <div class="cc-input" :class="{ 'cc-input__disabled': disabled }">
    <label v-if="label">{{ label }}</label>
    <input :value="modelValue" @input="onInput" :disabled="disabled" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CcInput",
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const onInput = (event: Event): void => {
      context.emit(
        "update:modelValue",
        (event.target as HTMLInputElement).value
      );
    };

    return {
      onInput,
    };
  },
});
</script>

<style lang="scss" scoped>
.cc-input {
  &__disabled {
    opacity: 0.6;
  }

  input {
    border: 1px solid lightgrey;
    background: none;
    border-radius: 7px;
    padding: 6px 3px 6px 10px;
  }
}
</style>
