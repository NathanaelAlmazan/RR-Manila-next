import React from 'react';
// mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentsIcon from '@mui/icons-material/Payments';

interface CharterHeaderProps {
    title: string;
    description: string;
    processDuration: string;
    processFee: number;
}

function CharterHeader(props: CharterHeaderProps) {
    const { title, description, processDuration, processFee } = props;
    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">
                {'Citizen Charter'}
            </Typography>
            <Typography variant="h4">
                {title}
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0, sm: 2 }} sx={{ mt: 1 }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <AccessTimeIcon />
                    <Typography variant="caption" sx={{ m: 1 }}>
                        {`${processDuration} Process Time`}
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <PaymentsIcon />
                    <Typography variant="caption" sx={{ m: 1 }}>
                        {`${processFee === 0 ? "No": `₱ ${processFee.toFixed(2)}`} Process Fee`}
                    </Typography>
                </Box>
            </Stack>
            <Box component="p">
                {description}
            </Box>
        </Box>
    )
}

export default CharterHeader