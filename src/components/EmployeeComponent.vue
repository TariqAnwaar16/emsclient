<template lang="">

    <div class="card">
      <Toolbar class="mb-4">
                <template #start>
                    <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openModal" />
                </template>
      </Toolbar>
        <DataTable stripedRows   :value="employees" :paginator="true" :rows="10"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[5,10,15]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
            <Column   style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="displayModal" :style="{width: '450px'}" header="Product Details" :modal="true" class="p-fluid">
            <div class="field mb-3">
                <label for="name" class="mb-1">Employee name</label>
                <InputText id="name" v-model.trim="Employee.EmployeeName" required="true" autofocus :class="{'p-invalid': submitted && !Employee.EmployeeName}" />
                <small class="p-error" v-if="submitted && !Employee.EmployeeName">Employee name is required.</small>
            </div>

            <div class="field mb-3">
				      <label for="Departments" class="mb-1">Departments</label>
				      <Dropdown required="true" autofocus :class="{'p-invalid': submitted && !Employee.EmployeeName}"   id="Departments" v-model="Employee.Department" :options="departmentDDL" optionLabel="departmentName" placeholder="Select Department">
				      </Dropdown>
              <small class="p-error" v-if="submitted && !Employee.Department">Department is required.</small>
			      </div>

            <div class="field mb-3">
                <label for="icon" class="mb-1">Joining Date</label>
                <Calendar autofocus :class="{'p-invalid': submitted && !Employee.DateOfJoining}" inputId="icon" v-model="Employee.DateOfJoining" :showIcon="true" />
                <small class="p-error" v-if="submitted && !Employee.DateOfJoining">Joining Date is required.</small>
            </div>

            <div class="field ">
                <label class="mb-3">Gender</label>
                <div class="formgrid grid">
                    <div class="field-radiobutton col-6">
                        <RadioButton id="category1" name="Male" value="Male" v-model="Employee.Gender" />
                        <label for="category1">Male</label>
                    </div>
                    <div class="field-radiobutton col-6 mt-1">
                        <RadioButton id="category2" name="Female" value="Female" v-model="Employee.Gender" />
                        <label for="category2">Female</label>
                    </div>
                    <small class="p-error" v-if="submitted && !Employee.Gender">Gender is required.</small>
                </div>
            </div>
              

              <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="closeModal"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
              </template>
              
        </Dialog>

        <template>
          <Toast />
        </template>
    </div>



</template>
<script>
import EmployeeService from '../Services/EmployeeService.js'

export default {
  name: 'EmployeeComponent',
  components: {

  },

  data() {

    
    const employees = []
    const departmentDDL = []
    return {
      Employee: {},
      columns: null,
      employees,
      submitted: false,
      employeeService: null,
      displayModal: false,
      departmentDDL
    }
  },

  methods: {
    
    openModal() {
      this.getDepartmentsDDLlist();
      this.Employee = {};
      this.displayModal = true;
    },
    getDepartmentsDDLlist(){
      this.employeeService.getDepartments().then(response =>
       {
        this.departmentDDL = response.data;
      })
    },
    closeModal() {
      this.displayModal = false;
    },

    saveProduct(){
      this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000})
    //   this.submitted = true;
    //  this.displayModal = false;

    //   console.log(this.Employee)
    //   this.Employee = {};
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
      console.log('employees', this.employees);

    });
  }
}
</script>
<style lang="scss" scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
    width: 50px;
    margin: 0 auto 2rem auto;
    display: block;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 960px) {
	::v-deep(.p-toolbar) {
		flex-wrap: wrap;
        
		.p-button {
            margin-bottom: 0.25rem;
        }
	}
}
</style>