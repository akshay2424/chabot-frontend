<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <agent-table title="Agent List"  :data="data"></agent-table>
        </div>
      </div>
      <!-- <div class="row mt-5">
                <div class="col">
                    <projects-table type="dark" title="Dark Table"></projects-table>
                </div>
            </div> -->
    </div>
  </div>
</template>
<script>
import AgentTable from "./AgentTable.vue";
import axios from "axios";

export default {
  name: "AgentList",
  data() {
    return {
      data: [],
      showError: false,
    };
  },
  components: {
    AgentTable,
  },
  mounted() {
      //we should handle errors in a more scalabe way, but this works for now

    //   alert(this.form.email + " " + this.form.password + " " + this.rememberMe);

      axios
        .get("agent", { })
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
