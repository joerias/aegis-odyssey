# AegisOdyssey 插件说明

实现项目内部分 ui 的全局化配置和使用。

#### 安装

```javascript
npm i aegis-odyssey
```

#### 全局配置

1. main.ts 引入对应插件

```javascript
// 引入
import { Odyssey } from "aegis-odyssey";

// 全局挂载
app.use(Odyssey).mount("#app");
```

#### 颗粒 UI 组件

1. radio 多组 UI 组件

```javascript
// 使用方法
<o-radio v-model="rValue" type="button" size="small" disabled :list=['项1','项2'] />
```

| key      | 条件 |                   value                   |   default   |
| :------- | :--: | :---------------------------------------: | :---------: |
| v-model  | 必填 |           string &#124; number            |     ''      |
| type     | 选填 | "default" &#124; "border" &#124; "button" |  'default'  |
| size     | 选填 |  "large" &#124; "default" &#124; "small"  |  'default'  |
| disabled | 选填 |                  boolean                  |    false    |
| list     | 选填 |         (string &#124; number) []         | ["是","否"] |

2. select 组件

```javascript
// 使用方法
<o-select v-model="rValue" type="button" size="small" disabled :list=['项1','项2'] />
```

| key         | 条件 |                  value                  |  default  |
| :---------- | :--: | :-------------------------------------: | :-------: |
| v-model     | 必填 |          string &#124; number           |    ''     |
| type        | 选填 |                 待扩展                  |     -     |
| size        | 选填 | "large" &#124; "default" &#124; "small" | 'default' |
| clearable   | 选填 |                 boolean                 |   false   |
| disabled    | 选填 |                 boolean                 |   false   |
| placeholder | 选填 |                 string                  | '请选择'  |
| list        | 必填 |        (string &#124; number) []        | ["A","B"] |

#### 复合 UI 组件

1. table 组件

```javascript
// 依赖变量
const tableValue = ref([
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
const tableHeaderValue = ref({
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
});
const showSwitch = ref(false);
const handleSwitch = () => {
	showSwitch.value = !showSwitch.value;
};
const tableAddValue = ref({
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

// 使用方法
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
  <template #operate="scope">
    <el-button class="f12" type="primary" link @click="handleOpen(1, scope.$index)"> 打开 </el-button>
    <el-button class="f12" type="primary" link @click="handleOpen(2, scope.$index)"> 删除 </el-button>
  </template>
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
```

| key              | 条件 |                         value                          |     default      | desc                                                                                                     |
| :--------------- | :--: | :----------------------------------------------------: | :--------------: | :------------------------------------------------------------------------------------------------------- |
| v-model          | 必填 |                        [{...}]                         |                  | table 数组对象                                                                                           |
| v-model:addValue | 选填 |                         {...}                          |                  | "新增"功能 + custom 的单项 item                                                                          |
| header           | 必填 |                           {}                           |                  | table 渲染 th 的规则                                                                                     |
| header.label     | 必填 |                         string                         |                  | 对应 th 里面的描述名，不可缺省                                                                           |
| header.width     | 选填 |                         number                         |                  | 对应单列宽度，不定义为自适应，可缺省                                                                     |
| header.edit      | 选填 | input&#124;radio&#124;select&#124;textarea&#124;custom |                  | 对应单列是否编辑，可缺省                                                                                 |
| btnName          | 选填 |                         string                         |      '添加'      | table"新增"功能默认按钮描述                                                                              |
| index            | 选填 |                        boolean                         |      false       | table 是否显示序列                                                                                       |
| merge            | 选填 |                         string                         |        ''        | table 是否分组，分组 key 由 merge 值决定，需要放在列第一序列，最大分组仅支持 3 组                        |
| add              | 选填 |                        boolean                         |      false       | table 是否显示"新增"功能，不配置$slots.add 的话（custom）默认给 v-model 的 item 点击新增后生成一组空数据 |
| list             | 必填 |               (string &#124; number) []                | {key: ["A","B"]} | table 单列为 select、radio 组件的默认选项值，key 位单列 prop 名称                                        |
| #key             | 选填 |                      #key="scope"                      |                  | slot 插槽，对应 header.edit 属性里的 key，提供自定义单项的内容编写，通过 scope 获得当前 item 值          |
| #operate         | 选填 |                    #operate="scope"                    |                  | "新增"功能下，自动赋予删除 item 默认列。且该 slot 插槽，提供自定义“操作”的内容编写                       |
| #add             | 选填 |                          #add                          |                  | "新增"功能下，该 slot 插槽，提供自定义“新增”项的内容编写                                                 |
