<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <question-table title="Question List"  :data="data"></question-table>
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
    };
  },
  components: {
    QuestionTable,
  },
  created() {
      axios
        .get("question")
        .then((response) => {
        //   alert(response.data);
          if (response.data[1] == 200) {
            this.data=response.data[0];
            console.log(this.data)
          }
        //   console.log(response.data);
        //   console.log(response.status);
          //handle response and save JWT
        })
        .catch((err) => {
          alert(err);
        });
    },
  methods: {
    
  },
};
</script>
<style></style>
