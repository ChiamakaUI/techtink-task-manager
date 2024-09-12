import { ListItem, IconButton, ListItemText } from "@mui/material";
import { Undo } from "@mui/icons-material";

const SearchItem = ({ task, onUndo }) => {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" color="info" onClick={() => onUndo(task.id)}>
            <Undo />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={task.text}
        secondary={`Completed at: ${task.completedAt || "N/A"}`}
      />
    </ListItem>
  );
};

export default SearchItem;
