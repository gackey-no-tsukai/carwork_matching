import { Tune } from "@mui/icons-material";
import { Typography, Box, Card, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Detail from "./Detail";
export default function Post({ postId, setPostId, url, setUrl }) {
  const [postArray, setPostArray] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        const result = await fetch("/api/photos");
        const photo_data = await result.json();
        const updatedPosts = data.data.map((item) => {
          const matchPhoto = photo_data.data.find(
            (photo) => item.picture === photo?.picture,
          );
          if (matchPhoto) {
            return { ...item, picture: matchPhoto.url };
          }
          return item;
        });
        setPostArray(updatedPosts);
      } catch (error) {
        console.error("error", error);
      }
    };
    getPost();
  }, []);
  //userIDで指定した画像をゲットしてきて名前が同じpostArray内のデータに画像ファイルURlを設定する　img urlへ
  const handleToPost = (e) => {
    const newValue = Number(e.currentTarget.id);
    setPostId(newValue);
    setUrl(postArray.find((ele) => ele.id === newValue).picture);
    navigate("/detail");
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        marginTop: "8px",
        alignItems: "center",
      }}
    >
      {postArray.map((ele) => {
        return (
          <Card
            key={ele?.id}
            onClick={handleToPost}
            id={ele?.id}
            value={ele?.picture}
            sx={{
              border: 1.5,
              padding: 1,
              maxWidth: 345,
              textAlign: "center",
              borderRadius: 1,
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{ textDecoration: "underline" }}
            >
              {ele?.job_name}
            </Typography>
            <CardMedia
              image={ele?.picture}
              style={{
                height: "100px",
                objectFit: "cover",
                marginTop: "8px",
                marginBottom: "8px",
              }}
              alt={ele?.job_name}
            />
            <Typography variant="body2">{ele?.job_date}</Typography>
            <Typography variant="body2">
              {ele?.start_time}〜{ele?.end_time}
            </Typography>
            {/* <Typography variant="body2">{ele?.location}</Typography> */}
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              ¥{ele?.reward.toLocaleString()}
            </Typography>
          </Card>
        );
      })}
    </Box>
  );
}
