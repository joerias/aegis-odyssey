<script setup lang="ts" name="Box"></script>
<template>
	<div class="box">
		<div v-if="!!$slots['hd']" class="hd">
			<slot name="hd" />
		</div>
		<div class="bd">
			<slot />
		</div>
		<div v-if="!!$slots['fd']" class="fd">
			<slot name="fd" />
		</div>
	</div>
</template>

<style scoped lang="less">
@import "../variable.less";
.box {
	border: 1px solid @col-blue;
	border-radius: @radius;
	line-height: 40px;
	.hd,
	.fd {
		height: 40px;
		font-size: 14px;
		font-weight: 500;
		margin: 0 10px;
		padding: 0 10px;
		border-bottom: 1px solid @col-line;
	}
	.bd {
		margin: 10px;
	}
}
</style>
