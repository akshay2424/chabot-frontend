<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign in with</small>
          </div>
          <div class="btn-wrapper text-center">
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="img/icons/common/github.svg"
              /></span>
              <span class="btn-inner--text">Github</span>
            </a>
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="img/icons/common/google.svg"
              /></span>
              <span class="btn-inner--text">Google</span>
            </a>
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Or sign in with credentials</small>
          </div>
          <form role="form" @submit.prevent="submit">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="form.email"
            >
            </base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="form.password"
            >
            </base-input>

            <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Remember me</span>
            </base-checkbox>
            <div class="text-center">
              <base-button type="submit" @click="login()" class="my-4"
                >Sign in</base-button
              >
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light"
            ><small>Forgot password? {{ (message1 = true) }}</small></a
          >
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light"
            ><small>Create new account</small></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script src="https://example.com/example-framework.js" crossorigin="anonymous"></script>

<script>
import axios from "axios";
import store from "../store";
export default {
  name: "login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      showError: false,
    };
  },
  computed: {
    message1: {
      get() {
        return this.$store.state.user.loggedIn;
      },
      set(newValue) {
        return this.$store.dispatch("setMessage", newValue);
      },
    },
  },
  methods: {
    login() {
      axios
        .post("login", {
          headers: {
            // axios.defaults.headers.common['Access-Control-Allow-Origin'] :  '*'
            "Content-Type": "application/json",
          },
          body: {
            email: this.form.email,
            password: this.form.password,
          },
        })
        .then((response) => {
          // alert(response.data);
          if (response.data[1] == 200) {
            sessionStorage.setItem(
              "user_name",
              response.data[0].user["name"]
            );
            console.log(response.data[0].user["name"]);
            // sessionStorage.setItem("jwt_token", response.data[0].token);
             localStorage.setItem("jwt_token", response.data[0].token)
             localStorage.setItem("loggedIn", true)

            sessionStorage.setItem("loggedIn", true);
            console.log(sessionStorage.getItem("jwt_token"));
           
            this.$router.push("/dashboard");
          }

          console.log(response.data[0].message);
          console.log(response.status);
          //handle response and save JWT
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>
<style>
</style>
