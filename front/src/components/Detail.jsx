import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router";

export default function Detail({
  userInfo,
  setUserInfo,
  postId,
  setPostId,
  url,
  setUrl,
}) {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        const { data } = await response.json();
        setPost(data.data);
      } catch {
        console.error("error");
      }
    };
    getPostDetail();
  }, [loading]);

  const joinPost = async () => {
    const judge = window.confirm("参加しますか？");
    if (!judge) return;
    const nowUserId = userInfo;
    const patchData = {
      status: false,
      join_user_email: nowUserId,
    };
    try {
      const response = await fetch(`/api/posts/join/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchData),
      });
      const { data } = await response.json();
      setLoading(!loading);
    } catch {
      console.error("error");
    }
  };

  const leavePost = async () => {
    const judge = window.confirm("参加を解除しますか？");
    if (!judge) return;
    const patchData = {
      status: true,
      join_user_email: null,
    };
    try {
      const response = await fetch(`/api/posts/join/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patchData),
      });
      const { data } = await response.json();
      setLoading(!loading);
    } catch {
      console.error("error");
    }
  };

  const handleToList = () => {
    navigate("/list");
  };
  return (
    <Box
      className="indicator-main"
      sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", pb: 4 }}
    >
      <AppBar position="static" elevation={0} sx={{ mb: 0 }}>
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            整備詳細
          </Typography>
        </Toolbar>
      </AppBar>
      <Card
        sx={{
          maxWidth: 600,
          mx: "auto",
          m: 1,
          borderRadius: 3,
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        {url && (
          <CardMedia
            component="img"
            image={url}
            alt="車両画像"
            sx={{ width: "100%", maxHeight: 300, objectFit: "cover" }}
          />
        )}

        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", mb: 1, color: "primary.main" }}
          >
            {post.job_name}
          </Typography>

          <Divider sx={{ mb: 1 }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                📝 内容
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5, pl: 1 }}
              >
                {post.job_content}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                ⚠️ 募集要件
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5, pl: 1 }}
              >
                {post.requirements}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                🚘 メーカー / 車両名
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {post.car_brand} {post.car_name}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                🗓️ 年式 / 型式
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {post.car_year} ({post.car_model})
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                🛜 作業場所
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {post.location}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                ⏱作業日時
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {post.job_date} {post.start_time} 〜 {post.end_time}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                📨依頼者アドレス
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {post.post_user_email}
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              mt: 1,
              p: 2,
              bgcolor: "#e3f2fd",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              獲得できる報酬
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#1565c0" }}
            >
              ¥{post.reward?.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ mt: 1 }}>
            {post.status ? (
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={joinPost}
                sx={{ borderRadius: 2, fontWeight: "bold" }}
              >
                参加する
              </Button>
            ) : (
              <Box textAlign="center">
                <Typography
                  variant="containe"
                  color="error"
                  sx={{ mb: 1, fontWeight: "bold" }}
                >
                  {post.join_user_email !== userInfo
                    ? `※ 誰かが参加済みの案件です`
                    : `※ 自分が参加済みの案件です`}
                </Typography>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={leavePost}
                  sx={{
                    borderRadius: 2,
                    fontWeight: "bold",
                    visibility:
                      post.join_user_email !== userInfo ? "hidden" : "visible",
                  }}
                >
                  参加解除
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ textAlign: "center", mt: -6, ml: -16 }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={handleToList}
          sx={{ color: "text.secondary", fontWeight: "bold" }}
        >
          一覧に戻る
        </Button>
      </Box>
    </Box>
  );
}
