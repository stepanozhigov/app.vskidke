<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	// import Navbar from "@/components/Navbar";
	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "App",

		components: {},

		data: () => ({}),

		computed: {},

		mounted() {},
	};
</script>
