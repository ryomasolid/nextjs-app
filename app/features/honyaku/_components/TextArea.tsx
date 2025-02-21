import { styled, TextareaAutosize } from "@mui/material";

const TextArea = styled(TextareaAutosize)({
  boxSizing: "border-box",
  fontFamily: "'IBM Plex Sans', sans-serif",
  fontSize: "1rem",
  fontWeight: 400,
  lineHeight: 1.5,
  width: "300px",
  resize: "none",
});

export default TextArea;
