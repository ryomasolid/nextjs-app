"use client";

import { Login_Params } from "@/app/types/login";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState<Login_Params>();
  const [isError, setIsError] = useState<boolean>(false);

  const onChangeEmail = (value: string) => {
    setLoginForm({ ...loginForm, email: value });
  };

  const onChangePassword = (value: string) => {
    setLoginForm({ ...loginForm, password: value });
  };

  const handleLogin = () => {
    setIsError(false)
    if (!loginForm?.email || !loginForm?.password) {
      setIsError(true)
      return;
    }

    // ログイン処理を実行
    router.push("/features/home");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 300,
        margin: "0 auto",
        padding: 4,
        gap: 2,
        mt: 8,
      }}
    >
      <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
        ログイン
      </Typography>
      <TextField
        label="メールアドレス"
        fullWidth
        value={loginForm?.email}
        onChange={(e) => onChangeEmail(e.target.value)}
      />
      <TextField
        label="パスワード"
        type="password"
        fullWidth
        value={loginForm?.password}
        onChange={(e) => onChangePassword(e.target.value)}
      />
      {isError && <Typography color="error" sx={{fontSize: '11px'}}>
        メールアドレスとパスワードを入力してください
      </Typography>}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
      >
        ログイン
      </Button>
    </Box>
  );
}
