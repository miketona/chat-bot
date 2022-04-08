<template>
  <div id="chatContainer">
    <div class="chatHeader">
      <h4>Bot</h4>
    </div>
    <div class="chatBody">
      <div class="messages" v-for="message in messages" :key="message.id">
        <div class="messageRow user" v-if="message.id % 2 == 0">
          <div class="message user">
            <p>{{ message.message }}</p>
          </div>
        </div>
        <div class="messageRow bot" v-else>
          <div class="message bot">
            <p>{{ message.message }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="chatFooter">
      <form @submit.prevent="sendMessage()">
        <input v-model="messageContent" id="createMessage" />
        <input type="submit" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
export default {
  name: "App",
  setup() {
    const messages = ref([]),
      messageContent = ref("");

    //Sends the message on form submit
    function sendMessage() {
      if (messageContent.value == "") return;
      createMessage(messageContent.value);
      getResponse(messageContent.value);
      messageContent.value = "";
    }

    //Create a message
    function createMessage(message) {
      let id = 0;
      if (messages.value[messages.value.length - 1]) {
        id = messages.value[messages.value.length - 1].id + 1;
      }
      messages.value.push({
        id: id,
        message: message,
      });
    }

    async function getResponse(message) {
      const postData = {
        message: message,
      };
      const { data } = await axios.post("http://localhost:8000/chat", postData);
      const { response } = data;
      createMessage(response);
    }

    return { messages, messageContent, sendMessage };
  },
};
</script>

<style>
#chatContainer {
  background-color: #282c34;
  height: 600px;
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
}
.chatHeader {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  color: white;
  margin-left: 5%;
}
.chatFooter {
  position: absolute;
  bottom: 0px;
  width: 100%;
}
.chatFooter form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
}
.chatBody {
  overflow-y: scroll;
  height: 83%;
}
#createMessage {
  width: 80%;
}
input:not(#createMessage) {
  background-color: green;
  border: 0;
  color: white;
  padding: 10px;
  margin-bottom: 12px;
  opacity: 0.8;
}
input:not(#createMessage):hover {
  opacity: 0.5;
}
.messageRow {
  display: flex;
  justify-content: flex-end;
}
.messageRow.bot {
  justify-content: flex-start;
}
.message p {
  color: white;
  padding: 0px 15px 0px 15px;
}
.message {
  border-radius: 50px;
  text-align: center;
  margin: 10px;
}
.messageRow.user .message {
  background-color: #1982fc;
}
.messageRow.bot .message {
  background-color: #43cc47;
}
.chatBody::-webkit-scrollbar {
  width: 0px;
  height: 100%;
}
</style>
