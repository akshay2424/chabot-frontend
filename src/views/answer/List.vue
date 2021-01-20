<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <answer-table title="Answer List" :data="data" :question_id="this.$route.params.question_id"></answer-table>
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
      question_id:''
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
        .get("get_answer_by_question_id/"+this.$route.params.question_id)
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
          alert(err);
        });
    }else{
         axios
        .get("answer")
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
          alert(err);
        });
    }
  },
  methods: {},
};
</script>
<style></style>
