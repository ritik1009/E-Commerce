import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const { user,dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  async function logout() {
    setLoading(true);
    dispatch({ type: "LOGOUT_SUCCESS", payload: {} });
    localStorage.clear();
    setLoading(false);
    window.location.reload();
    navigate("/login");
  }
  return (
    <div className="w-screen h-20 flex justify-between items-center pt-3 pl-12 pr-10 mb-10 text-green-600 mr-3 box-border">
      <NavLink to="home">
        <h1 className="font-[Graduate] text-3xl font-bold cursor-pointer">
          SportsMania
        </h1>
      </NavLink>
      <ul className="flex gap-2 text-lg font-medium ">
        <li className="px-3 py-2 flex item-center justify-center cursor-pointer">
          Outdoor
        </li>
        <li className="px-3 py-2 flex item-center justify-center cursor-pointer">
          Indoor
        </li>
        <li className="px-3 py-2 flex item-center justify-center cursor-pointer">
          Digital
        </li>
        {user?.role === "admin" ? (
          <NavLink to="addProduct">
            <li className="px-3 py-2 flex item-center justify-center cursor-pointer">
              Add Product
            </li>
          </NavLink>
        ) : null}
        <NavLink to="cart">
          <li className="px-3 py-2 flex item-center justify-center cursor-pointer">
            Cart
          </li>
        </NavLink>
        {!user ? (
          <div className="flex">
            <NavLink to="login">
              <li className=" rounded-xl px-4 py-2 flex item-center justify-center cursor-pointer">
                Login
              </li>
            </NavLink>
            <NavLink to="signUp">
              <li className="px-3 py-2 flex item-center justify-center cursor-pointer">
                Sign Up
              </li>
            </NavLink>
          </div>
        ) : (
          <li
            className="px-3 py-2 flex item-center justify-center cursor-pointer"
            onClick={logout}
          >
            {loading ? "Loading" : "LogOut"}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
