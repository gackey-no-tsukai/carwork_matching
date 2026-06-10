import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
export default function List({ postId, setPostId, url, setUrl }) {
  const navigate = useNavigate();

  const handleToSubmitForm = () => {
    navigate("/addtask");
  };
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="medium"
              edge="start"
              aria-label="logout"
              sx={{ mr: 2, backgroundColor: "white" }}
              onClick={handleLogout}
            >
              <LogoutIcon fontSize="large" sx={{ color: "gray" }} />
            </IconButton>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              整備募集一覧
            </Typography>
            <IconButton
              size="medium"
              edge="end"
              aria-label="logout"
              sx={{ mr: 2, backgroundColor: "white" }}
              onClick={handleToSubmitForm}
            >
              <CarRepairIcon fontSize="large" sx={{ color: "green" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Post postId={postId} setPostId={setPostId} url={url} setUrl={setUrl} />
    </>
  );
}
