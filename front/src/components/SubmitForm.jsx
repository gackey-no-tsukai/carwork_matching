// import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
// import { TypeSelector } from "./TypeSelector";
import { TextField, Box, formControlLabelClasses } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function AddTask() {
  const [submitForm, setSubmitForm] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

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

  const handleSubmit = () => {
    Object.keys(formdata).map((ele) => {
      if (ele === "picture") {
        console.log(formdata[ele], "pictureだよ");
      } else {
        console.log(formdata[ele].current.value);
      }
    });
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
        <button onClick={handleSubmit}></button>
      </Box>
    </>
  );
}
