import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginCall } from "../apiCalls";
import InputComponent from "../components/InputComponent";
import axios from "axios";
import { Alert } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { loginRedux } from "../Firebase/firebase";

const Register = () => {
  //   const LoginError = useSelector((state) => state.user.error);
  const email = useRef();
  const password = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const userName = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isFetching, dispatch } = useContext(AuthContext);
  //   const dispatch = useDispatch();
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const user = {
      username: userName.current.value,
      firstName:firstName.current.value,
      lastName:lastName.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    try {
      await axios.post("http://localhost:4400/api/auth/register", user);
      navigate("/login");
    } catch (err) {
      <Alert severity="error">There was an error while Registering Please try Again </Alert>;
    }
    setLoading(false);
  }
  return (
    <div className="flex flex-col py-10 gap-5 w-[40%] bg-slate-100 mx-auto items-center">
      <h1 className="text-center text-3xl font-bold">Login</h1>
      <form className="flex flex-col gap-5 w-2/3 p-2" onSubmit={handleSubmit}>
        {error ? <p>{error}</p> : null}
        <div className="flex flex-col gap-3 justify-between">
          <InputComponent
            ref_={firstName}
            elem_id={firstName}
            label_name={"First Name"}
          />
          <InputComponent
            ref_={lastName}
            elem_id={lastName}
            label_name={"Last Name"}
          />
          <InputComponent
            ref_={userName}
            elem_id={userName}
            label_name={"User Name"}
          />
          <label
            htmlFor="email"
            className="text-xl font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            ref={email}
            className="bg-gray-200 h-9 p-2"
          />
        </div>
        <div className="flex flex-col gap-3 justify-between">
          <label
            htmlFor="password"
            className="text-xl font-semibold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            ref={password}
            className="bg-gray-200 h-9 p-2"
          />
        </div>
        {!loading ? (
          <button
            type="submit"
            className="bg-green-500 h-10 text-xl font-semibold mt-3 text-white rounded-lg"
          >
            Sign Up
          </button>
        ) : (
          <button
            type="submit"
            className="bg-green-500 h-10 text-xl font-semibold mt-3 text-white rounded-lg"
            disabled
          >
            Loading..
          </button>
        )}
      </form>
      <div>
        <p>
          Need an Account?
          <Link to="/signUp" className="text-green-700 font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
