'use client';

import { Button, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function TimerPage() {
  const [time, setTime] = useState(60);
  const [inputTime, setInputTime] = useState('60');
  const [isRunning, setIsRunning] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTime(event.target.value.replace(/\D/g, ''));
  };

  const setTimer = () => {
    const parsedTime = parseInt(inputTime, 10);
    if (!isNaN(parsedTime) && parsedTime > 0) {
      setTime(parsedTime);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    setTime(60);
    setInputTime('60');
    setIsRunning(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    }

    if (time === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);

    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isRunning, time]);

  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h3">{time} 秒</Typography>
      <TextField
        label="タイマー設定 (秒)"
        value={inputTime}
        onChange={handleInputChange}
        type="text"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        disabled={isRunning}
      />
      <Button variant="outlined" onClick={setTimer} disabled={isRunning}>
        時間を設定
      </Button>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
        >
          スタート
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
        >
          ストップ
        </Button>
        <Button variant="outlined" onClick={resetTimer}>
          リセット
        </Button>
      </Stack>
    </Stack>
  );
}
