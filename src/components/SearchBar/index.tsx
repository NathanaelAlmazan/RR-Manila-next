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
import { useLazyQuery } from "@apollo/client";
import { BANK_ADDRESSES } from "src/apollo/accredited-banks/queries";

interface SearchBarProps {
    placeholder: string,
    onSearchChange: (query: string | null) => void
}

function SearchBar(props: SearchBarProps) {
    const { placeholder, onSearchChange } = props;
    const [getSuggestions, { loading, data: addresses }] = useLazyQuery(BANK_ADDRESSES);

    return (
        <Box sx={{ p: 3 }}>
            <Autocomplete
                freeSolo
                options={addresses ? addresses.bankAddresses : []}
                loading={loading}
                onInputChange={(event, value) => {
                    if (value.length > 3) {
                        getSuggestions({ variables: { query: value } })
                    }
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