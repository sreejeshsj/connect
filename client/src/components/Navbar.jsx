import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center shadow p-4 bg-white sticky top-0 z-50 h-16">
      <Link>
        <b>Connect</b>
      </Link>
      <div className="flex gap-2">
        <p>Home</p>
        <p>Profile</p>
      </div>
    </div>
  );
}

export default Navbar
