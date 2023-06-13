<script setup lang="ts">
defineOptions({
	name: "ORadio",
});

type Props = {
	modelValue: string | number;
	type?: "default" | "border" | "button";
	size?: "large" | "default" | "small";
	disabled?: boolean;
	list?: (string | number)[];
};
const props = withDefaults(defineProps<Props>(), {
	type: "default",
	size: "default",
	disabled: false,
	list: () => ["是", "否"],
});

const modelValue = defineModel();
</script>
<template>
	<div>
		<el-radio-group
			v-if="props.type === 'default'"
			v-model="modelValue"
			:size="props.size"
			:disabled="props.disabled"
		>
			<el-radio v-for="(o, i) in props.list" :key="i" :label="o" />
		</el-radio-group>
		<el-radio-group
			v-if="props.type === 'border'"
			v-model="modelValue"
			:size="props.size"
			:disabled="props.disabled"
		>
			<el-radio border v-for="(o, i) in props.list" :key="i" :label="o" />
		</el-radio-group>
		<el-radio-group
			v-if="props.type === 'button'"
			v-model="modelValue"
			:size="props.size"
			:disabled="props.disabled"
		>
			<el-radio-button v-for="(o, i) in props.list" :key="i" :label="o" />
		</el-radio-group>
	</div>
</template>
