import * as React from 'react';
// mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// icons
// icons
import TimelapseIcon from '@mui/icons-material/Timelapse';
import PaymentsIcon from '@mui/icons-material/Payments';
import PersonIcon from '@mui/icons-material/Person';
import NotesIcon from '@mui/icons-material/Notes';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AgentProcess } from 'src/apollo/citizen-charter/types';

interface AgentActionsProps {
    agentActions: AgentProcess[];
}

export default function AgentActions(props: AgentActionsProps) {
    const { agentActions } = props;

    return (
        <Box sx={{ my: 2 }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={
                        <ExpandMoreIcon sx={{ color: (theme) => theme.palette.primary.dark }} />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                        backgroundColor: (theme) => theme.palette.secondary.light
                    }}
                >
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            color: (theme) => theme.palette.primary.dark 
                        }}
                    >
                        See Agent Actions
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        {agentActions.map((g, index) => (
                            <div key={g.process_step}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar 
                                            sx={{ 
                                                backgroundColor: (theme) => theme.palette.primary.main 
                                            }}
                                        >
                                            {index + 1}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <Stack>
                                        <ListItemText 
                                            primary={
                                                <Typography variant="subtitle1" alignItems="center">
                                                    {g.step_desc}
                                                </Typography>
                                            }
                                        />
                                        {g.duration !== null && g.personnel !== null && 
                                            g.duration.toLowerCase() !== 'none' && g.personnel.toLowerCase() !== 'none' && (
                                            <AgentStepDetails 
                                                duration={g.duration}
                                                personnel={g.personnel}
                                            />
                                        )}
                                    </Stack>
                                </ListItem>
                                <Divider />
                            </div>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export function AgentStepDetails(
    { duration, personnel }: { duration: string, personnel: string }
) {
    return (
        <Stack spacing={2} direction="column" sx={{ mt: 1 }}>
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
        </Stack>
    )
}