import { Tune } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Detail from "./Detail";
export default function Post({ postId, setPostId, url, setUrl }) {
  console.log(setPostId);
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
        console.log(data);
        console.log(photo_data);
        const updatedPosts = data.data.map((item) => {
          console.log(item);
          console.log(photo_data.data);
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
    console.log(postArray);
    setPostId(newValue);
    console.log(newValue);
    setUrl(postArray.find((ele) => ele.id === newValue).picture);
    navigate("/detail");
  };

  return (
    <div>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          listStyle: "none",
          padding: 0,
        }}
      >
        {postArray.map((ele) => {
          // setUrl((url) => [...url, ele.picture]);
          return (
            <li key={ele?.id}>
              <Box
                onClick={handleToPost}
                id={ele?.id}
                value={ele?.picture}
                sx={{
                  border: 1,
                  padding: 2,
                  width: 150,
                  borderRadius: 1,
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <Typography variant="subtitle2" noWrap>
                  {ele?.job_name}
                </Typography>
                <img
                  src={ele?.picture}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginTop: "8px",
                  }}
                  alt={ele?.job_name}
                />
                <Typography variant="body2">{ele?.job_date}</Typography>
                <Typography variant="body2">
                  {ele?.start_time}〜{ele?.end_time}
                </Typography>
                <Typography variant="body2">{ele?.location}</Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  ¥{ele?.reward.toLocaleString()}
                </Typography>
              </Box>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
