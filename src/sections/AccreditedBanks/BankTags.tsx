import * as React from 'react';
// mui
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const StyledTags = styled(Card,
    { shouldForwardProp: (prop) => prop !== 'selected' })<{
        selected?: boolean;
    }>(({ theme, selected }) => ({
        padding: 8,
        cursor: "pointer",
        color: theme.palette.grey[700],
        ...(selected && {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main
        })
}))

interface BankTagsProps {
    banks: string[],
    selected: string[],
    onSelect: (tag: string) => void
}

function BankTags({ banks, selected, onSelect }: BankTagsProps) {
    return (
        <Grid container spacing={1} sx={{ p: 3 }}>
            <Grid item xs={12} sx={{ py: 2 }}>
                <Typography variant="h6" component="h1">
                    Available Banks
                </Typography>
                <Typography variant="body2">
                    Select tags to filter results
                </Typography>
            </Grid>
            {banks.map(bankName => (
                <Grid item key={bankName}>
                    <StyledTags 
                        variant='outlined'
                        selected={selected.includes(bankName)}
                        onClick={() => onSelect(bankName)}
                    >
                        <Typography align="center" variant="subtitle1">
                            {bankName}
                        </Typography>
                    </StyledTags>
                </Grid>
            ))}
        </Grid>
    )
}

export default BankTags