import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Paper from '@mui/material/Paper';
import MobileStepper from '@mui/material/MobileStepper';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
// project components
import AgentActions from './AgentActions';
import StepDetails from './StepDetails';
// icons
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { AgentProcess, ClientProcess } from 'src/apollo/citizen-charter/types';

interface AvailingProcessProps {
    clientProcess: ClientProcess[];
    agentProcess: AgentProcess[];
}

export default function AvailingProcess(props: AvailingProcessProps) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const { clientProcess, agentProcess } = props;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const agentActions = (step: number) => {
    return agentProcess.filter(p => p.process_step >= step && p.process_step < (step + 1))
  }

  return (
    <Box>
        <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
            Application Process
        </Typography>
        <Stepper 
            activeStep={activeStep} 
            orientation="vertical" 
            sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
            {clientProcess.map((step, index) => (
                <Step key={step.process_step}>
                    <StepLabel>
                        <Typography variant="subtitle1" sx={{ p: 1 }}>
                            {step.step_desc}
                        </Typography>
                    </StepLabel>
                    <StepContent>
                        <StepDetails 
                            fee={step.fees}
                            duration={step.duration}
                            personnel={step.personnel}
                            notes={step.notes}
                        />
                        {agentActions(step.process_step).length > 0 && (
                            <AgentActions agentActions={agentActions(step.process_step)} />
                        )}
                        <Box sx={{ my: 2, p: 1 }}>
                            <div>
                                <Button
                                    variant="contained"
                                    onClick={activeStep === (clientProcess.length - 1) ? handleReset : handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    {index === clientProcess.length - 1 ? 'Reset' : 'Continue'}
                                </Button>
                                <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                            </div>
                        </Box>
                    </StepContent>
                </Step>
            ))}
        </Stepper>
        {clientProcess.length > 0 && (
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileStepper
                    variant="progress"
                    steps={clientProcess.length}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === clientProcess.length - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                    }
                    backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                    }
                />
                <Paper
                    square
                    elevation={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 50,
                        bgcolor: 'background.default',
                    }}
                >
                    <Typography variant="subtitle2">{`Step ${activeStep + 1}`}</Typography>
                </Paper>
                <Box sx={{ maxWidth: 400, width: '100%', overflowY: 'auto' }}>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        {clientProcess[activeStep].step_desc}
                    </Typography>
                    <StepDetails 
                        fee={clientProcess[activeStep].fees}
                        duration={clientProcess[activeStep].duration}
                        personnel={clientProcess[activeStep].personnel}
                        notes={clientProcess[activeStep].notes}
                    />
                    {agentActions(clientProcess[activeStep].process_step).length > 0 && (
                        <AgentActions agentActions={agentActions(clientProcess[activeStep].process_step)} />
                    )}
                </Box>
            </Box>
        )}
    </Box>
  );
}