<template>
	<div class="team">
		<h1>This is an Team page</h1>
	</div>
</template>
<script>
	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "Team",
		data() {
			return {};
		},
		mounted() {
			this.getEmployees();
			console.log();
		},
		computed: {
			...mapGetters(["employees"]),
		},
		methods: {
			...mapActions(["getEmployees"]),
		},
	};
</script>
