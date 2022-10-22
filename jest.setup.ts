import { createTestingPinia } from "@pinia/testing";
import { config } from "@vue/test-utils";

const piniaTesting = createTestingPinia();

config.global.plugins = [piniaTesting];
