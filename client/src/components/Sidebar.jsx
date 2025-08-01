import { NavLink } from "react-router-dom";
import { Home, Plus, User, Mail, LogOut, Info, Search } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Sidebar() {
  const {navigate}=useContext(AppContext)
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col justify-between p-4 w-48 sticky top-16 h-[calc(100vh-64px)] bg-white shadow-md">
        <div className="flex flex-col gap-4">
          <NavLink to="/" className="flex items-center gap-2">
            <Home size={20} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/search" className="flex items-center gap-2">
            <Search size={20} />
            <span>Search</span>
          </NavLink>
          <NavLink to="/post" className="flex items-center gap-2">
            <Plus size={20} />
            <span>Post</span>
          </NavLink>
          <NavLink to="/messages" className="flex items-center gap-2">
            <Mail size={20} />
            <span>Messages</span>
          </NavLink>
          <NavLink to="/profile" className="flex items-center gap-2">
            <User size={20} />
            <span>Profile</span>
          </NavLink>
        </div>

        <div className="flex flex-col gap-2">
          <NavLink to="/about" className="flex items-center gap-2">
            <Info size={20} />
            <span>About</span>
          </NavLink>
          <NavLink
            onClick={() => {
              localStorage.removeItem("token")
              localStorage.removeItem("selectedUserId")
              localStorage.removeItem("loggedInUserId")
              navigate('/login')
            }}
            to='/logout'
            className="flex items-center gap-2"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </NavLink>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around items-center py-2 border-t">
        <NavLink to="/">
          <Home size={22} />
        </NavLink>
        <NavLink to="/search">
          <Search size={22} />
        </NavLink>
        <NavLink to="/post">
          <Plus size={22} />
        </NavLink>
        <NavLink to="/messages">
          <Mail size={22} />
        </NavLink>
        <NavLink to="/profile">
          <User size={22} />
        </NavLink>
      </div>
    </>
  );
}

export default Sidebar;
