import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    // ✅ تغيير الخلفية إلى neutral-50
    <div className="min-h-screen bg-neutral-50 font-sans flex flex-col">
      <nav className="bg-white shadow-sm p-4 mb-6 border-b border-gray-100">
        <ul className="flex gap-8 list-none m-0 justify-center font-semibold text-lg">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1" : "text-gray-600 hover:text-blue-600 transition"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1" : "text-gray-600 hover:text-blue-600 transition"
              }
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>
      
      <footer className="text-center p-4 text-gray-400 text-sm mt-auto">
        © 2026 My React App. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;