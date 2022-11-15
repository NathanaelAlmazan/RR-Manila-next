import * as React from 'react';
// mui
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
// icons
import SearchIcon from '@mui/icons-material/Search';
// apollo
import { DocumentNode, useLazyQuery } from "@apollo/client";

interface SearchBarProps {
    placeholder: string,
    onSearchChange: (query: string | null) => void,
    queryDocument: DocumentNode,
    queryObject: string,
    searchQuery?: string
}

function SearchBar(props: SearchBarProps) {
    const { placeholder, queryDocument, queryObject, searchQuery, onSearchChange } = props;
    const [getSuggestions, { loading, data }] = useLazyQuery(queryDocument);
    const [input, setInput] = React.useState<string>("");

    React.useEffect(() => {
        if (searchQuery) setInput(searchQuery);
    }, [searchQuery])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearchChange(input)
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%'}} noValidate>
            <Autocomplete
                freeSolo
                options={data ? data[queryObject] : []}
                loading={loading}
                inputValue={input}
                onInputChange={(event, value) => {
                    if (value.length > 2) {
                        getSuggestions({ variables: { query: value } })
                    }
                    setInput(value)
                }}
                onChange={(event: any, newValue: string | null) => {
                    onSearchChange(newValue);
                }}
                renderInput={(params) => 
                    <TextField 
                        {...params} 
                        variant="outlined"
                        placeholder={placeholder}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment:
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                        }}
                        sx={{
                            backgroundColor: '#FFFFFF'
                        }}
                    />
                }
            />
        </Box>
    )
}

export default SearchBar