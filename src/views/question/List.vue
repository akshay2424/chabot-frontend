<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <question-table title="Question List" :data="data"></question-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import QuestionTable from "./Table.vue";
import axios from "axios";

export default {
  name: "QuestionList",
  data() {
    return {
      data: [],
      showError: false,
       totalItems: 0,
      currentPage:1
    };
  },
  components: {
    QuestionTable,
  },
  created() {
    axios
      .get("question?_page="+this.currentPage)
      .then((response) => {
        //   alert(response.data);
        if (response.data[1] == 200) {
          sessionStorage.setItem("jwt_token", response.data[2]);

          this.data = response.data[0];
          console.log(this.data);
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
  methods: {},
};
</script>
<style></style>
