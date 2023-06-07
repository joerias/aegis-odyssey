<script setup lang="ts">
import { ref } from "vue";
// 本地源代码调试
// import { Person, type PersonOptsType } from "../";
// 本地编译后调试
// import { Person, type PersonOptsType } from "../../dist/aegis-odyssey.es.js";
const rValue = ref("是");
</script>

<template>
	<div>index</div>

	<o-radio v-model="rValue" type="button" />
</template>
