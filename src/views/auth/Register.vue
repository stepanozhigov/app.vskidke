<template>
	<v-app>
		<v-main>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="4">
						<v-card class="elevation-12" :loading="isLoading">
							<v-toolbar color="primary" dark flat>
								<v-toolbar-title>Register</v-toolbar-title>
							</v-toolbar>
							<v-card-text>
								<v-form ref="form">
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
										id="password_confirmation"
										label="Confirm password"
										name="password_confirmation"
										prepend-icon="mdi-lock-question"
										type="password"
										v-model="form.password_confirmation"
										:error-messages="errors.password_confirmation"
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
		<v-snackbar top color="success" v-model="snackbar" :timeout="timeout">
			Registration Complete
			<template v-slot:action="{ attrs }">
				<v-btn color="primary" v-bind="attrs" @click="goLogin">
					Login Now</v-btn
				>
			</template>
		</v-snackbar>
	</v-app>
</template>
<script>
	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "Login",
		data() {
			return {
				isLoading: false,
				snackbar: false,
				timeout: "-1",
				form: {
					name: "",
					email: "",
					password: "",
					password_confirmation: "",
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
				this.isLoading = "red";
				this.registerUser(this.form)
					.then((response) => {
						this.snackbar = true;
						this.$refs.form.reset();
						this.$refs.form.resetValidation();
					})
					.catch((e) => (this.errors = e.response.data.errors))
					.finally(() => (this.isLoading = false));
			},
			goLogin() {
				this.snackbar = false;
				setTimeout(() => {
					this.$router.push({ name: "Login" });
				}, 300);
			},
		},
	};
</script>