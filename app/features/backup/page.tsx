'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  Input,
  Stack,
  Typography,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';

const BUCKET_URL = 'https://nextjs-myapp.s3.us-east-1.amazonaws.com/';

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  // アップロード対象画像
  const [images, setImages] = useState<string[]>([]);
  // アップロード済み画像
  const [imageList, setImageList] = useState<string[]>([]);

  const [open, setOpen] = React.useState(false);
  const [isUpload, setIsUpload] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);

      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
      setOpen(true);
    }
  };

  const handleFileUpload = async () => {
    setIsUpload(false);

    if (!file) {
      alert('画像を選択してください');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/s3', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('アップロード成功');
        setIsUpload(true);
      }
    } catch (error) {
      console.error('エラー:', error);
      alert('アップロード中にエラーが発生しました');
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const fetchImages = async () => {
    const res = await fetch(`/api/s3`);
    const data = await res.json();
    setImageList(data.images || []);
  };

  useEffect(() => {
    fetchImages();
  }, [isUpload]);

  return (
    <>
      <Dialog open={open}>
        <DialogTitle textAlign="center">アップロードコンテンツ一覧</DialogTitle>
        <ImageList cols={5} sx={{ mx: 2 }}>
          {images.map((src, index) => (
            <ImageListItem key={index} sx={{ width: '8vw' }}>
              <Image
                src={src}
                alt={`upload-${index}`}
                loading="lazy"
                width={100}
                height={100}
              />
              <IconButton
                onClick={() => handleDeleteImage(index)}
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ImageListItem>
          ))}
        </ImageList>
        <Stack direction="row" justifyContent="center" columnGap="1vw" mb="1vh">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpen(false)}
          >
            閉じる
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CloudUploadIcon />}
            onClick={handleFileUpload}
          >
            S3へアップロード
          </Button>
        </Stack>
      </Dialog>

      <Box>
        <Typography variant="h6" gutterBottom>
          S3へアップロード
        </Typography>

        <Input
          id="upload-input"
          type="file"
          inputProps={{ accept: 'image/*', multiple: true }}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="upload-input">
          <Button
            variant="contained"
            color="primary"
            component="span"
            startIcon={<UploadFileIcon />}
          >
            画像を選択
          </Button>
        </label>

        <ImageList cols={5} sx={{ mt: 2 }}>
          {imageList.map((imageKey, index) => (
            <ImageListItem
              key={index}
              sx={{ width: '8vw', position: 'relative', height: '100px' }}
            >
              <Image
                src={`${BUCKET_URL}${imageKey}`}
                alt={`upload-${index}`}
                width={100}
                height={100}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
}
