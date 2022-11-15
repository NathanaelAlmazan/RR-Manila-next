import React from 'react';
// mui
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// types
import { CitizenCharter } from 'src/apollo/citizen-charter/types';
// utils
import { capitalCase } from "change-case";

function FrequentlyAskedQuestions({ charter }: { charter: CitizenCharter }) {
  return (
    <Box sx={{ width: '100%' }}>
        <Typography variant="h5" sx={{ py: 2 }}>
            FAQ
        </Typography>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
            <Typography>What will I need to apply?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {charter.taxpayer_requirements.map((req) => (
                    <Box key={req.taxpayer_name} sx={{ width: '100%', pb: 2 }}>
                        {charter.taxpayer_requirements.length > 1 && (
                            <Typography>
                                <b>{`For ${capitalCase(req.taxpayer_name)}:`}</b>
                            </Typography>
                        )}
                        {req.requirements.map((req, index) => (
                            <Typography key={req.req_name} sx={{ pl: charter.taxpayer_requirements.length > 1 ? 2 : 0 }}>
                                {`${index + 1}. ${req.req_name}`}
                            </Typography>
                        ))}
                    </Box>
                ))}
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography>Where can I apply?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {charter.registries.map((registry) => (
                    <Typography key={registry.classification} sx={{ py: 1 }}>
                        <b><i>{`${capitalCase(registry.classification)} Applicants`}</i></b>
                        {` can register at ${registry.register_office}`}
                    </Typography>
                ))}
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography>How to process my application?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {charter.client_process.map((step, index) => (
                    <Typography key={step.process_step} sx={{ py: 1 }}>
                        {`${index + 1}. ${step.step_desc}`}
                    </Typography>
                ))}
            </AccordionDetails>
        </Accordion>
    </Box>
  )
}

export default FrequentlyAskedQuestions