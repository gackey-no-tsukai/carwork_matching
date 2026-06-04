import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Post from "./Post";

export default function List() {
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography>整備募集一覧</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Post />
      <Button fullWidth>投稿する</Button>
    </Box>
  );
}
