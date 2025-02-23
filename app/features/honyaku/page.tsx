'use client';

import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import TextArea from './_components/TextArea';

export default function HonyakuPage() {
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [comment1, setComment1] = useState<string>('');
  const [comment2, setComment2] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    setIsChanged(!isChanged);
  };

  const handleChangeComment1 = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment1(event.target.value);
  };

  const translateText = async (text: string) => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          sourceLang: isChanged ? 'ja' : 'en',
          targetLang: isChanged ? 'en' : 'ja',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Translation error');
      }
      setComment2(data.translatedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  useEffect(() => {
    if (comment1) {
      translateText(comment1);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [comment1]);

  return (
    <Box>
      <Typography>{error}</Typography>

      <Box
        display="flex"
        justifyContent="center"
        columnGap="2vw"
        alignItems="center"
        mt="3vh"
      >
        <Box display="flex" flexDirection="column" rowGap="2vh">
          <Select value={'1'} disabled sx={{ width: '15.5vw', height: '5vh' }}>
            <MenuItem value={1}>{isChanged ? '日本語' : '英語'}</MenuItem>
          </Select>
          <TextArea
            value={comment1}
            onChange={handleChangeComment1}
            sx={{ height: '30vh !important' }}
          />
        </Box>
        <Box display="flex" flexDirection="column">
          <AutorenewIcon onClick={handleClick} />
        </Box>
        <Box display="flex" flexDirection="column" rowGap="2vh">
          <Select value={'1'} disabled sx={{ width: '15.5vw', height: '5vh' }}>
            <MenuItem value={1}>{isChanged ? '英語' : '日本語'}</MenuItem>
          </Select>
          <TextArea
            value={comment2}
            disabled
            sx={{ height: '30vh !important' }}
          />
        </Box>
      </Box>
    </Box>
  );
}
