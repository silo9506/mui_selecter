import { Box, Typography } from "@mui/material";
import { NoteData, Tag } from "App";
import NoteForm from "components/molecules/NoteForm";
 
type NewNoteProps ={
  onSubmit :(data:NoteData)=>void,
  onAddTag:(tag:Tag)=>void;
  availableTags:Tag[]
}
const NewNote = ({onSubmit,onAddTag,availableTags}:NewNoteProps) => {
  return (
    <Box >
      <Typography  variant="h4" sx={{}} >NewNote</Typography>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </Box>
  );
};

export default NewNote;
