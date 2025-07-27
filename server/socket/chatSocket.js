import messageModel from "../models/messages.js";

const setUpChatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("New User is connected ", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User with id ${userId} joined chat`);
    });

    socket.on("sendMessage", async ({ sender, receiver, message }) => {
      try {
        const newMessage = await messageModel({
          sender,
          receiver,
          message,
        });
        
        await newMessage.save();

        io.to(receiver).emit("receiveMessage", newMessage);
      } catch (error) {
        console.log("Error saving message:", error);
      }
    });
    socket.on("disconnect", () => {
      console.log("disconnected", socket.id);
    });
  });
};

export default setUpChatSocket;
