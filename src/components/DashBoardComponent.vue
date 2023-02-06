<template >

    <div class="container mx-auto">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <router-link to="/Departments">
            <div class="card text-white bg-success mb-3" style="max-width: 18rem;">
            <div class="card-body" style="height: 200px !important">
             
              <h5 class="card-subtitle" style="margin-top: 70px !important">Departments</h5>  
            </div>
          </div>
          </router-link>
        </div>
        <div class="col-md-4">
          <router-link to="/Employees">
            <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
            <div class="card-body" style="height: 200px !important" >
              <h5 class="card-title" style="margin-top: 70px !important">Employees</h5>
            </div>
          </div>
          </router-link>
          
        </div>

        <div class="col-md-4">
          <router-link to="/CustomFieldForm">
            <div class="card text-white bg-warning mb-3" style="max-width: 18rem;">
            <div class="card-body" style="height: 200px !important" >
              <h5 class="card-title" style="margin-top: 70px !important">Custom Field Form</h5>
            </div>
          </div>
          </router-link>
          
        </div>
      </div>
    </div>

</template>
<script>

export default {
  name: 'DashBoardComponent',
  components: {

  }
}
</script>
<style scoped>

</style>