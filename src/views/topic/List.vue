<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <topic-table title="Topic List"  :data="data"></topic-table>
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
    };
  },
  components: {
    TopicTable,
  },
  created() {
      axios
        .get("topic")
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
