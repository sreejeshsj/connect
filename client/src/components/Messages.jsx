import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import assets from "../assets/assets";
import EmojiPicker from "emoji-picker-react";
import socket from "../socket";
import axios from "axios";
function Messages() {
  const {
    backendUrl,
    getAlFollowingUser,
    token,
    followingUser,
    user,
    getUserDetails,
    handleEmojiClick,
    showEmojiPicker,
    setShowEmojiPicker,
    message,
    setMessage,
  } = useContext(AppContext);
  const [visible, setVisible] = useState(false);

  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState("");

  const sendMessage = async () => {
    if (message.trim()) {
      socket.emit("sendMessage", {
        sender: user._id,
        receiver: receiver,
        message: message,
      });
    }
    setMessages((prev) => [
      ...prev,
      { sender: user._id, receiver: receiver, message },
    ]);
    setMessage("");
  };
  useEffect(() => {
    if (user._id) {
      socket.emit("join", user._id);
    }

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [user._id]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        if (user._id && receiver) {
          const response = await axios.post(
            `${backendUrl}/api/chat/message`,
            {
              sender: user._id,
              receiver: receiver,
            },
            { headers: { token } }
          );
          setMessages(response.data.message);
        }
      } catch (error) {
        console.log("Error", error.message);
      }
    };
    fetchMessage();
  }, [user._id, receiver]);

  useEffect(() => {
    if (token) {
      getUserDetails();
      getAlFollowingUser();
    }
  }, []);
  return (
    <div className="flex h-screen">
      <div
        className={` ${
          visible ? "hidden" : "w-full"
        } sm:w-[40%] flex flex-col border-r border-gray-300`}
      >
        <div className="p-4 flex flex-col items-center gap-4">
          <div className="h-10 flex items-center justify-center w-full font-semibold">
            {user.name}
          </div>

          <input
            className="w-[80%] text-center px-4 py-2 border border-gray-400 outline-none rounded-lg"
            type="text"
            placeholder="Search"
          />

          <div className="flex w-full justify-between px-4 font-medium">
            <p>Messages</p>
            <p>Requests</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 scrollbar-hide">
          <div className="flex flex-col gap-4 mt-4">
            {followingUser.map((user, index) => (
              <div key={index} className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.profilePicture}
                  alt="user avatar"
                />
                <p
                  onClick={() => {
                    setVisible(true);
                    setReceiver(user._id);
                  }}
                >
                  {user.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={` ${
          visible ? "w-full" : "hidden"
        } h-[90%] flex sm:block sm:w-[60%] p-4 overflow-y-auto scrollbar-hide`}
      >
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {messages &&
            messages.map((msg, index) => (
              <p key={index}>
                {" "}
                <b>{msg.sender === user._id ? "You" : "Them"}:</b> {msg.message}
              </p>
            ))}
        </div>

        {/* Sticky input box at the bottom */}
        <div className="sticky flex  gap-2 w-full bottom-0 bg-white mt-2">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            className="w-full border border-gray-400 p-2 rounded"
            placeholder="Type something..."
          />
          <button onClick={() => setShowEmojiPicker((prev) => !prev)}>
            😊
          </button>

          <img
            onClick={sendMessage}
            className="w-10 h-10 cursor-pointer"
            src={assets.send_icon}
            alt="Send"
          />
        </div>
        {showEmojiPicker && (
          <div className="mt-2 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
