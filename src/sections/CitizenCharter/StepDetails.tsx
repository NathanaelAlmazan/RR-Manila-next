// mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// icons
import TimelapseIcon from '@mui/icons-material/Timelapse';
import PaymentsIcon from '@mui/icons-material/Payments';
import PersonIcon from '@mui/icons-material/Person';
import NotesIcon from '@mui/icons-material/Notes';

interface StepDetailsProps {
    fee: number | null;
    duration: string | null;
    personnel: string | null;
    notes: string | null;
}

export default function StepDetails(props: StepDetailsProps) {
    const { fee, duration, personnel, notes } = props;
    return (
        <Stack spacing={2} sx={{ px: 2 }}>
            <Stack direction="row" spacing={1}>
                <PaymentsIcon />
                <Typography variant="body2">
                    {fee ? `₱ ${fee.toFixed(2)} Process Fee` : "No Process Fee"}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
                <TimelapseIcon />
                <Typography variant="body2">
                    {duration ? `${duration} Process Time` : "No Process Time"}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
                <PersonIcon />
                <Typography variant="body2">
                    {personnel ? personnel : "No Personnel Assigned"}
                </Typography>
            </Stack>
            {notes !== null && (
                <Stack direction="row" spacing={1}>
                    <NotesIcon />
                    <Typography variant="body2">
                        {notes}
                    </Typography>
                </Stack>
            )}
        </Stack>
    )
}