import { useEffect } from "react";

export default function Detail() {
  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const response = await fecth(`/api/posts/${id}`);
        const data = response.json();
      } catch {
        console.error("error");
      }
    };
    getPostDetail;
  });
}
