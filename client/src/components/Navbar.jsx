import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center shadow p-4 bg-white sticky top-0 z-50 h-16">
      <Link>
        <b>Connect</b>
      </Link>
      <div className="flex gap-2">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
