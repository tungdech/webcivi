<template>
    <div id="app">
        <router-view></router-view>

    </div>
</template>

<script>

    import EventBus from './event-bus.js';
    import { subscribeUser, unsubscribeUser } from "./pubsub-notification";

    export default {
        name: "app",
        data() {
            return {
                socket: null,
                onlineUserCount: 0,
            };
        },
        mounted() {
            // Bind custom socket.io-client instance
            // this.socket = io.connect({secure: true});
            this.socket = io.connect();

            this.socket.on("Server Notification for hotel", function(message) {
                console.log('received from server: ' + message);
                EventBus.$emit('HOTEL_GOT_NEW_ITEM', message);
            });

            this.socket.on("Room registered!", () => {
                EventBus.$emit('Room registered!');
            });

            this.socket.on("Received new order", (payload) => {
                EventBus.$emit('HOTEL_RECEIVED_NEW_ITEM', payload)
            });

            this.socket.on("New order!", (payload) => {
                console.log("New order has come.")
                EventBus.$emit('HOTEL_GOT_NEW_ITEM', payload.mess)
            });

            this.socket.on("user_count", count => {
                this.onlineUserCount = count;
                console.log(`User count: ${this.onlineUserCount}`);
            });

            EventBus.$on("Client loggin", (message) => {
                console.log("Client loggin", message);
                this.socket.emit("Client loggin", message);
                EventBus.$emit('HOTEL_GOT_NEW_ITEM', { mess: "New order item" });
            });

            
            EventBus.$on("Subscribe-Notification", (message) => {
                console.log("Subscribe-Notification")
                this.socket.emit("Subscribe-Notification", message);
            })

            
        },
    };
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /* text-align: left; */
        color: #2c3e50;
    }

    @font-face {
        font-family: "AvenirNext";
        src: url("/static/font/avenir-next-bold.ttf");
    }

    * {
        margin: 0px;
        padding: 0px;
    }

</style>
