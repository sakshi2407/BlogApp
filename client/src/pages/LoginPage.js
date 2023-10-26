import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import CONFIG from "../config";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  async function login(ev) {
    console.log("login");
    try {
      ev.preventDefault();
      const response = await fetch(`${CONFIG.backend_url}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Credentials: "include",
        },
        credentials: "include",
      });
      console.log(response);
      if (response.ok) {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
          setRedirect(true);
        });
      } else {
        alert("wrong credentials");
      }
    } catch (err) {
      console.log(err);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
