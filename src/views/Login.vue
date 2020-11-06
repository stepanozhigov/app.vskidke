<template>
	<v-app>
		<v-container fluid fill-height>
			<v-row align="center" justify="center">
				<v-card max-width="500" class="mx-auto">
					<v-card-title>
						<h1>Login</h1>
					</v-card-title>
					<v-card-text>
						<v-form>
							<v-text-field
								label="Username"
								prepend-icon="mdi-account-circle"
								v-model="email"
								placeholder=" "
							/>
							<v-text-field
								:type="showPassword ? 'text' : 'password'"
								label="Password"
								prepend-icon="mdi-lock"
								append-icon="mdi-eye-off"
								v-model="password"
								placeholder=" "
								@click:append="showPassword = !showPassword"
							/>
						</v-form>
					</v-card-text>
					<v-divider></v-divider>
					<v-card-actions>
						<v-btn color="success">Register</v-btn>
						<v-spacer></v-spacer>
						<v-btn color="info">Login</v-btn>
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
				email: "",
				password: "",
				showPassword: "",
			};
		},
		props: {
			source: String,
		},
	};
</script>