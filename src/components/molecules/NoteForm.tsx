import {
  Box,
  Stack,
  FormControl,
  FormGroup,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Paper,
  TextField,
  MenuItem,
  Input,
  InputBase,
  FormControlLabel,
  Typography,
  Grid,
  Button,
  Link,
} from "@mui/material";
import CreatableReactSelect from "react-select/creatable";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { NoteData, Tag } from "App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  "&": {
    padding: "20px",
  },
}));

const Row = styled(Box)`
  display: flex;
`;

const NoteForm = ({ onSubmit, onAddTag, availableTags }: NoteFormProps) => {
  const titleref = useRef<HTMLInputElement>(null);
  const markdownref = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    console.log("서브밋");
    e.preventDefault();
    const input = titleref.current?.firstChild as HTMLInputElement;
    onSubmit({
      title: input!.value,
      markdown: markdownref.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  };
  return (
    <Box component={"form"} sx={{ width: "100%", marginY: "20px" }} onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography>Title</Typography>
          <InputBase
            ref={titleref}
            sx={{
              padding: "2px 8px",
              border: "1px solid hsl(0, 0%, 80%)",
              borderRadius: "4px",
              width: "100%",
            }}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Type</Typography>
          <CreatableReactSelect
            required
            isMulti
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label };
              onAddTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
            options={availableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) => {
              console.log(tags);
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }}
          />
          {selectedTags.length == 0 && (
            <input tabIndex={-1} autoComplete="off" style={{ opacity: 0, height: 0 }} required />
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography>Body</Typography>
          <TextField sx={{ width: "100%" }} inputRef={markdownref} multiline rows={15} required />
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginY: "8px" }}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <Link component={RouterLink} to=".." sx={{ textDecoration: "none" }}>
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
                Cancle
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoteForm;
