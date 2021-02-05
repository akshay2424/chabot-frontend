<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Add Agent</h3>
                </div>
                <div class="col-4 text-right">
                  <!-- <a href="#!" class="btn btn-sm btn-primary">Settings</a> -->
                </div>
              </div>
            </div>
            <template>
              <form @submit.prevent>
                <h6 class="heading-small text-muted mb-4">Agent information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Email address"
                        placeholder="jesse@example.com"
                        input-classes="form-control-alternative"
                        required
                        v-model="model.email"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="First name"
                        placeholder="First name"
                        input-classes="form-control-alternative"
                        required
                        v-model="model.first_name"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Last name"
                        placeholder="Last name"
                        input-classes="form-control-alternative"
                        required
                        v-model="model.last_name"
                      />
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <h6 class="heading-small text-muted mb-4">
                  Agent Department And Group
                </h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-md-6">
                      <base-input alternative="" label="Select Department">
                        <b-select
                          alternative=""
                          class="form-control-alternative"
                          v-model="selected_department"
                          :options="department_options"
                          @input="getGroupList(selected_department)"
                          >Select Department</b-select
                        >
                      </base-input>
                    </div>
                    <div class="col-md-6">
                      <base-input alternative="" label="Select Group">
                        <b-select
                          alternative=""
                          class="form-control-alternative"
                          v-model="selected_group"
                          :options="group_options"
                          >Select Group</b-select
                        >
                      </base-input>
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <h6 class="heading-small text-muted mb-4">Agent Shift</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-md-6">
                      <base-input
                        alternative=""
                        label="Shift Name"
                        placeholder="Shift Name"
                        input-classes="form-control-alternative"
                        required
                        v-model="model.shift_name"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Start Time"
                        placeholder="Start Time"
                        input-classes="form-control-alternative"
                        required
                        v-model="model.start_time"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="End Time"
                        placeholder="End Time"
                        input-classes="form-control-alternative"
                        required
                        v-model="model.end_time"
                      />
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <!-- Address -->
                <h6 class="heading-small text-muted mb-4">
                  Contact information
                </h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-md-12">
                      <base-input
                        alternative=""
                        label="Address"
                        placeholder="Home Address"
                        input-classes="form-control-alternative"
                        v-model="model.address"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4">
                      <base-input
                        alternative=""
                        label="City"
                        placeholder="City"
                        input-classes="form-control-alternative"
                        v-model="model.city"
                      />
                    </div>
                    <div class="col-lg-4">
                      <base-input
                        alternative=""
                        label="Country"
                        placeholder="Country"
                        input-classes="form-control-alternative"
                        v-model="model.country"
                      />
                    </div>
                    <div class="col-lg-4">
                      <base-input
                        alternative=""
                        label="Postal code"
                        placeholder="Postal code"
                        input-classes="form-control-alternative"
                        v-model="model.zipCode"
                      />
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <!-- Description -->
                <h6 class="heading-small text-muted mb-4">About me</h6>
                <div class="pl-lg-4">
                  <div class="form-group">
                    <base-input alternative="" label="Description">
                      <textarea
                        rows="4"
                        class="form-control form-control-alternative"
                        placeholder="A few words about agent ..."
                      ></textarea>
                    </base-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <base-button
                      type="primary"
                      icon="ni ni-check-bold"
                      @click="submit()"
                      >Submit</base-button
                    >
                  </div>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "add-agent",
  data() {
    return {
      department_options:[],
      group_options:[],
      selected_department:null,
      selected_group:null,
      model: {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        country: "",
        zipCode: "",
        about: "",
        shift_name: "",
        start_time: "",
        end_time: "",
        organization_id: process.env.VUE_APP_ORG_ID,
      },
    };
  },
  methods: {
    getGroupList(selected_department){
      console.log(selected_department)
      axios
      .get("group/" + selected_department)
      .then((response) => {
        sessionStorage.setItem("jwt_token", response.data[2]);
        this.group_options = response.data[0];
      })
      .catch((err) => {
        // alert(err);
        if (!err.response) {
          alert("Check your network");
        } else if (err.response.status == 302) {
          sessionStorage.setItem("loggedIn", false);
          sessionStorage.setItem("jwt_token", "");
          console.log(err.response);
          this.$router.push("/login");
        }
      });

    },
     getTextofGroup(){
      var values = this.group_options.map(function(o) { return o.value })
      var index = values.indexOf(this.selected_group);
      let choiceText = this.group_options[index].text;
      return choiceText;
    },
     getTextofDepartment(){
      var values = this.department_options.map(function(o) { return o.value })
      var index = values.indexOf(this.selected_department);
      let choiceText = this.department_options[index].text;
      return choiceText;
    },
    submit() {
      var text_group=this.getTextofGroup();
      var text_department =this.getTextofDepartment();
      axios
        .post("agent", {
          body: {
            email: this.model.email,
            first_name: this.model.first_name,
            last_name: this.model.last_name,
            address: this.model.address,
            group:[this.selected_group,text_group],
            department:[this.selected_department,text_department],
            city: this.model.city,
            country: this.model.country,
            pincode: this.model.zipCode,
            shift_name: this.model.shift_name,
            start_time: this.model.start_time,
            end_time: this.model.start_time,
            description: this.model.about,
          },
        })
        .then((response) => {
          // alert(response.data);
          if (response.data[1] == 201) {
            this.$router.push("/agent/list");
            sessionStorage.setItem("jwt_token", response.data[2]);
          }
          console.log(response.data[0].message);
          console.log(response.status);
          //handle response and save JWT
        })
        .catch((err) => {
          // alert(err);
          if (!err.response) {
            alert("Check your network");
          } else if (err.response.status == 302) {
            sessionStorage.setItem("loggedIn", false);
            console.log(err.response);
            this.$router.push("/login");
          }
        });
    },
  },
  mounted() {
    axios
      .get("department/" + this.model.organization_id)
      .then((response) => {
        sessionStorage.setItem("jwt_token", response.data[2]);
        this.department_options = response.data[0];
        this.selected_department=this.department_options[0].value;
        // console.log(this.selected_department)
      })
      .catch((err) => {
        // alert(err);
        if (!err.response) {
          alert("Check your network");
        } else if (err.response.status == 302) {
          sessionStorage.setItem("loggedIn", false);
          sessionStorage.setItem("jwt_token", "");
          console.log(err.response);
          this.$router.push("/login");
        }
      });
  },
};
</script>
<style></style>
