import { Tune } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function Post() {
  const [postArray, setPostArray] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch("/api/posts");
        const { data } = await response.json();
        setPostArray(data);
      } catch {
        console.error("error");
      }
    };
    getPost();
  });

  return postArray.map((ele) => {
    return (
      <li key={ele.id}>
        <Box sx={{ border: 1 }}>
          <Typography>{ele.job_name}</Typography>
          <Typography>
            {ele.start_time}〜{ele.end_time}
          </Typography>
          <Typography>{ele.location}</Typography>
          <Typography>{ele.reward}</Typography>
        </Box>
      </li>
    );
  });
}
