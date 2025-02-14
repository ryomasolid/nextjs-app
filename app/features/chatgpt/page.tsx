"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function ChatgptPage() {
  const [question, setQuestion] = useState<string>("");

  const handleClick = () => {
    console.log("test");
  };

  return (
    <>
      <Typography>ChatGPT</Typography>
      {/* <iframe width="100%" height="100%"></iframe> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "2vh",
          mt: "3vh",
        }}
      >
        <Typography>質問を入力してください</Typography>
        <TextField
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        ></TextField>
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          sx={{ px: "3vw" }}
        >
          送信
        </Button>
      </Box>
    </>
  );
}
