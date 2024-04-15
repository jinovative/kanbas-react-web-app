import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signin() {
  const [credentials, setCredentials] = useState<client.User>({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const signin = async () => {
    await client.signin(credentials);
    navigate("/Kanbas/Account/Profile");
  };

  const redirectToSignup = () => {
    navigate("/Kanbas/Account/Signup"); // Corrected path to match the route
  };
  return (
    <div>
      <h1>Signin</h1>
      <input
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />{" "}
      <br />
      <input
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />{" "}
      <br />
      <button className="btn btn-primary " onClick={signin}>
        {" "}
        Signin{" "}
      </button>
      <button className="btn btn-warning" onClick={redirectToSignup}>
        {" "}
        signup
      </button>
    </div>
  );
}
