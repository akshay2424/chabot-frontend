<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <answer-table
            title="Answer List"
            :data="data"
            :totalItems="totalItems"
            :question_id="this.$route.params.question_id"
          ></answer-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AnswerTable from "./Table.vue";
import axios from "axios";

export default {
  name: "QuestionList",
  data() {
    return {
      data: [],
      showError: false,
      question_id: "",
      totalItems: 0,
      currentPage: 1,
    };
  },
  //   props: {
  //     question_id: String,
  //   },
  components: {
    AnswerTable,
  },
  created() {
    if (this.$route.params.question_id != null) {
      axios
        .get("get_answer_by_question_id/" + this.$route.params.question_id+"?_page="+this.currentPage)
        .then((response) => {
          //   alert(response.data);
          if (response.data[1] == 200) {
            this.data = response.data[0];
            sessionStorage.setItem("jwt_token", response.data[2]);

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
    } else {
      axios
        .get("answer?_page="+this.currentPage)
        .then((response) => {
          //   alert(response.data);
          if (response.data[1] == 200) {
            this.data = response.data[0];
            console.log(this.data);
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
    }
  },
  methods: {},
};
</script>
<style></style>
