<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ title }}
          </h3>
        </div>
        <div class="col text-right">
          <router-link to="/agent/create" class="nav-link">
            <base-button type="primary" size="md">Add Agent</base-button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="data"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template slot="columns">
          <th>Name</th>
          <th>Email</th>
          <th>Shift Name</th>
          <th>Address</th>
          <th></th>
        </template>

        <template slot-scope="{ row }">
          <th scope="row">
            <div class="media align-items-center">
              <!-- <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" :src="row.img">
              </a> -->
              <div class="media-body">
                <span class="name mb-0 text-sm"
                  >{{ row.first_name }} {{ row.last_name }}</span
                >
              </div>
            </div>
          </th>
          <td class="budget">
            {{ row.email }}
          </td>
          <td>
            <badge class="badge-dot mr-4">
              <i></i>
              <span class="status">{{ row.shift_name }}</span>
            </badge>
          </td>
          <td class="budget">
            {{ row.address }}
          </td>
          <td class="text-right">
            <base-dropdown class="dropdown" position="right">
              <a
                slot="title"
                class="btn btn-sm btn-icon-only text-dark"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <a class="dropdown-item" href="#"  @click="handleEdit(row._id.$oid)">
                Edit
                </a>
                <a class="dropdown-item" href="#" @click="handleDelete(row._id.$oid)">Delete</a>
                <!-- <a class="dropdown-item" href="#">Something else here</a> -->
              </template>
            </base-dropdown>
          </td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <base-pagination
        total="10"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
      ></base-pagination>
    </div>
  </div>
</template> 
<script>
import axios from "axios";

export default {
  name: "agent-table",
  props: {
    type: {
      type: String,
    },
    title: String,
    data: Array,
  },
  computed: {
    rows() {
      return this.data.length;
    },
  },
  data() {
    return {
      perPage: 10,
      agent_id:'',
      currentPage: 1,
    };
  },
  methods:{
     handleEdit(agent_id){
      //  console.log(agent_id)
      this.$router.push({name:"AgentEdit",params:{agent_id:agent_id}});
    },
    handleDelete(agent_id){
      //  console.log(agent_id)
      axios
        .delete("agent/"+agent_id)
        .then((response) => {
        //   alert(response.data);
          if (response.data[1] == 204) {
            // this.data=response.data[0];
           window.location.href="agent/list"
            console.log(this.data)
          }
        //   console.log(response.data);
        //   console.log(response.status);
          //handle response and save JWT
        })
        .catch((err) => {
          alert(err);
        });
    }
  }
};
</script>
<style>
</style>
