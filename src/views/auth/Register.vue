<template>
	<v-app>
		<v-container fluid fill-height>
			<v-row align="center" justify="center">
				<v-card class="mx-auto">
					<v-card-title>
						<h1>Register</h1>
					</v-card-title>
					<v-card-text>
						<v-form>
							<v-text-field
								label="Full Name"
								prepend-icon="mdi-account-circle"
								v-model="name"
								placeholder=" "
								:rules="nameRules"
								hide-details="auto"
								required
							/>
							<v-text-field
								label="E-mail"
								prepend-icon="mdi-email"
								v-model="email"
								placeholder=" "
								:rules="emailRules"
								required
							/>
							<v-text-field
								:type="showPassword ? 'text' : 'password'"
								label="Password"
								prepend-icon="mdi-lock"
								append-icon="mdi-eye-off"
								v-model="password"
								placeholder=" "
								:rules="passwordRules"
								required
								@click:append="showPassword = !showPassword"
							/>
							<v-text-field
								:type="showPassword ? 'text' : 'password'"
								label="Confirm Password"
								prepend-icon="mdi-lock"
								v-model="confirm_password"
								:rules="confirmRules"
								required
								placeholder=" "
							/>
						</v-form>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
						<v-btn color="info">Login</v-btn>

						<v-spacer></v-spacer>
						<v-btn color="success">Register</v-btn>
					</v-card-actions>
				</v-card>
			</v-row>
		</v-container>
	</v-app>
</template>
<script>
	export default {
		name: "Login",
		data() {
			return {
				name: "",
				email: "",
				password: "",
				confirm_password: "",
				showPassword: "",
				nameRules: [
					(value) => !!value || "Required.",
					(value) => (value && value.length >= 3) || "Min 3 characters",
				],
				emailRules: [
					(v) => !!v || "E-mail is required",
					(v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
				],
				passwordRules: [
					(value) => !!value || "Required.",
					(value) => (value && value.length >= 7) || "Min 7 characters",
				],
				confirmRules: [
					(value) => !!value || "Required.",
					(value) => value === this.password || "Password mismatch",
				],
			};
		},
		props: {
			source: String,
		},
	};
</script>