<template>
    <div>
        <h1>Hello World</h1>
    </div>
</template>
<script>
import EmployeeService from '../Services/EmployeeService.js'

export default {
    name: 'CustomFieldForm',
    data() {
        return {
            employeeService: null,
            CustomFields: [],
            formControlList: [],
            displayType : "ADD"
        }
    },
    created() {
        this.employeeService = new EmployeeService();
    },
    methods: {
        getFormCustomFields() {
            this.employeeService.getCustomFieldJson().then(res => {
                this.CustomFields = res.data.data;
                this.CustomFields.forEach((t) => {
                    let groupCheck = this.formControlList.filter(
                        (y) => y.group_id == t.group_id
                    );


                    if (t.dt_code == "select") {
                        if (t.ColumnName == "Service_Territory_Text" && t.value > 0) {
                            this.GetTerritoryIdLocation(t.value, false);
                        }
                        if (
                            t.ColumnName == "ServiceTerritory_Location" &&
                            !(t.value > 0)
                        ) {
                            t.is_readOnly = true;
                        }
                    }

                    if (t.dt_code == "select" && t.name == "State") {
                        t.is_required = false;
                    }

                    if (groupCheck == null || groupCheck.length == 0) {
                        let obj = {
                            group_id: t.group_id,
                            group_name: t.group_name,
                            group_display_name: t.group_display_name,
                            InnerData: this.CustomFields.filter(
                                (x) => x.group_id == t.group_id
                            ),
                        };
                        this.formControlList.push(obj);
                    }
                });

                const group = {};

                this.CustomFields.forEach((cnt) => {
                    let val = null;
                    if (cnt.actual_data_type == "bit") {
                        val = cnt.value == 1 ? true : false;
                    } else if (cnt.dt_code == "datetime") {
                        val =
                            cnt.value == ""
                                ? null
                                : cnt.value;
                    } else if (cnt.dt_code == "date") {
                        val =
                            cnt.value == ""
                                ? null
                                : cnt.value;
                    } else {
                        val = cnt.value == "" ? null : cnt.value;
                    }


                    if (
                        cnt.dt_code == "select" &&
                        cnt.select_options != null &&
                        cnt.name == "Country"
                    ) {
                        if (cnt.value==null || cnt.value ==undefined || cnt.value == "") {

                            this.formControlList
                                .find((x) => x.group_display_name == "Address Information")
                                .InnerData.find(
                                    (x) => x.ColumnName == "State"
                                ).select_options = [];
                        }
                    }

                    if (
                        cnt.dt_code == "select" &&
                        cnt.select_options != null &&
                        (cnt.name == "CreatedById" || cnt.name == "LastModifiedById")
                    ) {
                        if (cnt.value != "") {
                            cnt.value = cnt.value.toLowerCase();
                            cnt.select_options.forEach((itemList) => {
                                if (itemList.value == cnt.value) {
                                    val = itemList.name;
                                    cnt.dt_code = "text";
                                    cnt.is_readOnly = true;
                                }
                            });
                        } else {
                            cnt.value = cnt.value.toLowerCase();
                            cnt.dt_code = "text";
                            cnt.is_readOnly = true;
                        }
                    }

                    if (
                        cnt.name == "OwnerName" &&
                        cnt.dt_code == "select" &&
                        cnt.select_options != null
                    ) {
                        cnt.select_options.forEach((itemList) => {
                            if (itemList.name == this.userName) {
                                val = itemList.value;
                                //cnt.is_readOnly = true;
                            }
                        });
                    }

                    if (this.displayType == "ADD" && cnt.name == "Campaign_ID") {
                if (this.campaign_id) val = this.campaign_id;
              }

              if (
                this.displayType == "ADD" &&
                cnt.name == "StatusName" &&
                cnt.dt_code == "select" &&
                cnt.select_options != null
              ) {
                cnt.select_options.forEach((itemList) => {
                  if (itemList.name == "New") {
                    val = itemList.value;
                  }
                });
              }

                });


            });
        },
    },

    mounted() {
        this.getFormCustomFields();
    },
}
</script>
<style>

</style>