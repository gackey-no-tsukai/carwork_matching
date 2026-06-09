import App from "./App";
import { Routes, Route } from "react-router";
import List from "./components/List";
import Post from "./components/Post";
import Login from "./components/Login";
import Detail from "./components/Detail";
import AddTask from "./components/SubmitForm";
import { useState } from "react";

function Roots() {
  const [userInfo, setUserInfo] = useState("");
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Login userInfo={userInfo} setUserInfo={setUserInfo} />}
        />
        <Route path="/list" element={<List />} />
        <Route path="/post" element={<Post />} />
        <Route
          path="/detail"
          element={<Detail userInfo={userInfo} setUserInfo={setUserInfo} />}
        />
        <Route
          path="/addtask"
          element={<AddTask userInfo={userInfo} setUserInfo={setUserInfo} />}
        />
      </Routes>
    </>
  );
}
export default Roots;
