import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { NavLink, useLocation } from "react-router-dom";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

function App() {
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const addPassword = () => {
    Axios.post("http://localhost:3001/addpassword", {
      password: password,
      title: title,
      passcode: location.state,
      username: username,
    }).then(() => {
      window.location.reload(true);
    });
  };

  const [passList, setPassList] = useState([]);

  let a = location.state;

  useEffect(() => {
    Axios.get("http://localhost:3001/showpass", {
      params: { passcode: location.state },
    }).then((response) => {
      setPassList(response.data);
    });
  }, []);

  const decryptPass = (encryption) => {
    Axios.post("http://localhost:3001/decryptpass", {
      userna: encryption.usernam,
      password: encryption.password,
      iv: encryption.iv,
    }).then((response) => {
      console.log("It is.........."+response.data);
      navigate("/Pin", { state: { val: response.data, vl: a } });
      // setPassList(passList.map((val) => {
      //     return val.id === encryption.id ? {id: val.id , password: val.password , title:response.data , iv: val.iv}:val;
      // }));
    });
  };

  const loggout = () => {
    navigate("/Login");
  };

  console.log(location.state);

  return (
    <div className="App">
      <div className="Heading">
        PASS-MAN
        <div className="logut">
          <button className="login-but" onClick={loggout}>
            LOGOUT
          </button>
        </div>
      </div>
      <div className="Addpass">
        <div>Enter your credentials</div>
        <input
          type="text"
          placeholder="Website"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button className="login-but" onClick={addPassword}>
          {" "}
          Add Password
        </button>
      </div>

      <div className="pp1">Click below to view your Password</div>

      <div className="showPasswo">
        {passList.map((val) => {
          return (
            <div
              style={{ background: "#674fa2" }}
              className="passcode"
              onClick={() => {
                decryptPass({ usernam: val.username , password: val.password, iv: val.iv, id: val.id });
              }}
            >
              {" "}
              <h3 style={{textTransform: "capitalize"}}>{val.title} </h3>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
