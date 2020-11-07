<template>
	<v-app>
		<v-main>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="4">
						<v-card class="elevation-12">
							<v-toolbar color="primary" dark flat>
								<v-toolbar-title>Register</v-toolbar-title>
							</v-toolbar>
							<v-card-text>
								<v-form>
									<v-text-field
										label="Name"
										name="name"
										prepend-icon="mdi-account"
										type="text"
										v-model="form.name"
										:error-messages="errors.name"
									></v-text-field>

									<v-text-field
										label="E-mail"
										name="email"
										prepend-icon="mdi-email"
										type="text"
										v-model="form.email"
										:error-messages="errors.email"
									></v-text-field>

									<v-text-field
										id="password"
										label="Password"
										name="password"
										prepend-icon="mdi-lock"
										type="password"
										v-model="form.password"
										:error-messages="errors.password"
									></v-text-field>

									<v-text-field
										id="password"
										label="Confirm password"
										name="comfirm_password"
										prepend-icon="mdi-lock-question"
										type="password"
										v-model="form.confirm_password"
										:error-messages="errors.confirm_password"
									></v-text-field>
								</v-form>
							</v-card-text>
							<v-card-actions>
								<router-link class="ml-3" to="/login">Login</router-link>
								<v-spacer></v-spacer>
								<v-btn color="primary" @click="doRegisterUser">Register</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>
<script>
	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "Login",
		data() {
			return {
				form: {
					name: "",
					email: "",
					password: "",
					confirm_password: "",
				},
				errors: {},
			};
		},
		props: {
			source: String,
		},
		methods: {
			...mapActions(["registerUser"]),
			doRegisterUser() {
				this.registerUser(this.form)
					.then((response) => console.log(response.data))
					.catch((e) => (this.errors = e.response.data.errors));
			},
		},
	};
</script>