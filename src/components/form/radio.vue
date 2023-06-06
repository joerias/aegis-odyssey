<script setup lang="ts">
import { computed } from "vue";

defineOptions({
	name: "Radio",
});

type Props = {
	modelValue: string;
	type: "default" | "border" | "button";
	size: "large" | "default" | "small";
	disabled: boolean;
};
const props = withDefaults(defineProps<Props>(), {
	type: "default",
	size: "default",
	disabled: false,
});
const emit = defineEmits<{
	(event: "update:modelValue", val: string): void;
}>();

const val = computed({
	get() {
		return props.modelValue;
	},
	set(val: string) {
		emit("update:modelValue", val);
	},
});
</script>
<template>
	<el-radio-group v-if="props.type === 'default'" v-model="val" :size="props.size" :disabled="props.disabled">
		<el-radio label="是" />
		<el-radio label="否" />
	</el-radio-group>
	<el-radio-group v-if="props.type === 'border'" v-model="val" :size="props.size" :disabled="props.disabled">
		<el-radio border label="是" />
		<el-radio border label="否" />
	</el-radio-group>
	<el-radio-group v-if="props.type === 'button'" v-model="val" :size="props.size" :disabled="props.disabled">
		<el-radio-button label="是" />
		<el-radio-button label="否" />
	</el-radio-group>
</template>
