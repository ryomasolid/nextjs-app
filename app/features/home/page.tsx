'use client';

import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import HonyakuPage from '../honyaku/page';
import BackupPage from '../backup/page';

export default function HomePage() {
  const [currentTab, setCurrentTab] = useState<string>('1');

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
          </Tabs>
        </Box>
        <Box sx={{ height: '50vh' }}>
          {currentTab === '1' && <Box>Home</Box>}
          {currentTab === '2' && <HonyakuPage />}
          {currentTab === '3' && <BackupPage />}
        </Box>
      </Box>
    </>
  );
}
