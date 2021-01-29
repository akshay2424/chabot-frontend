<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>
    <div class="container-fluid mt--7">
      <chat-window
        :current-user-id="currentUserId"
        :rooms="rooms"
        :messages="messages"
        :loading-rooms="loadingRooms"
        :messages-loaded="messagesLoaded"
        :rooms-loaded="loadedRooms"
        @fetch-messages="fetchMessages"
      />
    </div>
  </div>
</template>

<script>
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";

export default {
  components: {
    ChatWindow,
  },
  data() {
    return {
      loadingRooms: false,
      messagesLoaded: true,
      loadedRooms: true,
      rooms: [
        {
          roomId: 1,
          roomName: "User 1",
          avatar: "https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ",
          unreadCount: 0,
          index: 3,
          lastMessage: {
            content: "Very beautiful",
            sender_id: 1234,
            username: "John Doe",
            timestamp: "10:20",
            saved: true,
            distributed: true,
            seen: true,
            new: true,
          },
          users: [
            {
              _id: 1234,
              username: "John Doe",
              avatar: "assets/imgs/doe.png",
              status: {
                state: "online",
                last_changed: "today, 14:30",
              },
            },
            {
              _id: 4321,
              username: "John Snow",
              avatar: "assets/imgs/snow.png",
              status: {
                state: "offline",
                last_changed: "14 July, 20:00",
              },
            },
          ],
          typingUsers: [4321],
        },
        {
          roomId: 2,
          roomName: "User 2",
          avatar: "https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY",
          unreadCount: 0,
          index: 3,
          lastMessage: {
            content: "fine!",
            sender_id: 1234,
            username: "John Doe",
            timestamp: "10:20",
            saved: true,
            distributed: true,
            seen: true,
            new: true,
          },
          users: [
            {
              _id: 1234,
              username: "John Doe",
              avatar: "assets/imgs/doe.png",
              status: {
                state: "online",
                last_changed: "today, 14:30",
              },
            },
            {
              _id: 4321,
              username: "John Snow",
              avatar: "assets/imgs/snow.png",
              status: {
                state: "offline",
                last_changed: "14 July, 20:00",
              },
            },
          ],
          typingUsers: [4321],
        },
      ],
      
      
      currentUserId: 1234,
    };
  },
  methods: {
    fetchMessages({ room, options }) {
      this.messagesLoaded = false;
      console.log(room);
      console.log(options);
      if (room.roomId == 2) {
        this.messages = [
          {
            _id: 7890,
            content: "Hie",
            room_id: 2,
            sender_id: 1234,
            username: "John Doe",
            date: "13 November",
            timestamp: "10:20",
            system: false,
            saved: true,
            distributed: true,
            seen: true,
            disable_actions: false,
            disable_reactions: false,
          },
           {
            _id: 7892,
            content: "Hie",
            room_id: 2,
            sender_id: 12345,
            username: "John Doe",
            date: "13 November",
            timestamp: "10:20",
            system: false,
            saved: true,
            distributed: true,
            seen: true,
            disable_actions: false,
            disable_reactions: false,
          },
          {
            _id: 7893,
            content: "How are you?",
            room_id: 2,
            sender_id: 1234,
            username: "John Doe",
            date: "13 November",
            timestamp: "10:20",
            system: false,
            saved: true,
            distributed: true,
            seen: true,
            disable_actions: false,
            disable_reactions: false,
          },
          {
            _id: 7894,
            content: "fine!",
            room_id: 2,
            sender_id: 12345,
            username: "John Doe",
            date: "13 November",
            timestamp: "10:20",
            system: false,
            saved: true,
            distributed: true,
            seen: true,
            disable_actions: false,
            disable_reactions: false,
          },
        ];
      } else {
        this.messages = [
          {
            _id: 7891,
            content: "message 1",
            room_id: 1,
            sender_id: 1235,
            username: "John Doe",
            date: "13 November",
            timestamp: "10:20",
            system: false,
            saved: true,
            distributed: true,
            seen: true,
            disable_actions: false,
            disable_reactions: false,
            file: {
              name: "My File",
              size: 67351,
              type: "png",
              audio: true,
              duration: 14.4,
              url: "https://placekitten.com/200/300",
            },
            reactions: {
              wink: [
                1234, // USER_ID
                4321,
              ],
              laughing: [1234],
            },
          },
          {
            _id: 7890,
            content: "Very beautiful",
            room_id: 2,
            sender_id: 1234,
            username: "John Doe",
            date: "13 November",
            timestamp: "10:20",
            system: false,
            saved: true,
            distributed: true,
            seen: true,
            disable_actions: false,
            disable_reactions: false,
          },
          
        ];
      }

      // use timeout to imitate async server fetched data
      setTimeout(() => {
        this.messagesLoaded = true;
      }, 0);
    },
  },
};
</script>