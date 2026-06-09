// import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
// import { TypeSelector } from "./TypeSelector";
import { TextField, Box, formControlLabelClasses } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router";

export default function AddTask() {
  const [submitForm, setSubmitForm] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const formdata = {
    job_name: useRef(null),
    job_content: useRef(null),
    requirements: useRef(null),
    car_brand: useRef(null),
    car_name: useRef(null),
    car_year: useRef(null),
    car_model: useRef(null),
    picture: useRef(null),
    location: useRef(null),
    job_date: useRef(null),
    start_time: useRef(null),
    end_time: useRef(null),
    reward: useRef(null),
  };

  const handleSubmit = async () => {
    console.log("formdata", formdata.picture);
    const judge = window.confirm("入力内容を登録しますか？");
    if (!judge) return;
    const now = new Date().toISOString();
    const user = 3; //ここはpropsで引き渡すため仮定義

    const photoFile = formdata.picture.current.files[0];
    console.log("フォトファイル", photoFile);
    const fileName = photoFile.name;
    const fileExtention = fileName.substring(fileName.lastIndexOf(".") + 1);
    const blob = photoFile.slice(0, photoFile.size, photoFile.type);
    const renamedFile = new File([blob], user + now + "." + fileExtention, {
      type: photoFile.type,
    });
    console.log(renamedFile.name);
    // const PhotoURL = await uploadPhoto(renamedFile);
    const sentData = {
      // user_id: formdata.user_id.current?.value,
      user_id: user,
      job_name: formdata.job_name.current?.value,
      job_content: formdata.job_content.current?.value,
      requirements: formdata.requirements.current?.value,
      car_brand: formdata.car_brand.current?.value,
      car_name: formdata.car_name.current?.value,
      car_year: formdata.car_year.current?.value,
      car_model: formdata.car_model.current?.value,
      location: formdata.location.current?.value,
      start_time: "2026-06-01 10:00:00.000+09",
      end_time: "2026-06-01 10:00:00.000+09",
      reward: formdata.reward.current?.value,
      picture: renamedFile.name,
    };
    // sentData.picture = renamedFile.name;
    console.log(renamedFile);
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentData),
      });
      let fileData = new FormData();
      fileData.append("file", renamedFile);
      fileData.append("fileName", renamedFile.name);
      await fetch(`/api/photos`, {
        method: "POST",
        body: fileData,
      });
      console.log(sentData);
      if (!response.ok) {
        throw new Error(`サーバーエラーが発生しました: ${response.status}`);
      }
      const postetData = await response.json();
      alert("データの保存が完了しました！");
    } catch (error) {
      console.error("保存失敗:", error);
      alert("データの保存に失敗しました。通信環境などを確認してください。");
    }
    setIsSubmit(true);
  };

  const handleBackButton = () => {
    navigate("/list");
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="作業名"
          type="text"
          inputRef={formdata.job_name}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ width: "400px" }}
        />
        <TextField
          label="作業内容"
          type="text"
          inputRef={formdata.job_content}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ width: "400px" }}
        />
        <TextField
          label="募集要件"
          type="text"
          inputRef={formdata.requirements}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ width: "400px" }}
        />
        <TextField
          label="メーカー"
          type="text"
          inputRef={formdata.car_brand}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ width: "400px" }}
        />
        <TextField
          label="車種"
          type="text"
          inputRef={formdata.car_name}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ width: "400px" }}
        />
        <TextField
          label="年式"
          type="text"
          inputRef={formdata.car_year}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ width: "400px" }}
        />
        <TextField
          label="型式"
          type="text"
          inputRef={formdata.car_model}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ width: "400px" }}
        />
        <TextField
          label="写真"
          type="file"
          inputRef={formdata.picture}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ width: "400px" }}
        />

        <TextField
          label="場所"
          type="text"
          inputRef={formdata.location}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ width: "400px" }}
        />
        <TextField
          label="作業予定日"
          type="date"
          inputRef={formdata.job_date}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ width: "400px" }}
        />
        <TextField
          label="開始時刻"
          type="time"
          inputRef={formdata.start_time}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ width: "400px" }}
        />
        <TextField
          label="終了時刻"
          type="time"
          inputRef={formdata.end_time}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ width: "400px" }}
        />
        <TextField
          label="報酬"
          type="number"
          inputRef={formdata.reward}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ width: "400px" }}
        />
        <button type="submit" onClick={handleSubmit}>
          登録する
        </button>
        <button onClick={handleBackButton}>戻る</button>
      </Box>
    </>
  );
}
