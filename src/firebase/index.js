const { initializeApp } = require("firebase/app");
const {
  //   connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");

const { firebaseConfig } = require("./config");

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

async function toggleSignIn(InputEmail, InputPassword) {
  const email = InputEmail;
  const password = InputPassword;

  let message;
  let ok;

  await signInWithEmailAndPassword(auth, email, password)
    .then(function () {
      message = "サインインに成功しました。";
      ok = true;
    })
    .catch(function (error) {
      const errorCode = error.code;
      if (errorCode === "auth/wrong-password") {
        message = "パスワードが間違っています";
        ok = false;
      } else {
        message = "サインインに失敗しました";
        ok = false;
      }
    });
  return { message, ok };
}

async function handleSignUp(InputEmail, InputPassword) {
  const email = InputEmail;
  const password = InputPassword;
  let message = "サインアップ完了しました　サインインしてください";
  let ok = true;

  await createUserWithEmailAndPassword(auth, email, password).catch(
    function (error) {
      message = "既にemailが使われています。";
      ok = false;
    },
  );
  return { message, ok };
}

function toggleSignOut() {
  console.log(auth);
  // if (auth.currentUser) {
  //   signOut(auth);
  //   console.log("サインアウトに成功しました。");
  //   console.log("ログアウト中");
  // } else {
  //   console.log("サインアウトに失敗しました。");
  // }
}

function sendVerificationEmailToUser() {
  sendEmailVerification(auth.currentUser)
    .then(function () {
      console.log("認証のメールを送信しました");
    })
    .catch(function () {
      if (auth.currentUser) {
        console.log("短期間で複数の認証メールを送ることはできません");
      } else {
        console.log("まだサインインされていないため認証メールを送信できません");
      }
    });
}

function sendPasswordReset(InputEmail) {
  const email = InputEmail;
  if (!auth.currentUser) {
    console.log(
      "まだサインインされていないためパスワードリセットを送信できません",
    );
    return;
  }
  sendPasswordResetEmail(auth, email)
    .then(function () {
      console.log("パスワードリセットの送信しました。");
    })
    .catch(function (error) {
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

module.exports = {
  toggleSignIn,
  toggleSignOut,
  handleSignUp,
  sendVerificationEmailToUser,
  onAuthStateChanged,
};
