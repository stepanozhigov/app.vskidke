<template>
	<v-data-table
		:headers="headers"
		:items="employees"
		:search="search"
		class="elevation-1"
	>
		<!-- TOOLBAR -->
		<template v-slot:top>
			<!-- Search -->
			<v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
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

					<v-card>
						<v-card-title>
							<span class="headline">{{ formTitle }}</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-form ref="form" model="valid" lazy-validation>
									<v-row>
										<v-col cols="12" sm="12" md="6">
											<v-text-field
												prepend-icon="mdi-card-account-details-outline"
												v-model="editedItem.first_name"
												label="First Name"
												:rules="fnameRules"
												:error-messages="errors.first_name"
												required
											></v-text-field>
										</v-col>
										<v-col cols="12" sm="12" md="6">
											<v-text-field
												prepend-icon="mdi-card-account-details-outline"
												v-model="editedItem.last_name"
												label="Last Name"
												:rules="lnameRules"
												:error-messages="errors.last_name"
												required
											></v-text-field>
										</v-col>

										<!-- mdiEmail -->
										<v-col cols="12" sm="12" md="12">
											<v-text-field
												prepend-icon="mdi-email"
												v-model="editedItem.email"
												:rules="emailRules"
												:error-messages="errors.email"
												label="E-mail"
												required
											></v-text-field>
										</v-col>

										<!-- Birthday Wgt -->
										<v-col cols="12" sm="12" md="6">
											<v-menu
												v-model="menu2"
												:close-on-content-click="false"
												:nudge-right="40"
												transition="scale-transition"
												offset-y
												min-width="290px"
											>
												<template v-slot:activator="{ on, attrs }">
													<v-text-field
														v-model="editedItem.birthday"
														label="Birthday"
														prepend-icon="mdi-calendar"
														readonly
														v-bind="attrs"
														v-on="on"
														:error-messages="errors.birthday"
													></v-text-field>
												</template>
												<v-date-picker
													v-model="editedItem.birthday"
													@input="menu2 = false"
												></v-date-picker>
											</v-menu>
										</v-col>

										<v-col cols="12" sm="6" md="6">
											<v-text-field
												prepend-icon="mdi-phone"
												v-model="editedItem.phone"
												:rules="phoneRules"
												:error-messages="errors.phone"
												label="Phone"
												required
											></v-text-field>
										</v-col>

										<!-- SELECT PROJECTS -->
										<!-- <v-col cols="12" sm="12">
											<v-select
												v-model="editedItem.phone"
												:items="editedItem.phone.projects"
												label="Select"
												multiple
												chips
												hint="What are the target regions"
												persistent-hint
											></v-select>
										</v-col> -->
									</v-row>
								</v-form>
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
			search: "",
			menu2: false,
			modal: false,
			dialog: false,
			dialogDelete: false,
			isLoading: false,
			valid: "",
			errors: {},
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

			fnameRules: [
				(v) => !!v || "First Name is required",
				(v) => (v && v.length >= 3) || "Name must at less than 3 characters",
			],
			lnameRules: [
				(v) => !!v || "First Name is required",
				(v) => (v && v.length >= 3) || "Name must at less than 3 characters",
			],
			emailRules: [
				(v) => !!v || "E-mail is required",
				(v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
			],
			dateRules: [
				(v) => !!v || "Birthday is required",
				(v) =>
					(v && /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/.test(v)) ||
					"Wrong date format (YYYY-MM-DD)",
			],
			phoneRules: [
				(v) => !!v || "Phone is required",
				(v) =>
					(v &&
						/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(v)) ||
					"Wrong phone format",
			],
		}),

		computed: {
			...mapGetters(["employees"]),
			formTitle() {
				return this.editedIndex === -1 ? "New Employee" : "Edit Employee";
			},
			datepicker() {
				return this.editedItem.birthday || new Date().toISOString().substr(0, 10);
			},
		},

		watch: {
			dialog(val) {
				val || this.close();
			},
			dialogDelete(val) {
				val || this.closeDelete();
			},
			menu(val) {
				val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
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
			validate() {
				this.$refs.form.validate();
			},
			reset() {
				this.$refs.form.reset();
			},
			resetValidation() {
				this.$refs.form.resetValidation();
			},
			initialize() {
				//load all employees
				this.getEmployees();
			},

			editItem(item) {
				// this.reset();
				// this.resetValidation();
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
					this.$refs.form.reset();
					this.$refs.form.resetValidation();
				});
			},

			closeDelete() {
				this.dialogDelete = false;
				this.$nextTick(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
					this.$refs.form.reset();
					this.$refs.form.resetValidation();
				});
			},

			save() {
				if (this.$refs.form.validate()) {
					//new
					if (this.editedIndex == -1) {
						this.addEmployee(this.editedItem)
							.then(() => {
								this.$refs.form.reset();
								this.$refs.form.resetValidation();
								this.close();
								this.getEmployees();
							})
							.catch((e) => {
								//console.log(e.response.data.errors);
								this.errors = e.response.data.errors;
							});
					}
					//edit
					else {
						this.updateEmployee(this.editedItem)
							.then(() => {
								this.$refs.form.reset();
								this.$refs.form.resetValidation();
								this.close();
								this.getEmployees();
							})
							.catch((e) => {
								//console.log(e.response.data.errors);
								this.errors = e.response.data.errors;
							});
					}
				}
			},
		},
	};
</script>
