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
                  <h3 class="mb-0">Add Answer</h3>
                </div>
                <div class="col-4 text-right">
                  <!-- <a href="#!" class="btn btn-sm btn-primary">Settings</a> -->
                </div>
              </div>
            </div>
            <template>
              <form @submit.prevent>
                <h6 class="heading-small text-muted mb-4">
                  Answer information
                </h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Question"
                        placeholder="Question"
                        input-classes="form-control-alternative"
                        v-model="model.question"
                        disabled
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Answer"
                        placeholder="Answer"
                        input-classes="form-control-alternative"
                        required
                        v-model="model.answer"
                      />
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
  name: "add-agent",
  data() {
    return {
      model: {
        answer: "",
        question: this.$route.params.question_id,
        organization_id: process.env.VUE_APP_ORG_ID,
      },
    };
  },
  methods: {
    submit() {
      axios
        .post("answer", {
          headers: {
            // axios.defaults.headers.common['Access-Control-Allow-Origin'] :  '*'
            "Content-Type": "application/json",
            
            
          },
          body: {
            answer: this.model.answer,
            question_id: this.$route.params.question_id,
            organization_id: this.model.organization_id,
            is_active: true,
            is_deleted: false,
          },
        })
        .then((response) => {
          // alert(response.data);
          if (response.data[1] == 201) {
            sessionStorage.setItem("jwt_token", response.data[2]);

            this.$router.push("/answer/list", this.$route.params.question_id);
          }

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
