import { Button, Typography, Box, AppBar, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
export default function Detail({ userInfo, setUserInfo }) {
  const [post, setPost] = useState({});
  console.log(testPostsId);
  //暫定、Post.jsxの要素作成のonselectにsetstateを入れてpropsで貰う予定
  const navigate = useNavigate();
  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const response = await fetch(`/api/posts/${testPostsId}`);
        const { data } = await response.json();
        setPost(data.data);
      } catch {
        console.error("error");
      }
    };
    getPostDetail();
  });

  const joinPost = async () => {
    const nowUserId = "makochi@gmail.com"; //暫定、親コンポで今ログインしてるユーザーの情報を管理して、propsで貰う予定
    const patchData = {
      status: false,
      join_user_email: nowUserId,
    };
    try {
      const response = await fetch(`/api/posts/join/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchData),
      });
      const { data } = await response.json();
    } catch {
      console.error("error");
    }
  };

  const leavePost = async () => {
    const patchData = {
      status: true,
      join_user_email: null,
    };
    try {
      const response = await fetch(`/api/posts/join/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchData),
      });
      const { data } = await response.json();
    } catch {
      console.error("error");
    }
  };

  const handleToList = () => {
    navigate("/list");
  };

  return (
    <Box>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography>整備詳細</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <Typography>作業名：{post.job_name}</Typography>
        <Typography>内容：{post.job_content}</Typography>
        <Typography>募集要件：{post.requirements}</Typography>
        <Typography>メーカー：{post.car_brand}</Typography>
        <Typography>車両名：{post.car_name}</Typography>
        <Typography>車両年式：{post.car_year}</Typography>
        <Typography>車両型式：{post.car_model}</Typography>
        <Typography>作業場所：{post.location}</Typography>
        <Typography>
          作業日時：{post.start_time}〜{post.end_time}
        </Typography>
        <Typography>報酬：{post.reward}</Typography>
      </Box>
      {post.status ? (
        <Button fullWidth onClick={joinPost}>
          参加する
        </Button>
      ) : (
        <Box>
          <br></br>
          <Typography>参加済みです</Typography>
          <Button fullWidth onClick={leavePost}>
            参加解除
          </Button>
        </Box>
      )}
      <button onClick={handleToList}>戻る</button>
    </Box>
  );
}
