'use client';

import { Box, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import HonyakuPage from '../honyaku/page';
import BackupPage from '../backup/page';
import { TimerPage } from '../timer/page';

export default function HomePage() {
  const [currentTab, setCurrentTab] = useState<string>('1');

  // タイマーページ用
  const [time, setTime] = useState(60);
  const [inputTime, setInputTime] = useState('60');
  const [isRunning, setIsRunning] = useState(false);

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

  const handleChange = (e: React.SyntheticEvent, value: string) => {
    setCurrentTab(value);
  };
  return (
    <>
      <Box px="10vw">
        <Box>
          <Tabs value={currentTab} onChange={handleChange} centered>
            <Tab label="Home" value="1" />
            <Tab label="Honyaku" value="2" />
            <Tab label="Backup" value="3" />
            <Tab label="Timer" value="4" />
          </Tabs>
        </Box>
        <Box sx={{ height: '50vh' }}>
          {currentTab === '1' && <Box>Home</Box>}
          {currentTab === '2' && <HonyakuPage />}
          {currentTab === '3' && <BackupPage />}
          {currentTab === '4' && (
            <TimerPage
              time={time}
              inputTime={inputTime}
              isRunning={isRunning}
              setTime={setTime}
              setInputTime={setInputTime}
              setIsRunning={setIsRunning}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
