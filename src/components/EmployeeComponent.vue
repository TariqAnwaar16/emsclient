<template lang="">

    <div class="card">
      <Toolbar class="mb-4">
                <template #start>
                    <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openEmployeeModal" />
                </template>
      </Toolbar>

<!-- Employee Listing Start -->
        <DataTable stripedRows   :value="employees" :paginator="true" :rows="10"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[5,10,15]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
            <Column   style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editEmployee(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteEmployee(slotProps.data)" />
                    </template>
            </Column>
        </DataTable>
<!-- Employee Listing End -->

<!--Employee Form Start-->
        <Dialog contentStyle="{'overflow': 'visible'}" v-model:visible="employeeModal" :style="{width: '450px'}" header="Employee Details" :modal="true" class="p-fluid">
   
              <Form :validation-schema="schema">
                <div class="p-fluid grid formgrid">
                  <div class="field col-12 mb-3">
                      <label for="name" class="mb-1">Employee name</label>
                      <InputText id="name" v-model.trim="Employee.employeeName" required="true" autofocus :class="{'p-invalid': submitted && !Employee.EmployeeName}" />
                     <small class="p-error" v-if="submitted && !Employee.employeeName">Employee name is required.</small>
                  </div>

                  <!-- <Field name="Employee.employeeName" v-model=""  v-slot="{ field, errorMessage  }">
                    <div class="field col-12 mb-3">
                        <label  for="name" class="mb-1">Employee name</label>
                        <InputText id="name"  v-bind="field"  required="true" autofocus :class="{'p-invalid': errorMessage}" />
                        <small class="p-error">Employee name is required.</small>
                    </div>
                  </Field> -->
                  
                  <div class="field col-12 mb-3">
                
                                <label for="Departments" class="mb-1">Departments</label> <br>
                                <div  >
                                  <!-- <va-select class="mb-6" text-by="departmentName"  value-by="DepartmentId"  v-model="value" :options="options" /> -->
                                  <va-select v-model="Employee.departmentId"  text-by="departmentName"  value-by="departmentId" max-height="150px"   :options="departmentDDL" />
                                </div>
                                <template>
                                  <!-- <Dropdown required="true"  :class="{'p-invalid': submitted && !Employee.EmployeeName}"   id="Departments" v-model="Employee.Department" :options="departmentDDL" optionLabel="departmentName" placeholder="Select Department">
                                  </Dropdown> -->
                                </template>
                    <!-- <small class="p-error" v-if="submitted && !Employee.department">Department is required.</small> -->
                              </div>
                  <div class="field col-12 mb-3">
                      <label for="icon" class="mb-1">Joining Date</label>
                      <va-date-input v-model="Employee.dateOfJoining" />
                      <!-- <Calendar  appendTo="body"  autofocus :class="{'p-invalid': submitted && !Employee.DateOfJoining}" inputId="icon" v-model="Employee.DateOfJoining" :showIcon="true" /> -->
                      <!-- <small class="p-error" v-if="submitted && !Employee.dateOfJoining">Joining Date is required.</small> -->
                  </div>
                  <div class="field col-12 ">
                      <label class="mb-3">Gender</label>
                      <div class="formgrid grid">
                          <div class="field-radiobutton col-6">
                              <RadioButton id="category1" name="Male" value="Male" v-model="Employee.gender" />
                              <label for="category1">Male</label>
                          </div>
                          <div class="field-radiobutton col-6 mt-1">
                              <RadioButton id="category2" name="Female" value="Female" v-model="Employee.gender" />
                              <label for="category2">Female</label>
                          </div>

                          <!-- <small class="p-error" v-if="submitted && !Employee.Gender">Gender is required.</small> -->
                      </div>
                  </div>
                            </div>
                
                <template #footer>
                  <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="closeEmployeeModal"/>
                  <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
                </template>
              </Form>   
        </Dialog>
<!--Employee Form End-->

<!-- Delete Dialog Start -->
        <Dialog v-model:visible="deleteEmployeeDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="Employee">Are you sure you want to Employee <b>{{Employee.employeeName}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteEmployeeDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="DeleteEmployee()" />
            </template>
        </Dialog>
<!-- Delete Dialog End -->

        <template>
          <Toast />
        </template>
    </div>



</template>
<script>
import EmployeeService from '../Services/EmployeeService.js'
import * as yup from 'yup';
import { Field, Form, ErrorMessage } from 'vee-validate';

export default {
  name: 'EmployeeComponent',
  components: {

  },

  data() {

    const schema = yup.object({
      employeeName: yup.string().required().min(20),
      dateOfJoining : yup.string().required(),
      gender: yup.string().required(),
      department:yup.string().required()
    });

    const options = [
      {
        departmentId: 'First',
        departmentName: 'First'
      },
      {
        departmentId: 'Second',
        departmentName: 'Second'
      },
      {
        text: 'Third',
        textBy: 'Third'
      },
    ]


    const employees = []
    const departmentDDL = []
    return {
      options,
      Employee: {},
      columns: null,
      employees,
      submitted: false,
      employeeService: null,
      employeeModal: false,
      departmentDDL: [],
      deleteEmployeeDialog: false,
      employeeName,
      schema
    }
  },

  methods: {
    confirmDeleteEmployee(employee) {
      debugger
      this.Employee = employee;
      this.deleteEmployeeDialog = true;
    },

    DeleteEmployee() {
      this.employeeService.DeleteEmployee(this.Employee.employeeId).then(response => {
        this.deleteEmployeeDialog = false;
        this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000 });
        this.getEmployees();
      })
        .catch(error => {

        })

    },
    getEmployees() {
      this.employeeService.getEmployees().then(response => {
        this.employees = response.data;
      });
    },
    openEmployeeModal() {
      this.getDepartmentsDDLlist();
      this.Employee = {};
      this.employeeModal = true;
    },
    getDepartmentsDDLlist() {
      this.employeeService.getDepartments().then(response => {
        debugger
        this.departmentDDL = response.data;
      })
    },
    closeEmployeeModal() {
      this.employeeModal = false;
    },

    saveProduct() {

      if (this.Employee.employeeId == 0 || this.Employee.employeeId == undefined || this.Employee.employeeId == null) {
        this.employeeService.CreateEmployee(this.Employee).then(response => {
          debugger
          this.closeEmployeeModal();
          this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Employee Added', life: 3000 })
          this.getEmployees();
        })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.employeeService.EditEmployee(this.Employee.employeeId, this.Employee).then(response => {
          this.closeEmployeeModal();
          this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Employee Updated', life: 3000 })
          this.getEmployees();
        })
      }



      //   this.submitted = true;
      //  this.employeeModal = false;

      console.log(this.Employee)
      //   this.Employee = {};
    },

    editEmployee(Employee) {
      debugger
      this.getDepartmentsDDLlist();
      this.Employee = { ...Employee };
      this.employeeModal = true;
    }

  },

  created() {
    this.employeeService = new EmployeeService();
    this.columns = [
      { field: 'employeeId', header: 'EmployeeId' },
      { field: 'employeeName', header: 'EmployeeName' },
      { field: 'dateOfJoining', header: 'Joining Date' },
      { field: 'gender', header: 'Gender' },
      { field: 'departmentName', header: 'DepartmentName' },
    ];
  },



  mounted() {
    this.employeeService.getEmployees().then(response => {
      this.employees = response.data;
    });
  }
}
</script>
<style lang="scss" scoped>
// .table-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;

//     @media screen and (max-width: 960px) {
//         align-items: start;
// 	}
// }

// .product-image {
//     width: 50px;
//     box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
// }

// .p-dialog .product-image {
//     width: 50px;
//     margin: 0 auto 2rem auto;
//     display: block;
// }

// .confirmation-content {
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }
// @media screen and (max-width: 960px) {
// 	::v-deep(.p-toolbar) {
// 		flex-wrap: wrap;

// 		.p-button {
//             margin-bottom: 0.25rem;
//         }
// 	}
// }

.ui-datepicker {
  position: visible
}

.va-dropdown {
  width: 400px !important;
}
</style>