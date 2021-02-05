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
          <router-link to="/group/create" class="nav-link">
            <base-button type="primary" size="md">Add Group</base-button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="table">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="data"
      >
        <template slot="columns">
          <th>Name</th>
           <th>Department Name</th>
          <th>Description</th>
          <th></th>
        </template>

        <template slot-scope="{ row }">
          <th scope="row">
            <div class="media align-items-center">
              <!-- <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" :src="row.img">
              </a> -->
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.name }}</span>
              </div>
            </div>
          </th>
           <td class="budget">
            {{ row.department[1] }}
          </td>
          <td class="budget">
            {{ row.description }}
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
                <a
                  class="dropdown-item"
                  href="#"
                  @click="handleEdit(row._id.$oid)"
                >
                  Edit
                </a>
                <a
                  class="dropdown-item"
                  href="#"
                  @click="handleDelete(row._id.$oid)"
                  >Delete</a
                >
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
        size="md"
        v-model="currentPage"
        :pageCount="(totalItems+10)/10"
        @input="getPostData(currentPage)"
      ></base-pagination>
    </div>
  </div>
</template> 
<script>
import axios from "axios";

export default {
  name: "group-table",
  props: {
    type: {
      type: String,
    },
    title: String,
    data: Array,
    totalItems: Number
  },
  computed: {
    rows() {
      return this.data.length;
    },
  },
  data() {
    return {
      perPage: 10,
      id: "",
      currentPage: 1,
    };
  },
  methods: {
    getPostData(currentPage) {
      // alert("ask")

      axios
        .get("group?_page=" + currentPage)
        .then((response) => {
          console.log(response);
          sessionStorage.setItem("jwt_token", response.data[2]);
          this.data = response.data[0];
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    handleEdit(id) {
      //  console.log(agent_id)
      this.$router.push({ name: "group-edit", params: { id: id } });
    },
    handleDelete(id) {
      //  console.log(agent_id)
      axios
        .delete("group/" + id)
        .then((response) => {
          //   alert(response.data);
          if (response.data[1] == 204) {
            // this.data=response.data[0];
            sessionStorage.setItem("jwt_token", response.data[2]);

            this.$router.back();
            console.log(response.data[2]);
          }
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
    },
  },
};
</script>
<style>
</style>
