import App from "./App";
import { Routes, Route } from "react-router";
import List from "./components/List";
import Post from "./components/Post";
import Login from "./components/Login";
import Detail from "./components/Detail";
import AddTask from "./components/SubmitForm";

function Roots() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/list" element={<List />} />
        <Route path="/post" element={<Post />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/addtask" element={<AddTask />} />
      </Routes>
    </>
  );
}
export default Roots;
