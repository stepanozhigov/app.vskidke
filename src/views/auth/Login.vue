<template>
	<v-app>
		<v-main>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col cols="12" sm="8" md="4">
						<v-card class="elevation-12" :loading="isLoading">
							<v-toolbar color="primary" dark flat>
								<v-toolbar-title>Login</v-toolbar-title>
							</v-toolbar>
							<v-card-text>
								<v-form>
									<v-text-field
										label="E-mail"
										name="email"
										prepend-icon="mdi-account"
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
								</v-form>
							</v-card-text>
							<!-- Buttons -->
							<v-card-actions>
								<router-link class="ml-3" to="/register">Register</router-link>
								<v-spacer></v-spacer>
								<v-btn color="primary" @click="doLoginUser">Login</v-btn>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>
<script>
	import { mapActions } from "vuex";
	export default {
		name: "Login",
		data() {
			return {
				timeout: "-1",
				isLoading: false,
				snackbar: false,
				form: {
					email: "",
					password: "",
				},
				errors: {},
			};
		},
		props: {
			source: String,
		},
		methods: {
			...mapActions(["loginUser"]),
			doLoginUser() {
				this.isLoading = "red";
				this.loginUser(this.form)
					.then((response) => {
						//console.log(response);
						localStorage.setItem("token", response.data);
						this.goDashboard();
					})
					.catch((err) => {
						//console.log(err);
						this.errors = err.response.data.errors;
					})
					.finally(() => (this.isLoading = false));
			},
			goDashboard() {
				setTimeout(() => {
					this.$router.push({ name: "Dashboard" });
				}, 100);
			},
		},
	};
</script>