import { Request, Response } from 'express';
import fs from 'fs';
import { NoteData } from '../types';

// get all notes
export const getAllData = (req: Request, res: Response) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

    try {
      const notesData: NoteData[] = JSON.parse(data);
      res.json(notesData);
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).json({ error: 'Server error' });
    }
  });
};

// get single note by id
export const getSingleNote = (req: Request, res: Response) => {
  const { id } = req.params;

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }

    try {
      const notesData: NoteData[] = JSON.parse(data);
      const note = notesData.find((note) => note.id === id);
      res.json(note);
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).json({ error: 'Server error' });
    }
  });
};

// delete note by id
export const deleteNote = (req: Request, res: Response) => {
  const { id } = req.params;

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      res.send('Server error');
      return res.status(500).json({ error: 'Server error' });
    }

    try {
      const notesData: NoteData[] = JSON.parse(data);
      const updatedNotes = notesData.filter((note) => note.id !== id);
      fs.writeFile('data.json', JSON.stringify(updatedNotes), (writeErr) => {
        if (writeErr) {
          console.log(writeErr);
        }
        res.json(updatedNotes);
      });
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).json({ error: 'Server error' });
    }
  });
};

// post note
export const addNote = async (req: Request, res: Response) => {
  const newNote: NoteData = req.body;
  console.log(req.body);

  try {
    const data = await fs.promises.readFile('data.json', 'utf8');
    const notesData: NoteData[] = JSON.parse(data);
    notesData.push(newNote);
    await fs.promises.writeFile('data.json', JSON.stringify(notesData));
    res.send('Note saved');
  } catch (err) {
    throw err;
  }
};

// edit note
export const editNote = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const updatedNote: NoteData = req.body;
  try {
    const data = await fs.promises.readFile('data.json', 'utf8');
    const noteData: NoteData[] = JSON.parse(data);
    const index = noteData.findIndex((item: any) => item.id === id);

    if (index !== -1) {
      noteData[index] = { ...noteData[index], ...updatedNote };
      await fs.promises.writeFile('data.json', JSON.stringify(noteData));
      res.send('Note is saved');
    }
  } catch (err) {
    res.send('Error');
    throw err;
  }
};
