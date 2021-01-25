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
            :totalItems="totalItems"
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
      totalItems: 0,
      currentPage: 1,
    };
  },
  components: {
    OrganizationTable,
  },
  mounted() {
  
    axios
      .get("organization?_page="+this.currentPage)
      .then((response) => {
        // alert(response.data[2]);
        if (response.data[1] == 200) {
          sessionStorage.setItem("jwt_token", response.data[2]);


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
          sessionStorage.setItem("loggedIn", '');
          sessionStorage.setItem("jwt_token", "");
          console.log(err.response);
          this.$router.push("/login");
        }
      });
  },
  methods: {},
};
</script>
<style></style>
