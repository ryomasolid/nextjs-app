"use client";

import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ChatgptPage from "./chatgpt";
import GooglePage from "./google";
import HonyakuPage from "./honyaku";

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
          </Tabs>
        </Box>
        <Box sx={{ height: "50vh" }}>
          {currentTab === "1" && <Box>Home</Box>}
          {currentTab === "2" && <GooglePage />}
          {currentTab === "3" && <ChatgptPage />}
          {currentTab === "4" && <HonyakuPage />}
        </Box>
      </Box>
    </>
  );
}
