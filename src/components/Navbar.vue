<template>
	<v-card flat>
		<v-toolbar flat>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>
				<span class="font-weight-light">CRUD</span>
				<span>App</span>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn text color="grey">
				<span>Log out</span>
				<v-icon right>mdi-logout</v-icon>
			</v-btn>
		</v-toolbar>

		<v-navigation-drawer app v-model="drawer">
			<v-list>
				<v-list-item-group v-model="selectedItem" color="primary">
					<v-list-item
						v-for="link in links"
						:key="link.text"
						router
						:to="link.route"
					>
						<v-list-item-icon>
							<v-icon v-text="link.icon"></v-icon>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title
								v-text="link.text"
								class="text--white"
							></v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
	</v-card>
</template>
<script>
	export default {
		name: "Navbar",
		data() {
			return {
				drawer: false,
				links: [
					{
						icon: "mdi-view-dashboard-outline",
						text: "Dashboard",
						route: "/dashboard",
					},
					{ icon: "mdi-lan", text: "Projects", route: "/projects" },
					{ icon: "mdi-account-group-outline", text: "Team", route: "/team" },
				],
				selectedItem: 0,
			};
		},
	};
</script>