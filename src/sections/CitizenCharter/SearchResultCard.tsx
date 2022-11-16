// mui
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaymentsIcon from '@mui/icons-material/Payments';

import { CitizenCharter } from 'src/apollo/citizen-charter/types';

export default function SearchResultCard({ charter }: { charter: CitizenCharter }) {
    return (
        <Card elevation={3} sx={{ my: 3 }}>
            <CardHeader 
                title={
                    <Typography component={Link} href={`/charter/${charter.charter_uid}`} variant="h6" sx={{ cursor: "pointer" }}>
                        {charter.title}
                    </Typography>
                }
                subheader={
                    <Stack direction="row" spacing={2}>
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
                }
            />
            <CardContent>
                <Typography variant="body2">
                    {`${charter.description.slice(0, 250)}${charter.description.length > 250 ? "..." : ""}`}
                    <Link href={`/charter/${charter.charter_uid}`} sx={{ cursor: "pointer" }}>{' Read More'}</Link>
                </Typography>
            </CardContent>
        </Card>
    )
}