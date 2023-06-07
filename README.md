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

#### UI 组件

1. radio 复合组件

```javascript
// 使用方法
<ORadio v-model="rValue" />
<o-radio v-model="rValue" type="default" size="default" :disabled="false" :list=['是','否'] />
```

| key      | 条件 |                   value                   |   default   |
| :------- | :--: | :---------------------------------------: | :---------: |
| v-model  | 必填 |           string &#124; number            |     ''      |
| type     | 选填 | "default" &#124; "border" &#124; "button" |  'default'  |
| size     | 选填 |  "large" &#124; "default" &#124; "small"  |  'default'  |
| disabled | 选填 |                  boolean                  |    false    |
| list     | 选填 |         (string &#124; number) []         | ["是","否"] |
