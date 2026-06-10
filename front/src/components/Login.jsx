import {
  AppBar,
  Box,
  TextField,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Modal,
  makeStyles,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import { SingupModal } from "./SingupModal";

import {
  //   connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { firebaseConfig } from "../utils/config";
import { useState, useEffect, useRef } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  justifyItems: "center",
};

export default function Login({ userInfo, setUserInfo }) {
  const [textMessage, setTextMessage] = useState("");
  const [loginStatus, setLoginStatus] = useState("ログアウト中");
  const firebaseApp = initializeApp(firebaseConfig);
  const refEmail = useRef("");
  const refPassword = useRef("");
  const navigate = useNavigate();
  const [open, setIsOpen] = useState(false);
  const refEmailSingup = useRef("");
  const refPasswordSingup = useRef("");

  const toggleSignIn = async () => {
    if (refEmail.current.value.length < 4) {
      setTextMessage("メールアドレスを入力してください");
      alert("メールアドレスを入力してください");
      return;
    }
    if (refPassword.current.value.length < 4) {
      setTextMessage("パスワードを入力してください");
      alert("パスワードを入力してください");
      return;
    }
    const req = {
      mail: refEmail.current.value,
      password: refPassword.current.value,
    };
    const res = await fetch("api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    const data = await res.json();
    if (data.ok) {
      setUserInfo((info) => req.mail);
      navigate("/list");
    } else {
      setTextMessage((text) => data.message);
    }
  };

  async function handleSignUp() {
    if (refEmailSingup.current.value.length < 4) {
      alert("メアドを入力して：失敗");
      setTextMessage("必須項目が記入されていません");
      return;
    }
    if (refPasswordSingup.current.value.length < 4) {
      alert("パスワードを入力してください：失敗");
      setTextMessage("必須項目が記入されていません");
      return;
    }
    const req = {
      mail: refEmailSingup.current.value,
      password: refPasswordSingup.current.value,
    };
    const res = await fetch("api/login/singup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    const data = await res.json();
    setTextMessage((text) => data.message);
    if (!data.ok) alert(data.message);
    setIsOpen((is) => false);
  }

  const handleClose = () => {
    setTextMessage((text) => "");
    setIsOpen((is) => false);
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "45px",
              }}
            >
              <TextField
                type="text"
                name="emailSingup"
                placeholder="Email"
                inputRef={refEmailSingup}
              />
              <TextField
                type="password"
                name="passwordSingup"
                placeholder="Password"
                inputRef={refPasswordSingup}
              />
              <button
                id="quickstart-sign-up"
                name="signup"
                onClick={handleSignUp}
              >
                サインアップ
              </button>
            </Box>
            <Box sx={{ marginTop: "24px" }}>{textMessage}</Box>
          </Box>
        </Modal>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "240px",
          gap: "40px",
        }}
      >
        <Typography variant="h1">Carwork Matching</Typography>
        <Box>{textMessage}</Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "45px",
          }}
        >
          <TextField
            type="text"
            name="emailSingin"
            placeholder="Email"
            inputRef={refEmail}
          />
          <TextField
            type="password"
            name="passwordSingin"
            placeholder="Password"
            inputRef={refPassword}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          <IconButton onClick={toggleSignIn} color="primary">
            サインイン
            <LoginIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          <IconButton
            onClick={() => {
              setTextMessage((text) => "");
              setIsOpen((is) => true);
            }}
            color="inherit"
          >
            サインアップ
            <PersonAddIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
