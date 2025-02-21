"use client";

import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ChatgptPage from "../chatgpt/page";
import GooglePage from "../google/page";
import HonyakuPage from "../honyaku/page";
import BackupPage from "../backup/page";

export default function HomePage() {
  const [currentTab, setCurrentTab] = useState<string>("1");

  const handleChange = (e: React.SyntheticEvent, value: string) => {
    setCurrentTab(value);
  };
  return (
    <>
      <Box px="10vw">
        <Box>
          <Tabs value={currentTab} onChange={handleChange} centered>
            <Tab label="Home" value="1" />
            <Tab label="Google" value="2" />
            <Tab label="ChatGPT" value="3" />
            <Tab label="Honyaku" value="4" />
            <Tab label="Backup" value="5" />
          </Tabs>
        </Box>
        <Box sx={{ height: "50vh" }}>
          {currentTab === "1" && <Box>Home</Box>}
          {currentTab === "2" && <GooglePage />}
          {currentTab === "3" && <ChatgptPage />}
          {currentTab === "4" && <HonyakuPage />}
          {currentTab === "5" && <BackupPage />}
        </Box>
      </Box>
    </>
  );
}
