<script setup lang="ts">
defineOptions({
	name: "ODate",
});
import { computed } from "vue";

type Props = {
	modelValue: string | string[];
	type?: "date" | "daterange";
	size?: "large" | "default" | "small";
	short?: boolean;
	clearable?: boolean;
	disabled?: boolean;
	placeholder?: string;
	startPlaceholder?: string;
	endPlaceholder?: string;
	disabledDate?: Function;
	defaultShortcuts?: boolean;
	shortcuts?: { text: string; value: Date | Function }[];
};
const props = withDefaults(defineProps<Props>(), {
	type: "date",
	size: "default",
	short: false,
	clearable: true,
	disabled: false,
	placeholder: "请选择",
	startPlaceholder: "开始时间",
	endPlaceholder: "结束时间",
	defaultShortcuts: false,
});

const shortcuts = computed(() => {
	let result: { text: string; value: Date | Function }[] = [];
	if (props.defaultShortcuts && props.type === "date") {
		result = [
			{
				text: "今日",
				value: new Date(),
			},
			{
				text: "昨日",
				value: () => {
					const date = new Date();
					date.setTime(date.getTime() - 3600 * 1000 * 24);
					return date;
				},
			},
			{
				text: "上周",
				value: () => {
					const date = new Date();
					date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
					return date;
				},
			},
		];
	} else if (props.defaultShortcuts && props.type === "daterange") {
		result = [
			{
				text: "上周",
				value: () => {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					return [start, end];
				},
			},
			{
				text: "上月",
				value: () => {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
					return [start, end];
				},
			},
			{
				text: "上季",
				value: () => {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
					return [start, end];
				},
			},
		];
	} else {
		result = <{ text: string; value: Date | Function }[]>props.shortcuts;
	}
	return result;
});

const modelValue = defineModel();
</script>
<template>
	<div class="er">
		<el-date-picker
			v-model="modelValue"
			:class="{ short: props.short }"
			:type="props.type"
			:size="props.size"
			:disabled-date="props.disabledDate"
			:shortcuts="shortcuts"
			:placeholder="props.placeholder"
		/>
	</div>
</template>

<style lang="less" scoped>
:deep(.el-date-editor.el-input),
:deep(.el-date-editor.el-input__wrapper) {
	width: auto;
}
:deep(.el-date-editor.el-input.short) {
	width: 140px;
}
:deep(.el-date-editor.el-input__wrapper.short) {
	width: 200px;
}
</style>
