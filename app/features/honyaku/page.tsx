"use client";

import {
  TranslateClient,
  TranslateTextCommand,
} from "@aws-sdk/client-translate";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import TextArea from "./_components/TextArea";

export default function HonyakuPage() {
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const [comment1, setComment1] = useState<string>("");
  const [comment2, setComment2] = useState<string>("");

  const handleClick = () => {
    setIsChanged(!isChanged);
  };

  const handleChangeComment1 = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment1(event.target.value);
  };

  const translateClient = new TranslateClient({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
    },
  });
  const translateText = async (
    _key: string,
    { arg }: { arg: { text: string } }
  ) => {
    const command = new TranslateTextCommand({
      Text: arg.text,
      SourceLanguageCode: isChanged ? "ja" : "en",
      TargetLanguageCode: isChanged ? "en" : "ja",
    });

    const response = await translateClient.send(command);
    return response.TranslatedText;
  };
  const { trigger, data, error, isMutating } = useSWRMutation(
    "translate",
    translateText
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    setComment2(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!comment1) {
      return;
    }

    trigger({ text: comment1 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment1]);

  return (
    <>
      {isMutating && <CircularProgress />}

      <Box>
        <Typography>{isMutating ? "翻訳中..." : "翻訳"}</Typography>
        <Typography>{error && error.message}</Typography>

        <Box
          display="flex"
          justifyContent="center"
          columnGap="2vw"
          alignItems="center"
          mt="3vh"
        >
          <Box display="flex" flexDirection="column" rowGap="2vh">
            <Select value={"1"} sx={{ width: "15vw", height: "8vh" }}>
              <MenuItem value={1}>{isChanged ? "日本語" : "英語"}</MenuItem>
            </Select>
            <TextArea
              value={comment1}
              onChange={handleChangeComment1}
              sx={{ height: "30vh !important" }}
            />
          </Box>
          <Box display="flex" flexDirection="column">
            <AutorenewIcon onClick={handleClick} />
          </Box>
          <Box display="flex" flexDirection="column" rowGap="2vh">
            <Select value={"1"} sx={{ width: "15vw", height: "8vh" }}>
              <MenuItem value={1}>{isChanged ? "英語" : "日本語"}</MenuItem>
            </Select>
            <TextArea
              value={comment2}
              disabled
              sx={{ height: "30vh !important" }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
