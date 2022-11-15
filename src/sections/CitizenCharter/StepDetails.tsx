// mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// icons
import TimelapseIcon from '@mui/icons-material/Timelapse';
import PaymentsIcon from '@mui/icons-material/Payments';
import PersonIcon from '@mui/icons-material/Person';
import NotesIcon from '@mui/icons-material/Notes';

interface StepDetailsProps {
    fee: number;
    duration: string;
    personnel: string;
    notes: string | null;
}

export default function StepDetails(props: StepDetailsProps) {
    const { fee, duration, personnel, notes } = props;
    return (
        <Stack spacing={2} sx={{ px: 2 }}>
             {notes !== null && (
                <Stack direction="row" spacing={1}>
                    <NotesIcon />
                    <Typography variant="body2">
                        {'Note: '} <i>{notes}</i>
                    </Typography>
                </Stack>
            )}
            <Stack direction="row" spacing={1}>
                <PaymentsIcon />
                <Typography variant="body2">
                    {fee > 0 ? `₱ ${fee.toFixed(2)} Fee` : "No Fee"}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
                <TimelapseIcon />
                <Typography variant="body2">
                    {duration.length > 0 ? `${duration} Process` : "Unspecified Duration"}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
                <PersonIcon />
                <Typography variant="body2">
                    {personnel.length > 0 ? personnel : "No Personnel Assigned"}
                </Typography>
            </Stack>
        </Stack>
    )
}