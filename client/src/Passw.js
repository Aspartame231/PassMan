import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import Login from "./Login";
import "./Passw.css";

function Passw() {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state);
  let ans = location.state;
  console.log("Ans is" + ans);

  let ans1 = "";
  let ans2 = "";
  let ans3 = "";	

  let i = 0;
  while(ans[i] != "~")
  {
    ans1 = ans1 + ans[i];
    i++;
  }
  i++;

  // for (i = 0; ans[i] != "~"; i++) {
  //   ans1 = ans1 + ans[i];
  // }

  console.log("d1......" + ans);

  console.log("c1......" + ans1);


  while (ans[i] != "~") {
    ans2 = ans2 + ans[i];
    i++;
  }
  i++;

  while(i < ans.length)
  {
    ans3 = ans3 + ans[i];
    i++;
  }
  console.log("ans3 is " + ans3);

  console.log("c2..............." + ans2);

  const fun3 = () => {
    navigate("/App", { state: ans2 });
  };

  return (
    <div className="out1">
      <div className="in1">
      <div>
        <div>Username is {ans3}</div>
        <div>Password is {ans1}</div>
      </div>
      </div>
      <div>
        <button className="b1t login-but" onClick={fun3}>
          Go back
        </button>
      </div>
    </div>
  );
}

export default Passw;
