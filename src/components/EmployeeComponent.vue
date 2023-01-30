<template lang="">

<div>
        <DataTable :value="products" responsiveLayout="scroll">
            <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field"></Column>
        </DataTable>
    </div>



</template>
<script>
import EmployeeService from '../Services/EmployeeService.js'

export default {
    name: 'EmployeeComponent',
    components: {
        
  },

  data() {
    return {
      columns: null,
      employees: null
    }
  },

  methods: {
    created() {
        this.productService = new ProductService();

        this.columns = [
            {field: 'code', header: 'Code'},
            {field: 'name', header: 'Name'},
            {field: 'category', header: 'Category'},
            {field: 'quantity', header: 'Quantity'}
        ];
    },
  },
  mounted() {
        this.EmployeeService.EmployeeService().then(response => this.employees = response.data)
    }
}
</script>
<style lang="">
    
</style>