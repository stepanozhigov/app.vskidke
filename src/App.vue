<template>
	<v-app>
		<navbar></navbar>
		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
	import Navbar from "@/components/Navbar";
	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "App",

		components: { Navbar },

		data: () => ({
			//
		}),

		computed: {
			...mapGetters(["loggedIn"]),
		},

		mounted() {},
	};
</script>
