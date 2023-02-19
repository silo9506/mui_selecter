import { Box, Grid, Typography,Button,InputBase,Link } from "@mui/material"
import { Tag } from "App";
import {Link as RouterLink} from "react-router-dom"
import {useState } from "react"
import ReactSelect from "react-select";

type NoteListProps ={
    availableTags:Tag[]
}

const NoteList =({availableTags}:NoteListProps)=>{
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);


    return<>
    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Typography variant="h4">Notes</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginY: "8px" }}>
            <Link component={RouterLink} to="/new" >
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
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Type</Typography>
          <ReactSelect 
            isMulti
            options={availableTags.map((tag) => {
            return{label:tag.label,value:tag.id}})}
            
            value={selectedTags.map((tag) => {
            return { label: tag.label, value: tag.id };
            })}

            onChange={(tags) => {
                console.log(tags)

            setSelectedTags(
              tags.map((tag) => {
                return { label: tag.label, id: tag.value };
              })
            );
            }}
          />
        </Grid>
        
      </Grid>
    </>
}

export default NoteList