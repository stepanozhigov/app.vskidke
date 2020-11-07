<template>
	<v-app id="home">
		<v-navigation-drawer v-model="drawer" app>
			<!-- USER -->
			<template v-slot:prepend>
				<v-list-item two-line>
					<v-list-item-avatar>
						<img src="https://randomuser.me/api/portraits/men/81.jpg" />
					</v-list-item-avatar>

					<v-list-item-content v-if="user">
						<v-list-item-title>{{ user.name }}</v-list-item-title>
						<v-list-item-subtitle>Logged In</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</template>

			<v-divider></v-divider>

			<v-list dense>
				<!-- Dashboard link -->
				<v-list-item link to="dashboard">
					<v-list-item-action>
						<v-icon>mdi-home</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Dashboard</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<!-- Projects link -->
				<v-list-item link to="projects">
					<v-list-item-action>
						<v-icon>mdi-code-braces-box</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Projects</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<!-- Team link -->
				<v-list-item link to="team">
					<v-list-item-action>
						<v-icon>mdi-account-group</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Team</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<!-- Logout link -->
				<v-list-item link @click="doLogoutUser">
					<v-list-item-action>
						<v-icon>mdi-account-group</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Logout</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app color="indigo" dark>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>Application</v-toolbar-title>
		</v-app-bar>

		<v-main>
			<v-container class="fill-height" fluid>
				<v-row align="center" justify="center">
					<v-col class="text-center">
						<router-view class="main-view"></router-view>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
		<v-footer color="indigo" app>
			<span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>

<script>
	// @ is an alias to /src
	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "Home",
		data: () => ({
			drawer: null,
		}),
		props: {
			source: {
				type: String,
				default: "#",
			},
		},
		components: {},
		created() {
			this.getAuthUser();
		},
		methods: {
			...mapActions(["getAuthUser", "logoutUser"]),
			doLogoutUser() {
				this.logoutUser()
					.then((res) => {
						//console.log(res);
						localStorage.removeItem("token");
						this.$router.push("/login");
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
		computed: {
			...mapGetters(["user"]),
		},
	};
</script>
