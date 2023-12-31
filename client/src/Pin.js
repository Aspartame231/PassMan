import React from "react";
import "./Pin.css";
import pass from "./password.png";
import { useState, useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import Axios from "axios";
const { encrypt, decrypt } = require('./server/Encryption.js');

function Pin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pinval, SetPinval] = useState("");
  const [userList, setuserList] = useState([]);

  let usname = "";
  useEffect(() => {
    Axios.get("http://localhost:3001/userdet").then((response) => {
      setuserList(response.data);
    });
  }, []);

  const veri = () => {
    let count = 0;
    for (let i = 0; i < userList.length; i++) {
      if (decrypt(userList[i].Pin) === pinval) {
        usname = usname + userList[i].Username;
        count = 1;
        break;
      }
    }
    let a1 = "";
    a1 = a1 + location.state.val.a;
    a1 = a1 + "~";
    a1 = a1 + usname;
    a1 =  a1 + "~";
    a1 = a1 + location.state.val.b;
    if (count === 1) {
      navigate("/Passw", { state: a1 });
    } else {
      navigate("/Login");
    }
  };

  return (
    <div className="outer-pin">
      <div className="inner-pin">
        <div className="upper-pin">
          <img src={pass} />
          <div className="up"> Pass-Man </div>
        </div>
        <div className="nam" >PIN</div>
        <input
          type="text"
          className="pinclass"
          placeholder="Enter the pin"
          onChange={(event) => {
            SetPinval(event.target.value);
          }}
        />
        <button className="but" onClick={veri}>
          Verify
        </button>
      </div>
    </div>
  );
}

export default Pin;
