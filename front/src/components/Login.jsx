import {
  AppBar,
  Box,
  TextField,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import { initializeApp } from "firebase/app";

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

export default function List() {
  const [textMessage, setTxetMessage] = useState("");
  const [loginStatus, setLoginStatus] = useState("ログアウト中");
  const firebaseApp = initializeApp(firebaseConfig);
  const refEmail = useRef("");
  const refPassword = useRef("");

  const toggleSignIn = () => {
    if (refEmail.current.value.length < 4) {
      setTxetMessage("メールアドレスを入力してください");
      alert("メールアドレスを入力してください");
      return;
    }
    if (refPassword.current.value.length < 4) {
      setTxetMessage("パスワードを入力してください");
      alert("パスワードを入力してください");
      return;
    }
    const req = {
      mail: refEmail.current.value,
      password: refPassword.current.value,
    };
    fetch("api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((res) => setTxetMessage((text) => res.message));
  };

  function handleSignUp() {
    if (refEmail.current.value.length < 4) {
      alert("メアドを入力して：失敗");
      setTxetMessage("必須項目が記入されていません");
      return;
    }
    if (refPassword.current.value.length < 4) {
      alert("パスワードを入力してください：失敗");
      setTxetMessage("必須項目が記入されていません");
      return;
    }
    const req = {
      mail: refEmail.current.value,
      password: refPassword.current.value,
    };
    fetch("api/login/singup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((res) => setTxetMessage((text) => res.message));
  }

  // 下記処理はauthの調査完了後変更する
  // const auth = getAuth(firebaseApp);

  // async function toggleSignOut() {
  //   await fetch("/api/login/singout");
  //   // if (auth.currentUser) {
  //   //   signOut(auth);
  //   //   setTxetMessage("サインアウトに成功しました。");
  //   //   setLoginStatus("ログアウト中");
  //   // } else {
  //   //   setTxetMessage("サインアウトに失敗しました。");
  //   //   alert("auth.currentUserがfalseです。サインアウトに失敗");
  //   // }
  // }

  // function sendVerificationEmailToUser() {
  //   sendEmailVerification(auth.currentUser)
  //     .then(function () {
  //       setTxetMessage("認証のメールを送信しました");
  //       alert("Email Verification Sent!");
  //     })
  //     .catch(function () {
  //       if (auth.currentUser) {
  //         setTxetMessage("短期間で複数の認証メールを送ることはできません");
  //       } else {
  //         setTxetMessage(
  //           "まだサインインされていないため認証メールを送信できません",
  //         );
  //       }
  //     });
  // }

  // function sendPasswordReset() {
  //   const emailInput = document.getElementById("email");
  //   const email = emailInput.value;
  //   if (!auth.currentUser) {
  //     setTxetMessage(
  //       "まだサインインされていないためパスワードリセットを送信できません",
  //     );
  //     return;
  //   }
  //   sendPasswordResetEmail(auth, email)
  //     .then(function () {
  //       setTxetMessage("パスワードリセットの送信しました。");
  //     })
  //     .catch(function (error) {
  //       alert("error発生");
  //       console.log(error);
  //     });
  // }

  // Listening for auth state changes.
  //これがデータの取り出し方っぽい？
  // onAuthStateChanged(auth, function (user) {
  //   if (user) {
  //     // User is signed in.
  //     const displayName = user.displayName;
  //     const email = user.email;
  //     const emailVerified = user.emailVerified;
  //     const photoURL = user.photoURL;
  //     const isAnonymous = user.isAnonymous;
  //     const uid = user.uid;
  //     const providerData = user.providerData;
  //   }
  // });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
        }}
      >
        <TextField
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          inputRef={refEmail}
        />
        <TextField
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          inputRef={refPassword}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
        }}
      >
        <button
          id="quickstart-sign-in"
          name="signin"
          data-upgraded=",MaterialButton"
          onClick={toggleSignIn}
        >
          サインイン
        </button>
        {/* <button id="quickstart-sign-in" name="signout" onClick={toggleSignOut}>
          サインアウト
        </button> */}
        <button id="quickstart-sign-up" name="signup" onClick={handleSignUp}>
          サインアップ
        </button>
        {/* <button
          id="quickstart-verify-email"
          name="verify-email"
          onClick={sendVerificationEmailToUser}
        >
          認証メール
        </button>
        <button
          id="quickstart-password-reset"
          name="verify-email"
          onClick={sendPasswordReset}
        >
          パスワードリセット
        </button> */}
      </Box>
      <Box>textMessage:{textMessage}</Box>
      {/* <Box>loginStatus:{loginStatus}</Box> */}
    </Box>
  );
}
