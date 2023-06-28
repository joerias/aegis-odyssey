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
	date: string;
	address: string;
	info: string;
};

const tableValue = ref<tableType[]>([
	{
		type: "原告",
		name: "Tom",
		gender: "男",
		country: "中国",
		date: "2022-01-01",
		address: "No. 189, Grove St, Los Angeles",
		info: "",
	},
	{
		type: "原告",
		name: "Johnny",
		gender: "男",
		country: "日本",
		date: "2022-01-01",
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
		date: "日期",
		address: "地址",
		info: "自定义",
	},
	width: {
		type: 60,
		name: 150,
		gender: 116,
		country: 116,
		date: 170,
		operate: 100,
	},
	edit: {
		name: "input",
		gender: "radio",
		country: "select",
		date: "date",
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
	date: "",
	address: "",
	info: "",
});
const addVerify = computed(() => {
	return !!(tableAddValue.value.type && tableAddValue.value.name);
});

const handleOpen = (type: number, idx: number) => {
	if (type === 1) {
		console.log(idx);
	} else {
		tableValue.value.splice(idx, 1);
	}
};

const date = ref(["2022-01-01", "2022-01-10"]);
const disabledDate = (time: Date) => {
	console.log(time.getTime(), Date.now());
	return time.getTime() > Date.now();
};
const shortcuts = [
	{
		text: "Today",
		value: new Date(),
	},
	{
		text: "Yesterday",
		value: () => {
			const date = new Date();
			date.setTime(date.getTime() - 3600 * 1000 * 24);
			return date;
		},
	},
	{
		text: "A week ago",
		value: () => {
			const date = new Date();
			date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
			return date;
		},
	},
];
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
				<el-input class="mr10 w200" v-model="tableAddValue.name" placeholder="姓名" clearable />
				<o-radio class="mr10" v-model="tableAddValue.gender" type="button" :list="['男', '女']" />
				<o-select
					class="w100 mr10"
					v-model="tableAddValue.country"
					:list="['中国', '日本', '美国']"
					placeholder="国籍"
				/>
				<o-date class="mr10" v-model="tableAddValue.date" short />
				<el-input class="mr10 w300" v-model="tableAddValue.address" placeholder="地址" clearable />
			</template>
		</o-table>
	</div>

	<div class="mt10">
		<o-date class="" v-model="date" type="daterange" defaultShortcuts short />
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
