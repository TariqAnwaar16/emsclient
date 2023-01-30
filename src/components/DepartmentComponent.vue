<!-- eslint-disable no-unused-vars -->
<template lang="">
    <div class="row justify-content-end">
      <div class="col-1">
        <va-button @click="createItem"> Create </va-button>
      </div>
    </div>
   <va-data-table
    class="table-crud-example"
    :items="OurItems"
    :columns="OurColumns"
    striped
  >
    <!-- <template #headerAppend>
      <tr class="table-crud-example__slot">
        <th class="p-1">
          <va-button
            @click="addNewItem"
            :disabled="!isNewData"
            block
          >
            Add
          </va-button>
        </th>
      </tr>
    </template> -->

    <template #cell(actions)="{ rowData  }">
      <va-button preset="plain" icon="edit" @click="openModalToEditItemById(rowData )" />
      <va-button preset="plain" icon="delete" @click="deleteItemById(rowData )" />
    </template>
  </va-data-table>

  <va-modal
    class="modal-crud-example"
    :model-value="!!editedItem"
    title="Edit Department"
    size="small"
    @ok="editItem"
    @cancel="resetEditedItem"
  >
    <va-input
      v-for="key in Object.keys(editedItem).filter((key) => key != 'DepartmentId' && key != 'departmentId')"
      :key="key"
      class="my-3"
      :label="key"
      v-model="editedItem[key]"
    />
  </va-modal>
</template>



<script>
const defaultItem = {
  DepartmentName: '',
}

import axios from 'axios'

export default {
  name: 'DepartmentComponent',
  components: {

  },
  data() {
    const items = [
      {
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
      },
      {
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
      },
      {
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
      },
      {
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
      },
    ]
    const columns = [
      { key: 'name', sortable: true },
      { key: 'username', sortable: true },
      { key: 'email', sortable: true },

    ]

    // eslint-disable-next-line no-unused-vars
    const OurColumns = [
      { key: 'departmentName', sortable: true },
      { key: 'actions', width: 80 }
    ]

    const OurItems = [];
    return {
      items,
      columns,
      OurItems,
      OurColumns,
      editedItemId: null,
      editedItem: null,
      //createdItem: { ...defaultItem },
    }
  },
  computed: {
    isNewData() {
      return Object.keys(this.createdItem).every((key) => !!this.createdItem[key])
    },
  },
  methods: {
    createItem() {
      debugger
      this.editedItem = { ...defaultItem }
    },
    resetEditedItem() {
      this.editedItem = null
      this.editedItemId = null
    },
    resetCreatedItem() {
      this.createdItem = { ...defaultItem }
    },
    deleteItemById(row) {
      this.editedItemId = row.departmentId;
      this.DeleteDepartment();
      this.resetEditedItem();
    },
    addNewItem() {
      this.items = [...this.items, { ...this.createdItem }]
      this.resetCreatedItem()
    },
    editItem() {
      debugger
      if(this.editedItemId){
        this.EditDepartment();
      }else{
        this.CreateDepartment()
      }
      this.resetEditedItem()
    },
    openModalToEditItemById(row) {
      debugger
      this.editedItemId = row.departmentId
      this.editedItem = { ...this.OurItems.find(x=>x.departmentId == this.editedItemId ) }
    },

    async getDepartments(){
   return await axios.get('https://localhost:7282/api/Departments').then(response => (this.OurItems = response.data));
  },

  async CreateDepartment(){
    await axios.post('https://localhost:7282/api/Departments',this.editedItem).then(response => (this.getDepartments()));
  },

  async EditDepartment(){
    debugger
    this.editedItem.DepartmentId = this.editedItemId 
    await axios.put('https://localhost:7282/api/Departments/'+this.editedItemId,this.editedItem ).then(response => (this.getDepartments()));
  },

  async DeleteDepartment(){
    debugger
    await axios.delete('https://localhost:7282/api/Departments/'+this.editedItemId).then(response => (this.getDepartments()));
  },
  },

  

   mounted() {
    debugger
    this.getDepartments();
    //await axios.get('https://localhost:7282/api/Departments').then(response => (this.OurItems = response.data));
  },
}
</script>
<style lang="scss" scoped>
.table-crud-example {
  --va-form-element-default-width: 0;

  .va-input {
    display: block;
  }

  &__slot {
    th {
      vertical-align: middle;
    }
  }
}

.modal-crud-example {
  .va-input {
    display: block;
  }
}
</style>