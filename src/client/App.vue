<script setup lang="ts">
import { ref } from "vue";
// 本地源代码调试
// import { Person, type PersonOptsType } from "../";
// 本地编译后调试
// import { Person, type PersonOptsType } from "../../dist/aegis-odyssey.es.js";

const tableAddValue = ref([
	{
		name: "Tom",
		gender: "男",
		country: "中国",
		date: "2016-05-03",
		address: "No. 189, Grove St, Los Angeles",
		info: "",
	},
	{
		name: "Jack",
		gender: "女",
		country: "美国",
		date: "2016-05-02",
		address: "No. 189, Grove St, Los Angeles",
		info: "",
	},
]);
const tableAddHeaderValue = ref({
	label: {
		name: "姓名",
		gender: "性别",
		country: "国籍",
		date: "日期",
		address: "地址",
		info: "自定义",
	},
	width: {
		name: 150,
		gender: 116,
		country: 116,
		date: 200,
		operate: 100,
	},
	edit: {
		name: "input",
		gender: "radio",
		country: "select",
		address: "textarea",
		info: "custom",
	},
});
const showSwitch = ref(false);
const handleSwitch = () => {
	showSwitch.value = !showSwitch.value;
};
const addObj = ref({
	name: "",
	gender: "女",
	country: "",
	date: "",
	address: "",
	info: "",
});
</script>

<template>
	<div>
		<o-table
			v-model="tableAddValue"
			v-model:header="tableAddHeaderValue"
			index
			add
			:selectList="{ country: ['中国', '日本', '美国'] }"
		>
			<template #info="scope">
				<div v-show="!showSwitch" class="show" @click="handleSwitch">
					{{ scope.row.name }}: {{ scope.row.gender }}
				</div>
				<el-input v-show="showSwitch" v-model="scope.row.date" type="textarea" autosize />
			</template>
			<template #operate="scope">
				<el-button class="f12" type="primary" link> 打开 </el-button>
				<el-button class="f12" type="primary" link> 删除 </el-button>
			</template>
			<template #add>
				<div>
					<el-input class="mr10" v-model="addObj.name" />
					<o-radio class="mr10" v-model="addObj.gender" type="button" :list="['男', '女']" />
					<div class="w200">
						<el-select class="mr10" v-model="addObj.country" placeholder="请选择">
							<el-option v-for="(o2, i2) in ['中国', '日本', '美国']" :key="i2" :value="o2" />
						</el-select>
					</div>
					<el-input class="mr10" v-model="addObj.date" />
					<el-input class="mr10" v-model="addObj.address" />
					<el-input class="mr10" v-model="addObj.info" />
				</div>
			</template>
		</o-table>
	</div>

	<div></div>
</template>
