import { Box, Grid, Typography, Button, InputBase, Link } from "@mui/material";
import { Note, Tag } from "App";
import { Link as RouterLink } from "react-router-dom";
import { useState, useMemo } from "react";
import ReactSelect from "react-select";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
};

const NoteList = ({ availableTags, notes }: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filterNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => note.tags.some((noteTag) => noteTag.id === tag.id)))
      );
    });
  }, [title, selectedTags]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4">Notes</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginY: "8px" }}>
          <Link component={RouterLink} to="/new">
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </Link>
          <Button
            variant="contained"
            sx={{
              "&:hover": { backgroundColor: "unset" },
              backgroundColor: "unset",
              color: "hsl(0, 0%, 50%)",
              border: "1px solid hsl(0, 0%, 80%)",
              marginLeft: "8px",
            }}
          >
            Edit Tages
          </Button>
        </Box>
      </Box>
      <Grid container component={"form"} spacing={3}>
        <Grid item xs={6}>
          <Typography component={"label"}>Title</Typography>
          <InputBase
            sx={{
              padding: "2px 8px",
              border: "1px solid hsl(0, 0%, 80%)",
              borderRadius: "4px",
              width: "100%",
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Type</Typography>
          <ReactSelect
            isMulti
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }}
          />
        </Grid>
        <Grid container item spacing={3}>
          {filterNotes.map((note) => (
            <Box key={note.id}>
              {note.id} {note.title}
            </Box>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default NoteList;
