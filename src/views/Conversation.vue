<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>
    <div class="container-fluid mt--7">
      <div class="col-xl-8 mb-5 mb-xl-0">
        <chat-window
          :current-user-id="currentUserId"
          :rooms="rooms"
          :messages="messages"
          :loading-rooms="loadingRooms"
          :messages-loaded="messagesLoaded"
          :rooms-loaded="loadedRooms"
          @fetch-more-rooms="fetchMoreRooms"
          @fetch-messages="fetchMessages"
          @send-message="sendMessage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";
import axios from "axios";

export default {
  components: {
    ChatWindow,
  },
  data() {
    return {
      loadingRooms: false,
      messagesLoaded: true,
      loadedRooms: true,
      startMessages: null,
      endMessages: null,
      rooms: [],
      currentUserId: 1234,
      organization_id: process.env.VUE_APP_ORG_ID,
    };
  },
  mounted() {
    this.fetchRooms();
    // this.updateUserOnlineStatus()
  },
  methods: {
    resetRooms() {
      this.loadingRooms = true;
      this.loadingLastMessageByRoom = 0;
      this.roomsLoadedCount = 0;
      this.rooms = [];
      this.roomsLoaded = true;
      this.startRooms = null;
      this.endRooms = null;
      this.resetMessages();
    },
    resetMessages() {
      this.messages = [];
      this.messagesLoaded = false;
      this.startMessages = null;
      this.endMessages = null;
      this.listeners.forEach((listener) => listener());
      this.listeners = [];
    },
    fetchRooms() {
      // this.resetRooms();
      this.fetchMoreRooms();
    },
    async fetchMoreRooms() {
      axios
        .get("visitor?_page=" + 1)
        .then((response) => {
          sessionStorage.setItem("jwt_token", response.data[2]);
          this.rooms = response.data[0];
          console.log("room;-" + this.rooms);
          // this.fetchMessages(this.rooms[0]);
        })
        .catch((err) => {
          // alert(err);
          if (!err.response) {
            alert(err);
          } else if (err.response.status == 302) {
            sessionStorage.setItem("loggedIn", false);
            sessionStorage.setItem("jwt_token", "");
            console.log(err.response);
            this.$router.push("/login");
          }
        });
    },
    fetchMessages({ room }) {
      // console.log(room);
      console.log("room2:-" + room.roomId);
      // console.log(options);
      this.getMessagesFromApi(room.roomId);
      // use timeout to imitate async server fetched data
      setTimeout(() => {
        this.messagesLoaded = true;
      }, 0);
    },

    getMessagesFromApi(roomId) {
      let room_id = roomId;
      axios
        .get("messages/" + room_id + "?_page=" + 1)
        .then((response) => {
          // alert("akshay" + room.roomId);
          sessionStorage.setItem("jwt_token", response.data[2]);
          this.messagesLoaded = false;
          this.messages = response.data[0];
          console.log(this.messages);
        })
        .catch((err) => {
          // alert(err);
          if (!err.response) {
            alert("Check your network");
          } else if (err.response.status == 302) {
            sessionStorage.setItem("loggedIn", false);
            sessionStorage.setItem("jwt_token", "");
            console.log(err.response);
            this.$router.push("/login");
          }
        });
    },

    async sendMessage({ content, roomId, file, replyMessage }) {
      // alert("aksk");'=
      const message = {
        sender_id: this.currentUserId,
        content,
        room_id: roomId,
        timestamp: new Date(),
      };
      console.log("Message:-" + message.sender_id);
      console.log("content:-" + content);
      console.log("roomId:-" + roomId);
      console.log("file:-" + file.localUrl);
      console.log("replyMessage:-" + replyMessage);

      if (file) {
        message.file = {
          name: file.name,
          size: file.size,
          type: file.type,
          extension: file.extension || file.type,
          url: file.localUrl,
        };

        if (file.audio) {
          message.file.audio = true;
          message.file.duration = file.duration;
        }
      }

      // if (replyMessage) {
      //   message.replyMessage = {
      //     _id: replyMessage._id,
      //     content: replyMessage.content,
      //     sender_id: replyMessage.sender_id,
      //   };

      //   if (replyMessage.file) {
      //     message.replyMessage.file = replyMessage.file;
      //   }
      // }

      // const { id } = await messagesRef(roomId).add(message);
      // call api to save message
      axios
        .post("messages", {
          body: {
            sender_id: message.sender_id,
            content: message.content,
            organization_id: this.organization_id,
            room_id: message.room_id,
            timestamp: message.timestamp,
            file:message.file
          },
        })
        .then((response) => {
          // alert('dj')
          console.log(response.data);
          this.messagesLoaded = true;
          this.getMessagesFromApi(message.room_id);
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

      // if (file) this.uploadFile({ file, messageId: id, roomId });

      // roomsRef.doc(roomId).update({ lastUpdated: new Date() });
    },
  },
};
</script>