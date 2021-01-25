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
                  <h3 class="mb-0">Edit Department</h3>
                </div>
                <div class="col-4 text-right">
                  <!-- <a href="#!" class="btn btn-sm btn-primary">Settings</a> -->
                </div>
              </div>
            </div>
            <template>
              <form @submit.prevent>
                <h6 class="heading-small text-muted mb-4">
                  Department information
                </h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Name"
                        placeholder="Name"
                        input-classes="form-control-alternative"
                        required
                        v-model="model.name"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input alternative="" label="Description">
                        <textarea
                          rows="4"
                          class="form-control form-control-alternative"
                          placeholder="A few words about Department ..."
                          v-model="model.description"
                        ></textarea>
                      </base-input>
                    </div>
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
  name: "department-edit",
  props: {
    id: String,
  },
  data() {
    return {
      model: {
        name: "",
        description: "",
        organization_id: process.env.VUE_APP_ORG_ID,
        admin_id: process.env.VUE_APP_USER_ID,
      },
    };
  },
  mounted() {
    //we should handle errors in a more scalabe way, but this works for now

    //   alert(this.form.email + " " + this.form.password + " " + this.rememberMe);
    console.log(this.$route.params.id);
    axios
      .get("department/" + this.$route.params.id)
      .then((response) => {
        //   alert(response.data);
        if (response.data[1] == 200) {
          this.data = response.data[0];
          console.log(this.data);
          // const{email} = this.data
          console.log(this.data.name);
          this.model.name = this.data.name;
          this.model.description = this.data.description;
        }
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
      axios
        .put("department/" + this.$route.params.id, {
          headers: {
            // axios.defaults.headers.common['Access-Control-Allow-Origin'] :  '*'
            "Content-Type": "application/json",
            

          },
          body: {
            name: this.model.name,
            description: this.model.description,
            is_active: true,
            is_deleted: false,
          },
        })
        .then((response) => {
          // alert(response.data);
          if (response.data[1] == 201) {
            sessionStorage.setItem("jwt_token", response.data[2]);

            this.$router.push("/department/list");
          }
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
