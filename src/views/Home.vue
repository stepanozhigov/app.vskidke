<template>
	<v-app id="home">
		<v-navigation-drawer v-model="drawer" app>
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
	};
</script>
