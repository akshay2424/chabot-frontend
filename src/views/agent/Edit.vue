<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Mask -->
      <!-- <span class="mask bg-gradient-success opacity-8"></span> -->
      <!-- Header container -->
      <!-- <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Hello Jesse</h1>
                        <p class="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
                        <a href="#!" class="btn btn-info">Edit profile</a>
                    </div>
                </div>
            </div> -->
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Edit Agent</h3>
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
                <h6 class="heading-small text-muted mb-4">Agent Shift</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-md-12">
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
  name: "agent-edit",
  props: {
    agent_id: String,
  },
  data() {
    return {
      email: "",
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
      },
    };
  },
  mounted() {
    //we should handle errors in a more scalabe way, but this works for now

    //   alert(this.form.email + " " + this.form.password + " " + this.rememberMe);
    // console.log(this.$route.params.agent_id+"asjkasj")
    axios
      .get("agent/" + this.$route.params.agent_id)
      .then((response) => {
        //   alert(response.data);
        if (response.data[1] == 200) {
          this.data = response.data[0];
          console.log(this.data);
          // const{email} = this.data
          this.model.email = this.data.email;
          this.model.first_name = this.data.first_name;
          this.model.last_name = this.data.last_name;
          this.model.start_time = this.data.start_time;
          this.model.end_time = this.data.end_time;
          this.model.shift_name = this.data.shift_name;
          this.model.address = this.data.address;
          this.model.city = this.data.city;
          this.model.country = this.data.country;
          this.model.zipCode = this.data.pincode;
          this.model.about = this.data.description;
        }
        //   console.log(response.data);
        //   console.log(response.status);
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
  methods: {
    submit() {
      //we should handle errors in a more scalabe way, but this works for now

      axios
        .put("agent/" + this.$route.params.agent_id, {
          headers: {
            // axios.defaults.headers.common['Access-Control-Allow-Origin'] :  '*'
            "Content-Type": "application/json",
          },
          body: {
            email: this.model.email,
            first_name: this.model.first_name,
            last_name: this.model.last_name,
            address: this.model.address,
            city: this.model.city,
            country: this.model.country,
            pincode: this.model.zipCode,
            shift_name: this.model.shift_name,
            start_time: this.model.start_time,
            end_time: this.model.end_time,
            description: this.model.about,
          },
        })
        .then((response) => {
          if (response.data[1] == 201) {
            sessionStorage.setItem("jwt_token", response.data[2]);
            this.$router.push("/agent/list");
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
};
</script>
<style></style>
