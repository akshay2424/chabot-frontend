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
                  <h3 class="mb-0">Edit Topic</h3>
                </div>
                <div class="col-4 text-right">
                  <!-- <a href="#!" class="btn btn-sm btn-primary">Settings</a> -->
                </div>
              </div>
            </div>
            <template>
              <form @submit.prevent>
                <h6 class="heading-small text-muted mb-4">Topic information</h6>
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
                        placeholder="A few words about Topic ..."
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
  name: "topic-edit",
  props: {
    id: String,
  },
  data() {
    return {
      model: {
       name:'',
       description:'',
       organization_id:process.env.VUE_APP_ORG_ID,
       organization_user_id:process.env.VUE_APP_USER_ID,
      },
    };
  },
   mounted() {
      //we should handle errors in a more scalabe way, but this works for now

    //   alert(this.form.email + " " + this.form.password + " " + this.rememberMe);
console.log(this.$route.params.id)
      axios
        .get("topic/"+this.$route.params.id)
        .then((response) => {
        //   alert(response.data);
          if (response.data[1] == 200) {
            this.data=response.data[0];
            console.log(this.data)
            // const{email} = this.data
            console.log(this.data.name)
            this.model.name = this.data.name
            this.model.description = this.data.description
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
  methods: {
    submit() {
    
      axios
        .put("topic/"+this.$route.params.id, {
          headers: {
            // axios.defaults.headers.common['Access-Control-Allow-Origin'] :  '*'
            "Content-Type": "application/json",
          },
          body: {
            name: this.model.name,
            description: this.model.description,
            is_active:true,
            is_deleted:false
          },
        })
        .then((response) => {
          // alert(response.data);
          if (response.data[1] == 201) {
            this.$router.push("/topic/list");
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>
<style></style>
