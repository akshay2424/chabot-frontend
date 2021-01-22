<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <organization-table
            title="Organization List"
            :data="data"
          ></organization-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrganizationTable from "./Table.vue";
import axios from "axios";

export default {
  name: "OrganizationList",
  data() {
    return {
      data: [],
      showError: false,
    };
  },
  components: {
    OrganizationTable,
  },
  mounted() {
    //we should handle errors in a more scalabe way, but this works for now

    //   alert(this.form.email + " " + this.form.password + " " + this.rememberMe);

    axios
      .get("organization", {
        headers: {
          // axios.defaults.headers.common['Access-Control-Allow-Origin'] :  '*'
          "x-access-token": sessionStorage.getItem("jwt_token"),
        },
      })
      .then((response) => {
        // alert(response.data[2]);
        if (response.data[1] == 200) {
          this.data = response.data[0];
          console.log(this.data);
          // alert(response.data[1]);
          sessionStorage.setItem("jwt_token", response.data[2]);
        }
       
      })
      .catch((err) => {
        console.log();
        if (!err.response) {
          alert("Check your network");
        } else if (err.response.status == 302) {
          sessionStorage.setItem("loggedIn", false);
          console.log(err.response);
          this.$router.push("/login");
        }
      });
  },
  methods: {},
};
</script>
<style></style>
