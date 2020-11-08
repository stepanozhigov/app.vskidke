<template>
	<v-data-table :headers="headers" :items="employees" class="elevation-1">
		<!-- TOOLBAR -->
		<template v-slot:top>
			<v-toolbar flat>
				<v-toolbar-title>Team</v-toolbar-title>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-spacer></v-spacer>

				<!-- OPEN CREATE DIALOG BOX -->
				<v-dialog v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on, attrs }">
						<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
							New Employee
						</v-btn>
					</template>

					<!-- DIALOG BOX -->
					<v-card>
						<v-card-title>
							<span class="headline">{{ formTitle }}</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12" sm="12" md="6">
										<v-text-field
											v-model="editedItem.first_name"
											label="First Name"
											:rules="nameRules"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="12" md="6">
										<v-text-field
											v-model="editedItem.last_name"
											label="Last Name"
											:rules="nameRules"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="12" md="12">
										<v-text-field
											v-model="editedItem.email"
											label="E-mail"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="6">
										<v-text-field
											v-model="editedItem.birthday"
											label="Birthday"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="6">
										<v-text-field
											v-model="editedItem.phone"
											label="Phone"
										></v-text-field>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
							<v-btn color="blue darken-1" text @click="save"> Save </v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<!-- DELETE DIALOG BOX -->
				<v-dialog v-model="dialogDelete" max-width="500px">
					<v-card>
						<v-card-title class="headline"
							>Are you sure you want to delete this item?</v-card-title
						>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="closeDelete"
								>Cancel</v-btn
							>
							<v-btn color="blue darken-1" text @click="deleteItemConfirm"
								>OK</v-btn
							>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>

		<!-- ACTION BTNs-->
		<template v-slot:item.actions="{ item }">
			<v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
			<v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
		</template>

		<template v-slot:no-data>
			<v-btn color="primary" @click="initialize"> Reset </v-btn>
		</template>
	</v-data-table>
</template>
<script>
	import { mapActions, mapGetters } from "vuex";
	export default {
		data: () => ({
			dialog: false,
			dialogDelete: false,
			headers: [
				{
					text: "First Name",
					align: "start",
					value: "first_name",
				},
				{
					text: "Last Name",
					align: "start",
					value: "last_name",
				},
				{ text: "E-mail", value: "email", sortable: true },
				{ text: "Phone", value: "phone" },
				{ text: "Birthday", value: "birthday" },
				{ text: "Actions", value: "actions", sortable: false },
			],
			editedIndex: -1,
			editedItem: {
				first_name: "",
				last_name: "",
				email: "",
				phone: "",
				birthday: "",
			},
			defaultItem: {
				first_name: "",
				last_name: "",
				email: "",
				phone: "",
				birthday: "",
			},

			nameRules: [
				(v) => !!v || "Name is required",
				(v) => (v && v.length <= 10) || "Name must at less than 3 characters",
			],
		}),

		computed: {
			...mapGetters(["employees"]),
			formTitle() {
				return this.editedIndex === -1 ? "New Employee" : "Edit Employee";
			},
		},

		watch: {
			dialog(val) {
				val || this.close();
			},
			dialogDelete(val) {
				val || this.closeDelete();
			},
		},

		created() {
			this.initialize();
		},

		methods: {
			...mapActions([
				"getEmployees",
				"addEmployee",
				"deleteEmployee",
				"updateEmployee",
			]),
			initialize() {
				//load all employees
				this.getEmployees();
			},

			editItem(item) {
				console.log(item);
				this.editedIndex = item.id;
				this.editedItem = item;
				this.dialog = true;
			},

			deleteItem(item) {
				this.editedIndex = item.id;
				this.dialogDelete = true;
			},

			deleteItemConfirm() {
				this.deleteEmployee(this.editedIndex).then(() =>
					this.getEmployees().then(() => this.closeDelete())
				);
			},

			close() {
				this.dialog = false;
				this.$nextTick(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
				});
			},

			closeDelete() {
				this.dialogDelete = false;
				this.$nextTick(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
				});
			},

			save() {
				//new
				if (this.editedIndex == -1) {
					this.addEmployee(this.editedItem).then(() => {
						this.getEmployees().then(() => this.close());
					});
				}
				//edit
				else {
					this.updateEmployee(this.editedItem).then(() => {
						this.getEmployees().then(() => this.close());
					});
				}
			},
		},
	};
</script>
