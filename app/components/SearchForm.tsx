import { useState } from "react";
import { TextField, Box } from "@mui/material";

const SearchForm = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} mt={2}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          onSearch(e.target.value); // Trigger search on every input change
        }}
      />
    </Box>
  );
};

export default SearchForm;
