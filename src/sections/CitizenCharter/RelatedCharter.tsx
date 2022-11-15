import React from 'react';
// mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
// icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentsIcon from '@mui/icons-material/Payments';
// types
import { CitizenCharter } from 'src/apollo/citizen-charter/types';

function RelatedCharter({ relatedCharters }: { relatedCharters: CitizenCharter[] }) {
  return (
    <Box sx={{
        mt: 8,
        p: 3,
        backgroundColor: (theme) => theme.palette.grey[200]
    }}>
        <Typography variant="h6">
            Related Charters
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2, mb: 3 }}>
            {relatedCharters.map(charter => (
                <Grid key={charter.title} item sm={12} md={6}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Typography component={Link} href={`/charter/${charter.charter_uid}`} variant="body1" sx={{ fontWeight: 500, cursor: "pointer" }}>
                            {charter.title}
                        </Typography>
                        <Stack direction="row" spacing={{ xs: 0, sm: 2 }} sx={{ mt: 1 }}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <AccessTimeIcon />
                                <Typography variant="caption" sx={{ m: 1 }}>
                                    {`${charter.total_duration} Process`}
                                </Typography>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <PaymentsIcon />
                                <Typography variant="caption" sx={{ m: 1 }}>
                                    {`${charter.total_fee === 0 ? "No": `₱ ${charter.total_fee.toFixed(2)}`} Fee`}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
            ))}
        </Grid>
    </Box>
  )
}

export default RelatedCharter