<script setup lang="ts">
import { computed, ref } from "vue";
// 本地源代码调试
// import { Person, type PersonOptsType } from "../";
// 本地编译后调试
// import { Person, type PersonOptsType } from "../../dist/aegis-odyssey.es.js";

type tableType = {
	type: string;
	name: string;
	gender: string;
	country: string;
	address: string;
	info: string;
};

const tableValue = ref<tableType[]>([
	{
		type: "原告",
		name: "Tom",
		gender: "男",
		country: "中国",
		address: "No. 189, Grove St, Los Angeles",
		info: "",
	},
	{
		type: "原告",
		name: "Johnny",
		gender: "男",
		country: "日本",
		address: "No. 189, Grove St, Los Angeles",
		info: "",
	},
]);
const tableHeaderValue = {
	label: {
		type: "类型",
		name: "姓名",
		gender: "性别",
		country: "国籍",
		address: "地址",
		info: "自定义",
	},
	width: {
		type: 60,
		name: 150,
		gender: 116,
		country: 116,
		operate: 100,
	},
	edit: {
		name: "input",
		gender: "radio",
		country: "select",
		address: "textarea",
		info: "custom",
	},
};
const showSwitch = ref(false);
const handleSwitch = () => {
	showSwitch.value = !showSwitch.value;
};
const tableAddValue = ref<tableType>({
	type: "原告",
	name: "",
	gender: "男",
	country: "",
	address: "",
	info: "",
});
const addVerify = computed(() => {
	return !!(tableAddValue.value.type && tableAddValue.value.name && tableAddValue.value.gender);
});

const handleOpen = (type: number, idx: number) => {
	if (type === 1) {
		console.log(idx);
	} else {
		tableValue.value.splice(idx, 1);
	}
};
</script>

<template>
	<div>
		<o-table
			v-model="tableValue"
			v-model:addValue="tableAddValue"
			:header="tableHeaderValue"
			merge="type"
			:add="addVerify"
			:list="{ country: ['中国', '日本', '美国'] }"
		>
			<template #info="scope">
				<div v-show="!showSwitch" class="show" @click="handleSwitch">
					{{ scope.row.name }}: {{ scope.row.gender }}
				</div>
				<el-input v-show="showSwitch" v-model="scope.row.date" type="textarea" autosize />
			</template>
			<!-- <template #operate="scope">
				<el-button class="f12" type="primary" link @click="handleOpen(1, scope.$index)"> 打开 </el-button>
				<el-button class="f12" type="primary" link @click="handleOpen(2, scope.$index)"> 删除 </el-button>
			</template> -->
			<template #add>
				<o-select class="w100 mr10" v-model="tableAddValue.type" :list="['原告', '被告']" />
				<el-input class="mr10" v-model="tableAddValue.name" placeholder="姓名" clearable />
				<o-radio class="mr10" v-model="tableAddValue.gender" type="button" :list="['男', '女']" />
				<o-select
					class="w100 mr10"
					v-model="tableAddValue.country"
					:list="['中国', '日本', '美国']"
					placeholder="国籍"
				/>
				<el-input class="mr10" v-model="tableAddValue.address" placeholder="地址" clearable />
			</template>
		</o-table>
	</div>

	<!-- <div>
		<el-form>
			<el-form-item label="是否减半" disabled>
				<div>
					<el-radio-group v-model="tableAddValue.date">
						<el-radio-button label="o" />
						<el-radio-button label="do" />
					</el-radio-group>
				</div>
				<o-radio v-model="tableAddValue.date" type="button" />
			</el-form-item>
		</el-form>
	</div> -->
</template>
