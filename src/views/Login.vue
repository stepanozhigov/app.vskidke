<template>
	<v-app>
		<v-main>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="8">
						<v-card class="elevation-12">
							<v-window v-model="step"> </v-window>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>
<script>
	export default {
		name: "Login",
		data() {
			return {
				step: 1,
			};
		},
	};
</script>