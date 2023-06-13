<script setup lang="ts">
defineOptions({
	name: "OSelect",
});

type Props = {
	modelValue: string | number;
	type?: "default" | "border" | "button";
	size?: "large" | "default" | "small";
	clearable?: boolean;
	disabled?: boolean;
	placeholder?: string;
	list: (string | number)[];
};
const props = withDefaults(defineProps<Props>(), {
	type: "default",
	size: "default",
	clearable: false,
	disabled: false,
	placeholder: "请选择",
});

const modelValue = defineModel();
</script>
<template>
	<el-select
		v-model="modelValue"
		:size="props.size"
		:clearable="props.clearable"
		:disabled="props.disabled"
		:placeholder="props.placeholder"
	>
		<el-option v-for="(o, i) in list" :key="i" :value="o" />
	</el-select>
</template>
