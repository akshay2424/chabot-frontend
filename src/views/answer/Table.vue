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
          <!-- <router-link to="/topic/create" class="nav-link"> -->
          <base-button
            type="primary"
            @click="handleAnswer(question_id)"
            size="md"
            >Add Answer</base-button
          >
          <!-- </router-link> -->
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
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template slot="columns">
          <th>Question id</th>
          <th>Answer</th>
          <th></th>
        </template>

        <template slot-scope="{ row }">
          <th scope="row">
            <div class="media align-items-center">
              <!-- <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" :src="row.img">
              </a> -->
              <div class="media-body">
                <span class="name mb-0 text-sm">{{
                  row.question_id.$oid
                }}</span>
              </div>
            </div>
          </th>
          <td class="budget">
            {{ row.answer }}
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
        total="10"
        v-model="currentPage"
        :pageCount="(totalItems + 10) / 10"
        @input="getPostData(currentPage)"
      ></base-pagination>
    </div>
  </div>
</template> 
<script>
import axios from "axios";

export default {
  name: "answer-table",
  props: {
    type: {
      type: String,
    },
    title: String,
    data: Array,
    question_id: String,
    totalItems: Number,
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
      axios
        .get("answer?_page=" + currentPage)
        .then((response) => {
          console.log(response);
          sessionStorage.setItem("jwt_token", response.data[2]);
          this.data = response.data[0];
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    handleAnswer(id) {
      console.log(id);
      this.$router.push({ name: "answerCreate", params: { question_id: id } });
    },
    handleDelete(id) {
      //  console.log(agent_id)
      axios
        .delete("question/" + id, {
          headers: {},
        })
        .then((response) => {
          //   alert(response.data);
          if (response.data[1] == 204) {
            // this.data=response.data[0];
            sessionStorage.setItem("jwt_token", response.data[2]);

            this.$router.back();
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
  },
};
</script>
<style>
</style>
