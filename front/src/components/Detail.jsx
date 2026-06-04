import { useEffect, useState } from "react";

export default function Detail() {
  const [post, setPost] = useState({});
  const id = 1;
  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const response = await fecth(`/api/posts/${id}`);
        const data = response.json();
        console.log(data);
        setPost(data);
      } catch {
        console.error("error");
      }
    };
    getPostDetail;
  });
}
