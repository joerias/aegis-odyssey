<script setup lang="ts">
defineOptions({
	name: "OTable",
});

import { useSlots } from "vue";

type Props = {
	modelValue: any;
	header?: any;
	index?: boolean;
	add?: boolean;
	selectList?: any;
};
const props = withDefaults(defineProps<Props>(), {
	index: false,
	add: false,
});

type Obj = {
	[key: string]: string;
};
const modelValue = defineModel();
const getUnit = { ...(<Obj[]>modelValue.value)[0] };
Object.keys(getUnit).forEach((v) => (getUnit[v] = ""));

const handleOperate = (idx: number) => {
	if (typeof idx !== "number") {
		if (!!useSlots().add) {
		} else {
			(<Obj[]>modelValue.value).push(getUnit);
		}
	} else {
		(<Obj[]>modelValue.value).splice(idx, 1);
	}
};
</script>
<template>
	<el-table :data="modelValue" stripe border>
		<el-table-column v-if="props.index" type="index" width="40" />
		<template v-for="o in Object.keys(props.header.label)">
			<el-table-column
				v-if="!Object.keys(props.header.edit).includes(o)"
				:prop="o"
				:label="props.header.label[o]"
				:width="props.header.width[o] || 0"
			/>
			<el-table-column v-else :prop="o" :label="props.header.label[o]" :width="props.header.width[o] || 0">
				<template #default="scope">
					<template v-if="props.header.edit[o] === 'input'">
						<el-input v-model="scope.row[o]" />
					</template>
					<template v-else-if="props.header.edit[o] === 'textarea'">
						<el-input v-model="scope.row[o]" type="textarea" autosize />
					</template>
					<template v-else-if="props.header.edit[o] === 'radio'">
						<o-radio v-model="scope.row[o]" type="button" :list="['男', '女']" />
					</template>
					<template v-else-if="props.header.edit[o] === 'select'">
						<el-select v-model="scope.row[o]" placeholder="请选择">
							<el-option v-for="(o2, i2) in props.selectList[o]" :key="i2" :value="o2" />
						</el-select>
					</template>
					<slot v-else-if="props.header.edit[o] === 'custom'" :name="o" v-bind="scope" />
				</template>
			</el-table-column>
		</template>
		<el-table-column v-if="props.add && !$slots.operate" label="操作" width="60" header-align="center">
			<template #default="scope">
				<el-button class="f12" type="primary" link @click="handleOperate(scope.$index)"> 删除 </el-button>
			</template>
		</el-table-column>
		<el-table-column
			v-else="props.add && !$slots.operate"
			label="操作"
			:width="props.header.width.operate ?? 60"
			header-align="center"
		>
			<template #default="scope">
				<slot name="operate" v-bind="scope" />
			</template>
		</el-table-column>
	</el-table>
	<div v-if="props.add" :class="['add-box', { single: !$slots.add }]">
		<div v-if="!!$slots.add" class="content">
			<slot name="add" />
		</div>
		<el-button type="primary" plain @click="handleOperate">添加</el-button>
	</div>
</template>

<style lang="less" scoped>
.add-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 10px;
	&.single {
		.el-button {
			width: 100%;
		}
	}
	.content {
		display: flex;
		:deep(.el-radio-group) {
			flex-wrap: nowrap;
		}
	}
}
</style>
