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
import { useState } from "react";
export default function List() {
  const [textMessage, setTxetMessage] = useState("");
  const [loginStatus, setLoginStatus] = useState("ログアウト中");
  const firebaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);

  function toggleSignIn() {
    const emailInput = document.getElementById("email");
    const email = emailInput.value;
    const passwordInput = document.getElementById("password");
    const password = passwordInput.value;
    if (email.length < 4) {
      setTxetMessage("メールアドレスを入力してください");
      alert("メールアドレスを入力してください");
      return;
    }
    if (password.length < 4) {
      setTxetMessage("パスワードを入力してください");
      alert("パスワードを入力してください");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(function () {
        setTxetMessage("サインインに成功しました。");
        setLoginStatus(`${email}でログイン中`);
      })
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          alert("パスワードが間違っています.");
          setTextMessage("パスワードが間違っています");
        } else {
          alert("エラーメッセージ：", errorMessage);
          setTextMessage("サインインに失敗しました");
        }
      });
  }

  function toggleSignOut() {
    if (auth.currentUser) {
      signOut(auth);
      setTxetMessage("サインアウトに成功しました。");
      setLoginStatus("ログアウト中");
    } else {
      setTxetMessage("サインアウトに失敗しました。");
      alert("auth.currentUserがfalseです。サインアウトに失敗");
    }
  }

  function handleSignUp() {
    const emailInput = document.getElementById("email");
    const email = emailInput.value;
    const passwordInput = document.getElementById("password");
    const password = passwordInput.value;
    if (email.length < 4) {
      alert("メアドを入力して：失敗");
      setTxetMessage("必須項目が記入されていません");
      return;
    }
    if (password.length < 4) {
      alert("パスワードを入力してください：失敗");
      setTxetMessage("必須項目が記入されていません");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password).catch(
      function (error) {
        setTxetMessage("既にemailが使われています。");
        alert("エラー");
      },
    );
  }

  function sendVerificationEmailToUser() {
    sendEmailVerification(auth.currentUser)
      .then(function () {
        setTxetMessage("認証のメールを送信しました");
        alert("Email Verification Sent!");
      })
      .catch(function () {
        if (auth.currentUser) {
          setTxetMessage("短期間で複数の認証メールを送ることはできません");
        } else {
          setTxetMessage(
            "まだサインインされていないため認証メールを送信できません",
          );
        }
      });
  }

  function sendPasswordReset() {
    const emailInput = document.getElementById("email");
    const email = emailInput.value;
    if (!auth.currentUser) {
      setTxetMessage(
        "まだサインインされていないためパスワードリセットを送信できません",
      );
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(function () {
        setTxetMessage("パスワードリセットの送信しました。");
      })
      .catch(function (error) {
        alert("error発生");
        console.log(error);
      });
  }

  // Listening for auth state changes.
  //これがデータの取り出し方っぽい？
  onAuthStateChanged(auth, function (user) {
    if (user) {
      // User is signed in.
      const displayName = user.displayName;
      const email = user.email;
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      const providerData = user.providerData;
    }
  });

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
        <TextField type="text" id="email" name="email" placeholder="Email" />
        <TextField
          type="password"
          id="password"
          name="password"
          placeholder="Password"
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
        <button id="quickstart-sign-in" name="signout" onClick={toggleSignOut}>
          サインアウト
        </button>
        <button id="quickstart-sign-up" name="signup" onClick={handleSignUp}>
          サインアップ
        </button>
        <button
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
        </button>
      </Box>
      <Box>textMessage:{textMessage}</Box>
      <Box>loginStatus:{loginStatus}</Box>
    </Box>
  );
}
