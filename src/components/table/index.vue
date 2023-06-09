<script setup lang="ts">
import { useSlots, computed } from "vue";
import type { TableColumnCtx } from "element-plus";
import { cloneDeep } from "lodash-es";
defineOptions({
	name: "OTable",
});

type Props = {
	modelValue: any;
	addValue: any;
	header?: { [key: string]: { [key: string]: string | number } };
	btnName?: string;
	index?: boolean;
	add?: boolean | null;
	list?: TypeList;
	merge?: string;
};
type TypeList = {
	[key: string]: (string | number)[];
};
interface SpanMethodProps {
	row: any;
	column: TableColumnCtx<any>;
	rowIndex: number;
	columnIndex: number;
}
const props = withDefaults(defineProps<Props>(), {
	btnName: "添加",
	index: false,
	add: null,
	merge: "",
});

type Obj = {
	[key: string]: string;
};
const modelValue = defineModel();
const getUnit = computed(() => {
	let unit: any = undefined;
	if ((<Obj[]>modelValue.value).length !== 0) {
		unit = { ...(<Obj[]>modelValue.value)[0] };
		Object.keys(unit).forEach((v) => (unit[v] = ""));
	}
	return unit;
});
const addValue = defineModel("addValue");
const addValueOrigin = cloneDeep(addValue.value);

const slotAddState = !!useSlots().add;
const handleOperate = (idx: number) => {
	if (typeof idx !== "number") {
		// 行新增
		if (slotAddState) {
			// 自定义新增
			if (props.merge) {
				let i = 0;
				const pos = new Map();
				(<Obj[]>modelValue.value).forEach((v, i) => {
					pos.set(v[props.merge], pos.has(v[props.merge]) ? pos.get(v[props.merge]) + 1 : i);
				});
				let has = false;
				for (let i of pos.keys()) {
					if (i === (<Obj>addValue.value)[props.merge]) has = true;
				}
				if (has) {
					for (const [k, v] of pos.entries()) {
						if ((<Obj>addValue.value)[props.merge] === k)
							(<Obj[]>modelValue.value).splice(v + 1, 0, <Obj>addValue.value);
					}
				} else {
					(<Obj[]>modelValue.value).push(<Obj>addValue.value);
				}
			} else {
				(<Obj[]>modelValue.value).push(<Obj>addValue.value);
			}
			addValue.value = cloneDeep(addValueOrigin);
		} else {
			// 默认新增
			(<Obj[]>modelValue.value).push(getUnit.value);
		}
	} else {
		// 行删除
		(<Obj[]>modelValue.value).splice(idx, 1);
	}
};

const typeArr = computed(() => {
	const m = new Map(),
		n = new Map();
	(<any>modelValue.value).forEach((v: any, i: number) => {
		if (m.has(v[props.merge])) {
			m.set(v[props.merge], m.get(v[props.merge]) + 1);
		} else {
			m.set(v[props.merge], 1);
			n.set(v[props.merge], i);
		}
	});
	const map = { len: m, pos: n };
	return [...map.len.values()];
});

const objectSpanMethod = ({ rowIndex, columnIndex }: SpanMethodProps) => {
	if (columnIndex === 0) {
		if (props.merge) {
			if (rowIndex === 0) {
				return {
					rowspan: typeArr.value[0],
					colspan: 1,
				};
			} else if (rowIndex === typeArr.value[0]) {
				return {
					rowspan: typeArr.value[1],
					colspan: 1,
				};
			} else if (rowIndex === typeArr.value[0] + typeArr.value[1]) {
				return {
					rowspan: typeArr.value[2],
					colspan: 1,
				};
			} else {
				return {
					rowspan: 0,
					colspan: 0,
				};
			}
		} else {
			return {
				rowspan: 1,
				colspan: 1,
			};
		}
	}
};
</script>
<template>
	<el-table :data="modelValue" stripe border :span-method="objectSpanMethod">
		<el-table-column v-if="props.index" type="index" width="40" />
		<template v-for="o in Object.keys(props.header!.label)">
			<el-table-column
				v-if="!Object.keys(props.header!.edit).includes(o)"
				:prop="o"
				:label="props.header!.label[o]"
				:width="props.header!.width ? props.header!.width[o] || 0 : 0"
			/>
			<el-table-column
				v-else
				:prop="o"
				:label="props.header!.label[o]"
				:width="props.header!.width ? props.header!.width[o] || 0 : 0"
			>
				<template #default="scope">
					<template v-if="props.header!.edit[o] === 'input'">
						<el-input v-model="scope.row[o]" clearable />
					</template>
					<template v-else-if="props.header!.edit[o] === 'textarea'">
						<el-input v-model="scope.row[o]" type="textarea" autosize />
					</template>
					<template v-else-if="props.header!.edit[o] === 'radio'">
						<o-radio v-model="scope.row[o]" type="button" :list="['男', '女']" />
					</template>
					<template v-else-if="props.header!.edit[o] === 'select'">
						<o-select v-model="scope.row[o]" :list="props.list![o]" />
					</template>
					<template v-else-if="props.header!.edit[o] === 'date'">
						<o-date v-model="scope.row[o]" type="date" />
					</template>
					<slot v-else-if="props.header!.edit[o] === 'custom'" :name="o" v-bind="scope" />
				</template>
			</el-table-column>
		</template>
		<el-table-column
			v-if="typeof props.add === 'boolean' && !$slots.operate"
			label="操作"
			width="60"
			header-align="center"
		>
			<template #default="scope">
				<el-button class="f12" type="primary" link @click="handleOperate(scope.$index)"> 删除 </el-button>
			</template>
		</el-table-column>
		<el-table-column
			v-else="typeof props.add === 'boolean' && !$slots.operate"
			label="操作"
			:width="props.header!.width ? props.header!.width.operate ?? 60 : 60"
			header-align="center"
		>
			<template #default="scope">
				<slot name="operate" v-bind="scope" />
			</template>
		</el-table-column>
	</el-table>
	<div v-if="typeof props.add === 'boolean'" :class="['add-box', { single: !$slots.add }]">
		<div v-if="!!$slots.add" class="content">
			<slot name="add" />
		</div>
		<div class="btn">
			<el-button type="primary" plain @click="handleOperate" :disabled="!props.add">
				{{ props.btnName }}
			</el-button>
		</div>
	</div>
</template>

<style lang="less" scoped>
.add-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 10px;
	&.single {
		.btn {
			flex: 1;
		}
		.el-button {
			width: 100%;
		}
	}
	.content {
		display: flex;
		:deep(> div) {
			flex: 0 0 auto;
		}
		:deep(.el-radio-group) {
			flex-wrap: nowrap;
		}
	}
	.btn {
		display: flex;
		flex: 0 0 80px;
		justify-content: flex-end;
	}
}
</style>
