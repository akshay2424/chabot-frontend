<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <topic-table title="Topic List" :data="data" :totalItems="totalItems"></topic-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopicTable from "./Table.vue";
import axios from "axios";

export default {
  name: "TopicList",
  data() {
    return {
      data: [],
      showError: false,
      currentPage:1,
      totalItems:0
    };
  },
  components: {
    TopicTable,
  },
  created() {
    axios.get('topic?_page='+this.currentPage)
      .then(response => {
        sessionStorage.setItem("jwt_token", response.data[2]);

          this.data = response.data[0];
          this.totalItems=this.data.length
      })
      .catch((err) => {
        // alert(err);
        if (!err.response) {
          alert("Check your network");
        } else if (err.response.status == 302) {
          sessionStorage.setItem("loggedIn", false);
          sessionStorage.setItem("jwt_token", '');
          console.log(err.response);
          this.$router.push("/login");
        }
      });
  },
  methods: {},
};
</script>
<style></style>
