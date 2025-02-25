'use client';

import {
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Note {
  id: number;
  content: string;
}

export default function MemoPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addNote = () => {
    if (inputValue.trim() === '') return;
    const newNote: Note = {
      id: Date.now(),
      content: inputValue,
    };
    setNotes([newNote, ...notes]);
    setInputValue('');
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <Stack spacing={2} direction="row">
        <TextField
          label="メモを入力"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={addNote}>
          追加
        </Button>
      </Stack>
      <div style={{ marginTop: '20px' }}>
        {notes.map((note) => (
          <Card key={note.id} style={{ marginBottom: '10px' }}>
            <CardContent
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="body1">{note.content}</Typography>
              <IconButton onClick={() => deleteNote(note.id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
