import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
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
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography>整備募集一覧</Typography>
            <IconButton
              size="medium"
              edge="end"
              aria-label="logout"
              sx={{ mr: 2, backgroundColor: "white" }}
              onClick={handleLogout}
            >
              <LogoutIcon fontSize="large" sx={{ color: "red" }} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Post postId={postId} setPostId={setPostId} url={url} setUrl={setUrl} />
      <Button fullWidth onClick={handleToSubmitForm}>
        投稿する
      </Button>
    </Box>
  );
}
