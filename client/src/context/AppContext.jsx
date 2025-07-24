import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [postId, setPostId] = useState("");
  const [image, setImage] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const value = {
    backendUrl,
    navigate,
    token,
    setPostId,
    postId,
    image,
    setImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
