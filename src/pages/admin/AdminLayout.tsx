/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { logoutUser } from "../../store/slices/userSlice";
const navLinks = [
  { to: "/admin/blogs", label: "Blogs" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/bookings", label: "Bookings" },
];

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    await dispatch(logoutUser() as any);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col py-8 px-4">
        <nav className="flex flex-col gap-4 mb-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-semibold px-3 py-2 rounded transition ${
                  isActive
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              end
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto">
          {currentUser && (
            <div className="mb-4 text-sm text-gray-600">
              <div className="font-bold">{currentUser.name}</div>
              <div>{currentUser.email}</div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition"
          >
            Logout
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
