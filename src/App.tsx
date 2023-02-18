import { Container } from "@mui/material";
import Navigate from "components/molecules/Navigate";
import NewNote from "components/templates/NewNote";
import { Routes, Route } from "react-router-dom";
import { useState, useMemo } from "react";
import { useLocalStorage } from "hooks/useLocalStorage";
export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};
export type Tag = {
  id: string;
  label: string;
};

export type RawNote = {
  id: string;
} & RawNNoteData;

export type RawNNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return { ...note, tags: tags.filter((tag) => note.tagIds.includes(tag.id)) };
    });
  }, [notes, tags]);

  return (
    <Container>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/new" element={<NewNote />} />
        <Route path="*" element={<Navigate />} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
