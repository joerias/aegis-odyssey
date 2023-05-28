<script setup lang="ts" name="App">
// 本地源代码调试
// import { Person, type PersonOptsType } from "../";
// 本地编译后调试
import { Person, type PersonOptsType } from "../../dist/aegis-odyssey.es.js";
const info: PersonOptsType = { name: "Jim", age: 20 };
const jim = new Person(info);
</script>

<template>
	<div>index</div>
	<Box>
		<template #hd>this is hd</template>
		this is bd
		<template #fd>this is fd</template>
	</Box>
	<Box class="mt10"> {{ jim.call("Hello") }} </Box>
</template>
