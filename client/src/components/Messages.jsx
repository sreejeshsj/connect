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
    setFollowingUser,
    showEmojiPicker,
    setShowEmojiPicker,
  } = useContext(AppContext);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [search, setSearch] = useState("");
  const [originalFollowingUser, setOriginalFollowingUser] = useState([]);
  const sendMessage = async () => {
    if (message.trim()) {
      socket.emit("sendMessage", {
        sender: user._id,
        receiver: receiver,
        message: message,
      });

      setMessages((prev) => [
        ...prev,
        { sender: user._id, receiver: receiver, message },
      ]);
      setMessage("");
    }
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
  useEffect(() => {
    setOriginalFollowingUser(followingUser);
  }, [followingUser]);
  useEffect(() => {
    if (search.trim()) {
      const filtered = followingUser.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setOriginalFollowingUser(filtered);
    } else {
      setOriginalFollowingUser(followingUser);
    }
  }, [search]);

  const handleEmojiClick = (emojidata) => {
    setMessage((prev) => prev + emojidata.emoji);
  };
  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <div
        className={`${
          visible ? "hidden" : "flex"
        } sm:flex flex-col sm:w-[40%] border-r border-gray-300 h-full`}
      >
        <div className="p-4 flex flex-col items-center gap-4">
          <div className="h-10 flex items-center justify-center w-full font-semibold">
            {user.name}
          </div>
          <div className="flex items-center justify-center gap-2 w-full">
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="w-[80%] text-center px-4 py-2 border border-gray-400 outline-none rounded-lg"
              type="text"
              placeholder="Search"
            />
          </div>

          <div className="flex w-full justify-between px-4 font-medium">
            <p>Messages</p>
            <p>Requests</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 scrollbar-hide">
          <div className="flex flex-col gap-4 mt-4">
            {originalFollowingUser.map((user, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${receiver===user._id ? 'bg-gray-200' :''} `}
                onClick={() => {
                  setVisible(true);
                  setReceiver(user._id);
                }}
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.profilePicture}
                  alt="user avatar"
                />
                <p>{user.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`${
          visible ? "flex" : "hidden"
        } sm:flex flex-col sm:w-[60%] h-full relative`}
      >
        <div className="sm:hidden p-2">
          <button
            className=" sticky text-blue-500 font-semibold"
            onClick={() => setVisible(false)}
          >
            ← Back
          </button>
        </div>

        {visible && (
          <div className=" flex-1 overflow-y-auto px-4 py-2 scrollbar-hide">
            {messages &&
              messages.map((msg, index) => (
                
                <div key={index} className="flex flex-col gap-2">
                  {msg.sender === user._id ? (
                    <div className="self-end bg-blue-500 text-white px-4 py-2 m-2 rounded-lg max-w-[70%]">
                      <p>{msg.message}</p>
                    </div>
                  ) : (
                    <div className="self-start bg-gray-200 px-4 py-2 rounded-lg max-w-[70%]">
                      <p>{msg.message}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}

        {visible && (
          <div className="sticky bottom-0 w-full bg-white p-2 flex items-center gap-2 border-t border-gray-300">
            <input
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              value={message}
              className="flex-1 border border-gray-400 p-2 rounded"
              placeholder="Type something..."
            />

            <div className="relative">
              <button onClick={() => setShowEmojiPicker((prev) => !prev)}>
                😊
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-full   right-0 z-50 h-[300px] max-h-[400px] overflow-y-auto bg-white border rounded shadow">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>

            <img
              onClick={sendMessage}
              className="w-10 h-10 cursor-pointer"
              src={assets.send_icon}
              alt="Send"
            />
          </div>
        )}
        {!visible && (
          <div className="flex justify-center items-center h-[80%]">
            <p>Send Message</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
