<script setup lang="ts">
defineOptions({
	name: "OSelect",
});

type Props = {
	modelValue: string | number;
	size?: "large" | "default" | "small";
	clearable?: boolean;
	disabled?: boolean;
	placeholder?: string;
	list: (string | number)[];
};
const props = withDefaults(defineProps<Props>(), {
	size: "default",
	clearable: true,
	disabled: false,
	placeholder: "请选择",
});

const modelValue = defineModel();
</script>
<template>
	<div>
		<el-select
			v-model="modelValue"
			:size="props.size"
			:clearable="props.clearable"
			:disabled="props.disabled"
			:placeholder="props.placeholder"
		>
			<el-option v-for="(o, i) in list" :key="i" :value="o" />
		</el-select>
	</div>
</template>
