import { useRef, useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router";

export default function AddTask({ userInfo, setUserInfo }) {
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
    const judge = window.confirm("入力内容を登録しますか？");
    if (!judge) return;
    const now = new Date().toISOString();

    const photoFile = formdata.picture.current.files[0];
    const fileName = photoFile.name;
    const fileExtention = fileName.substring(fileName.lastIndexOf(".") + 1);
    const blob = photoFile.slice(0, photoFile.size, photoFile.type);
    const renamedFile = new File([blob], userInfo + now + "." + fileExtention, {
      type: photoFile.type,
    });
    const sentData = {
      post_user_email: userInfo,
      job_name: formdata.job_name.current?.value,
      job_content: formdata.job_content.current?.value,
      job_date: formdata.job_date.current?.value,
      requirements: formdata.requirements.current?.value,
      car_brand: formdata.car_brand.current?.value,
      car_name: formdata.car_name.current?.value,
      car_year: formdata.car_year.current?.value,
      car_model: formdata.car_model.current?.value,
      location: formdata.location.current?.value,
      start_time: formdata.start_time.current?.value,
      end_time: formdata.end_time.current?.value,
      reward: formdata.reward.current?.value,
      picture: renamedFile.name,
    };
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
      const postetData = await response.json();
      alert("データの保存が完了しました！");
      navigate("/list");
      if (!response.ok) {
        throw new Error(`サーバーエラーが発生しました: ${response.status}`);
      }
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
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", pb: 1 }}>
      <AppBar position="static" elevation={0} sx={{ mb: 1 }}>
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            依頼登録フォーム
          </Typography>
        </Toolbar>
      </AppBar>

      <Card
        sx={{ maxWidth: 900, mx: "auto", m: 2, borderRadius: 3, boxShadow: 3 }}
      >
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    color: "primary.main",
                    borderBottom: "2px solid",
                    pb: 0.5,
                  }}
                >
                  ⚙️ 作業・車両情報
                </Typography>
                <TextField
                  label="作業名"
                  type="text"
                  placeholder="例:エンジンのオーバーホールをしてほしい"
                  inputRef={formdata.job_name}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                />
                <TextField
                  label="作業内容"
                  type="text"
                  multiline
                  rows={3}
                  placeholder="例:道具や設備はないので、作業場用意して欲しいです"
                  inputRef={formdata.job_content}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                />
                <TextField
                  label="募集要件"
                  type="text"
                  placeholder="例:自動車整備士の資格のある方"
                  inputRef={formdata.requirements}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                />
                <TextField
                  label="メーカー"
                  type="text"
                  placeholder="例:トヨタ"
                  inputRef={formdata.car_brand}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                />
                <TextField
                  label="車種"
                  type="text"
                  placeholder="例:クラウン"
                  inputRef={formdata.car_name}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="年式"
                      type="text"
                      placeholder="例:製造年月日"
                      inputRef={formdata.car_year}
                      slotProps={{ inputLabel: { shrink: true } }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="型式"
                      type="text"
                      placeholder="例:車検証を参照"
                      inputRef={formdata.car_model}
                      slotProps={{ inputLabel: { shrink: true } }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={3}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    color: "primary.main",
                    borderBottom: "2px solid",
                    pb: 0.5,
                  }}
                >
                  📍 条件・その他
                </Typography>

                <TextField
                  label="写真"
                  type="file"
                  inputRef={formdata.picture}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                />
                <TextField
                  label="場所"
                  type="text"
                  placeholder="例:愛知県日進市米野木町"
                  inputRef={formdata.location}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                />
                <TextField
                  label="作業予定日"
                  type="date"
                  inputRef={formdata.job_date}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="開始時刻"
                      type="time"
                      inputRef={formdata.start_time}
                      slotProps={{ inputLabel: { shrink: true } }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="終了時刻"
                      type="time"
                      inputRef={formdata.end_time}
                      slotProps={{ inputLabel: { shrink: true } }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <TextField
                  label="報酬金額 (¥)"
                  type="number"
                  inputRef={formdata.reward}
                  slotProps={{ inputLabel: { shrink: true } }}
                  fullWidth
                />
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ mt: 1, pt: 2, borderTop: "1px solid #e0e0e0" }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSubmit}
              sx={{
                borderRadius: 2,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              この内容で登録する
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ textAlign: "center", mt: -6, ml: 65 }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackButton}
          sx={{ color: "text.secondary", fontWeight: "bold" }}
        >
          前の画面に戻る
        </Button>
      </Box>
    </Box>
  );
}
