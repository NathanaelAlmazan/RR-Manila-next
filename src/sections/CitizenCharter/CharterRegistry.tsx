import React from 'react';
// mui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// types
import { Registry } from 'src/apollo/citizen-charter/types';

function CharterRegistry({ registries } : { registries: Registry[] }) {
  return (
    <Box>
        <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
            Where to Avail?
        </Typography>
        {registries.length === 1 && (
            <Typography variant="body1">
                {registries[0].register_office}
            </Typography>
        )}
        {registries.length > 1 && (
            <Box>
                {registries.map(r => (
                    <Accordion key={r.classification}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{`For ${r.classification}`}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <i>{r.register_office}</i>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        )}
    </Box>
  )
}



export default CharterRegistry