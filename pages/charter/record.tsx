import * as React from 'react';
import Router from "next/router";
// mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogTitle from '@mui/material/DialogTitle';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
// icons
import AddIcon from '@mui/icons-material/Add';
import { GetServerSideProps } from 'next';
import {
    GET_OFFICES_DIVISION,
    GET_TRANSACTION_TYPES
} from "src/apollo/citizen-charter/queries";
import {
    CREATE_CITIZEN_CHARTER,
    CREATE_ADDITIONAL,
    CREATE_TAXPAYERS,
    CREATE_AGENT_STEPS,
    CREATE_CLIENT_STEPS
} from "src/apollo/citizen-charter/mutations";
import {
    Transaction,
    OfficeDivision
} from "src/apollo/citizen-charter/types";
import apolloClient from 'src/apollo';
import { useMutation } from '@apollo/client';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};

interface Registries {
    classification: string;
    registerOffice: string;
}

interface Requirements {
    req_name: string;
    req_desc: string;
    notes: string;
    additional: boolean;
}

interface Taxpayer {
    taxpayer_name: string;
    requirements: TaxpayerReq[]
}

interface Additional {
    condition: string;
    requirements: TaxpayerReq[]
}

interface TaxpayerReq {
    req_name: string;
    req_desc: string;
    notes: string;
    additional: boolean;
    sources: Sources[]
}

interface Sources {
    src_name: string;
    src_desc: string | null;
}

interface Charter {
    title: string;
    description: string;
    classification: string;
    total_duration: string;
    total_fee: number;
}

interface CreateCharterResult {
    createCitizenCharter: {
        charter_uid: string;
    }
}

interface ClientProcess {
    charter_uid?: string;
    process_step: number;
    step_desc: string;
    fees: number;
    duration: string;
    notes: string;
    personnel: string;
}

interface AgentProcess {
    process_step: number;
    charter_uid?: string;
    step_desc: string;
    duration: string;
    personnel: string;
}

export default function RecordCharter(
    { officesDivision, transactionType }: 
    { officesDivision: OfficeDivision[], transactionType: Transaction[] }
) {
    const [transactions, setTransactions] = React.useState<string[]>([]);
    const [offices, setOffices] = React.useState<string[]>([]);
    const [registries, setRegistries] = React.useState<Registries[]>([]);
    const [payerType, setPayerType] = React.useState<string>("");
    const [taxpayers, setTaxpayers] = React.useState<string[]>([]);
    const [selected, setSelected] = React.useState<string>("");
    const [open, setOpen] = React.useState<boolean>(false);
    const [payerReq, setPayerReq] = React.useState<Taxpayer[]>([]);
    const [conditions, setConditions] = React.useState<string[]>([]);
    const [addReq, setAddReq] = React.useState<Additional[]>([]);
    const [conditionType, setConditionType] = React.useState<string>("");
    const [selectedCondition, setSelectedCondition] = React.useState<string>("");
    const [addDialog, setAddDialog] = React.useState<boolean>(false);
    const [charterInfo, setCharterInfo] = React.useState<Charter>({
        title: "",
        description: "",
        classification: "",
        total_duration: "",
        total_fee: 0
    })
    const [clientSteps, setClientSteps] = React.useState<ClientProcess>({
        step_desc: "",
        duration: "",
        fees: 0,
        notes: "",
        personnel: "",
        process_step: 1
    })

    const [clientProcess, setClientProcess] = React.useState<ClientProcess[]>([]);

    const [agentSteps, setAgentSteps] = React.useState<AgentProcess>({
        step_desc: "",
        process_step: 1,
        duration: "",
        personnel: ""
    })

    const [agentProcess, setAgentProcess] = React.useState<AgentProcess[]>([]);

    const [createCharter, { data: d1, loading: l1, error: e1 }] = useMutation(CREATE_CITIZEN_CHARTER);
    const [createTaxpayers, { data: d2, loading: l2, error: e2 }] = useMutation(CREATE_TAXPAYERS);
    const [createAdditional, { data: d3, loading: l3, error: e3 }] = useMutation(CREATE_ADDITIONAL);
    const [createClientProcess, { data: d4, loading: l4, error: e4 }] = useMutation(CREATE_CLIENT_STEPS);
    const [createAgentProcess, { data: d5, loading: l5, error: e5 }] = useMutation(CREATE_AGENT_STEPS);

    const handleChangeCharterInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCharterInfo({ ...charterInfo, [e.target.name]: e.target.value });
    }

    const [registry, setRegistry] = React.useState<Registries>({
        classification: '',
        registerOffice: ''
    })

    const handleChangeTransactions = (event: SelectChangeEvent<typeof transactions>) => {
        const {
        target: { value },
        } = event;
        setTransactions(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeOffices = (event: SelectChangeEvent<typeof transactions>) => {
        const {
        target: { value },
        } = event;
        setOffices(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };


    const handleRegistryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegistry({ ...registry, [e.target.name]: e.target.value })
    }

    const handleAddRegistry = () => {
        setRegistries([ ...registries, registry ])
        setRegistry({
            classification: '',
            registerOffice: ''
        })
    }

    const handleAddTaxpayer = () => {
        setTaxpayers([ ...taxpayers, payerType ])
        setPayerType("")
    }

    const handleAddCondition = () => {
        setConditions([ ...conditions, conditionType ])
        setConditionType("")
    }

    const handleSelectTaxpayer = (taxpayer: string) => {
        setSelected(taxpayer);
        setOpen(true)
    }

    const handleSelectCondition = (condition: string) => {
        setSelectedCondition(condition);
        setAddDialog(true)
    }

    const handleAddPayerReq = (taxpayer: string, requirement: TaxpayerReq) => {
        const req = payerReq.find(req => req.taxpayer_name === taxpayer);
        const payer: Taxpayer = {
            taxpayer_name: taxpayer,
            requirements: req ? req.requirements.concat(requirement) : [requirement]
        } 

        if (req) setPayerReq(state => ([ ...state.filter(r => r.taxpayer_name !== taxpayer), payer ]))
        else setPayerReq(state => ([ ...state, payer ]))

        setOpen(false);
    }

    const handleAddAddReq = (condition: string, requirement: TaxpayerReq) => {
        const req = addReq.find(req => req.condition === condition);
        const payer: Additional = {
            condition: condition,
            requirements: req ? req.requirements.concat(requirement) : [requirement]
        } 

        if (req) setAddReq(state => ([ ...state.filter(r => r.condition !== condition), payer ]))
        else setAddReq(state => ([ ...state, payer ]))

        setAddDialog(false);
    }

    const handleClientStepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientSteps({ ...clientSteps, [e.target.name]: e.target.value })
    }

    const handleAddClientProcess = () => {
        setClientProcess(state => [ ...state, clientSteps ])
        setClientSteps({
            step_desc: "",
            duration: "",
            fees: 0,
            notes: "",
            personnel: "",
            process_step: 1
        })
    }

    const handleAgentStepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgentSteps({ ...agentSteps, [e.target.name]: e.target.value })
    }

    const handleAddAgentProcess = () => {
        setAgentProcess(state => [ ...state, agentSteps ])
        setAgentSteps({
            step_desc: "",
            process_step: 1,
            duration: "",
            personnel: ""
        })
    }

    const handleSubmit = async () => {
        try {
            const charter = {
                title: charterInfo.title,
                description: charterInfo.description,
                classification: charterInfo.classification,
                total_duration: charterInfo.total_duration,
                total_fee: parseFloat(charterInfo.total_fee.toString()),
                offices: offices,
                transactions: transactions,
                registries: registries.map(r => ({
                    classification: r.classification,
                    register_office: r.registerOffice
                }))
            }
    
            const result = await createCharter({
                variables: {
                    charter: charter
                }
            })
    
            const data: CreateCharterResult = result.data
    
            const newTaxpayers = payerReq.map(p => ({
                charter_uid: data.createCitizenCharter.charter_uid,
                taxpayer_name: p.taxpayer_name,
                requirements: p.requirements
            }))
    
            for (let i = 0; i < newTaxpayers.length; i++) {
                await createTaxpayers({
                    variables: {
                        taxpayer: newTaxpayers[i]
                    }
                })
            } 
    
            const additionalRequirements = addReq.map(a => ({
                charter_uid: data.createCitizenCharter.charter_uid,
                condition: a.condition,
                requirements: a.requirements
            }))
    
            for (let i = 0; i < additionalRequirements.length; i++) {
                await createAdditional({
                    variables: {
                        req: additionalRequirements[i]
                    }
                })
            } 
    
            await createClientProcess({
                variables: {
                    process: clientProcess.map(c => ({
                        charter_uid: data.createCitizenCharter.charter_uid,
                        process_step: parseFloat(c.process_step.toString()),
                        step_desc: c.step_desc,
                        fees: parseFloat(c.fees.toString()),
                        duration: c.duration,
                        notes: c.notes,
                        personnel: c.personnel
                    }))
                }
            })
    
            await createAgentProcess({
                variables: {
                    process: agentProcess.map(c => ({
                        charter_uid: data.createCitizenCharter.charter_uid,
                        process_step: parseFloat(c.process_step.toString()),
                        step_desc: c.step_desc,
                    }))
                }
            })
            
            Router.reload()
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        if (d3 || d2) {
            console.log(d2);
            console.log(d3);
        }
    }, [d2, d3])

    return (
        <Container>
            <Grid container spacing={2} sx={{ p: 3 }}>
                <Grid item xs={12}>
                    <Typography variant="h3">
                        Record Citizen Charter
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Stack spacing={2}>
                        <TextField 
                            name="title"
                            label="Title"
                            value={charterInfo.title}
                            onChange={handleChangeCharterInfo}
                            fullWidth
                        />
                        <TextField 
                            name="description"
                            label="Description"
                            value={charterInfo.description}
                            onChange={handleChangeCharterInfo}
                            multiline
                            rows={3}
                            fullWidth
                        />
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel>Office Division</InputLabel>
                            <Select
                                multiple
                                value={offices}
                                onChange={handleChangeOffices}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                fullWidth
                            >
                                {officesDivision.map((office) => (
                                    <MenuItem key={office.code} value={office.code}>
                                        <Checkbox checked={offices.indexOf(office.code) > -1} />
                                        <ListItemText primary={office.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel>Transaction Type</InputLabel>
                            <Select
                                multiple
                                value={transactions}
                                onChange={handleChangeTransactions}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                fullWidth
                            >
                                {transactionType.map((type) => (
                                    <MenuItem key={type.type} value={type.type}>
                                        <Checkbox checked={transactions.indexOf(type.type) > -1} />
                                        <ListItemText primary={type.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField 
                            name="classification"
                            label="Classification"
                            value={charterInfo.classification}
                            onChange={handleChangeCharterInfo}
                            fullWidth
                        />
                        <TextField 
                            name="total_duration"
                            label="Total Duration"
                            value={charterInfo.total_duration}
                            onChange={handleChangeCharterInfo}
                            fullWidth
                        />
                        <TextField 
                            name="total_fee"
                            label="Total Fee"
                            type="number"
                            value={charterInfo.total_fee}
                            onChange={handleChangeCharterInfo}
                            fullWidth
                        />

                        <Typography variant="h5" sx={{ my: 2 }}>Where to Apply?</Typography>

                        {registries.map(r => (
                            <Stack key={r.classification} direction="row" spacing={2}>
                                <TextField 
                                    name="classification"
                                    label="Classification"
                                    value={r.classification}
                                    fullWidth
                                />
                                <TextField 
                                    name="registerOffice"
                                    label="Register Office"
                                    value={r.registerOffice}
                                    fullWidth
                                />
                            </Stack>
                        ))}
                        <Stack direction="row" spacing={2}>
                            <TextField 
                                name="classification"
                                label="Classification"
                                value={registry.classification}
                                onChange={handleRegistryChange}
                                fullWidth
                            />
                            <TextField 
                                name="registerOffice"
                                label="Register Office"
                                value={registry.registerOffice}
                                onChange={handleRegistryChange}
                                fullWidth
                            />
                        </Stack>
                        <Button variant='contained' onClick={handleAddRegistry} fullWidth>Add Registry</Button>

                        <Typography variant="h5" sx={{ my: 2 }}>Requirements</Typography>

                        {taxpayers.map(t => (
                            <Stack key={t} spacing={2}>
                                <Stack key={t} direction="row" spacing={2}>
                                    <TextField 
                                        name="taxpayer"
                                        label="Taxpayer Type"
                                        value={t}
                                        fullWidth
                                    />
                                    <IconButton onClick={() => handleSelectTaxpayer(t)}>
                                        <AddIcon />
                                    </IconButton>
                                </Stack>
                                {payerReq.filter(p => p.taxpayer_name === t).map((p, i) => (
                                    <Grid key={i} container spacing={2}>
                                        {p.requirements.map(req => (
                                            <Grid key={req.req_name} item xs={6}>
                                                <Typography>{req.req_name}</Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ))}
                            </Stack>
                        ))}
                        <TextField 
                            name="taxpayer"
                            label="Taxpayer Type"
                            value={payerType}
                            onChange={(e) => setPayerType(e.target.value)}
                            fullWidth
                        />
                        <Button variant='contained' onClick={handleAddTaxpayer} fullWidth>Add Taxpayer</Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Stack spacing={2}>
                        <Typography variant="h5" sx={{ mb: 2 }}>Additional Requirements</Typography>

                        {conditions.map(t => (
                            <Stack key={t} spacing={2}>
                                <Stack key={t} direction="row" spacing={2}>
                                    <TextField 
                                        name="condition"
                                        label="Condition"
                                        value={t}
                                        fullWidth
                                    />
                                    <IconButton onClick={() => handleSelectCondition(t)}>
                                        <AddIcon />
                                    </IconButton>
                                </Stack>
                                {addReq.filter(p => p.condition === t).map((p, i) => (
                                    <Grid key={i} container spacing={2}>
                                        {p.requirements.map(req => (
                                            <Grid key={req.req_name} item xs={6}>
                                                <Typography>{req.req_name}</Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ))}
                            </Stack>
                        ))}
                        <TextField 
                            name="condition"
                            label="Condition"
                            value={conditionType}
                            onChange={(e) => setConditionType(e.target.value)}
                            fullWidth
                        />
                        <Button variant='contained' onClick={handleAddCondition} fullWidth>Add Condition</Button>

                        <Typography variant="h5" sx={{ mb: 2 }}>Client Process</Typography>

                        {clientProcess.map(c => (
                            <Stack key={c.process_step} spacing={2}>
                                <TextField 
                                    name="process_step"
                                    label="Process Step"
                                    value={c.process_step}
                                    fullWidth
                                />
                                <TextField 
                                    name="step_desc"
                                    label="Steps Description"
                                    value={c.step_desc}
                                    multiline
                                    rows={3}
                                    fullWidth
                                />
                                <TextField 
                                    name="notes"
                                    label="Notes"
                                    value={c.notes}
                                    multiline
                                    rows={2}
                                    fullWidth
                                />
                                <TextField 
                                    name="duration"
                                    label="Duration"
                                    value={c.duration}
                                    fullWidth
                                />
                                <TextField 
                                    name="fees"
                                    label="Fees"
                                    value={c.fees}
                                    type="number"
                                    fullWidth
                                />
                                <TextField 
                                    name="personnel"
                                    label="Personnel"
                                    value={c.personnel}
                                    fullWidth
                                />
                            </Stack>
                        ))}

                        <Typography variant="h5" sx={{ mb: 2 }}>Form to Add Client Process</Typography>

                        <Stack spacing={2}>
                            <TextField 
                                name="process_step"
                                label="Process Step"
                                value={clientSteps.process_step}
                                type="number"
                                onChange={handleClientStepsChange}
                                fullWidth
                            />
                           <TextField 
                                name="step_desc"
                                label="Steps Description"
                                value={clientSteps.step_desc}
                                multiline
                                rows={3}
                                onChange={handleClientStepsChange}
                                fullWidth
                            />
                            <TextField 
                                name="notes"
                                label="Notes"
                                value={clientSteps.notes}
                                multiline
                                rows={2}
                                onChange={handleClientStepsChange}
                                fullWidth
                            />
                            <TextField 
                                name="duration"
                                label="Duration"
                                value={clientSteps.duration}
                                onChange={handleClientStepsChange}
                                fullWidth
                            />
                            <TextField 
                                name="fees"
                                label="Fees"
                                value={clientSteps.fees}
                                type="number"
                                onChange={handleClientStepsChange}
                                fullWidth
                            />
                             <TextField 
                                name="personnel"
                                label="Personnel"
                                value={clientSteps.personnel}
                                onChange={handleClientStepsChange}
                                fullWidth
                            />
                            <Button variant='contained' onClick={handleAddClientProcess} fullWidth>Add Client Process</Button>
                        </Stack>

                        <Typography variant="h5" sx={{ mb: 2 }}>Agent Process</Typography>

                        {agentProcess.map(c => (
                            <Stack key={c.process_step} spacing={2}>
                                <TextField 
                                    name="process_step"
                                    label="Process Step"
                                    value={c.process_step}
                                    fullWidth
                                />
                                <TextField 
                                    name="step_desc"
                                    label="Steps Description"
                                    value={c.step_desc}
                                    multiline
                                    rows={3}
                                    fullWidth
                                />
                                <TextField 
                                    name="duration"
                                    label="Duration"
                                    value={c.duration}
                                    fullWidth
                                />
                                <TextField 
                                    name="personnel"
                                    label="Personnel"
                                    value={c.personnel}
                                    fullWidth
                                />
                            </Stack>
                        ))}

                        <Typography variant="h5" sx={{ mb: 2 }}>Form to Add Agent Process</Typography>

                        <Stack spacing={2}>
                            <TextField 
                                name="process_step"
                                label="Process Step"
                                value={agentSteps.process_step}
                                type="number"
                                onChange={handleAgentStepsChange}
                                fullWidth
                            />
                           <TextField 
                                name="step_desc"
                                label="Steps Description"
                                value={agentSteps.step_desc}
                                multiline
                                rows={3}
                                onChange={handleAgentStepsChange}
                                fullWidth
                            />
                            <TextField 
                                name="duration"
                                label="Duration"
                                value={agentSteps.duration}
                                onChange={handleAgentStepsChange}
                                fullWidth
                            />
                            <TextField 
                                name="personnel"
                                label="Personnel"
                                value={agentSteps.personnel}
                                onChange={handleAgentStepsChange}
                                fullWidth
                            />
                            <Button variant='contained' onClick={handleAddAgentProcess} fullWidth>Add Agent Process</Button>
                        </Stack>
                    </Stack>    
                </Grid>
            </Grid>

            <Button fullWidth variant="contained" color="secondary" onClick={handleSubmit} size="large" sx={{ my: 5 }}>Submit Charter</Button>

            <RequirementsDialog 
                name={selected}
                open={open}
                handleClose={() => setOpen(false)}
                addReq={handleAddPayerReq}
            />

            <RequirementsDialog 
                name={selectedCondition}
                open={addDialog}
                handleClose={() => setAddDialog(false)}
                addReq={handleAddAddReq}
                addon
            />
        </Container>
    )
}

function RequirementsDialog({ name, open, addon, handleClose, addReq }: 
    { name: string, open: boolean, handleClose: () => void, addon?: boolean, addReq: (taxpayer: string, requirement: TaxpayerReq) => void }
) {
    const [requirements, setRequirements] = React.useState<Requirements>({
        req_name: "",
        req_desc: "",
        notes: "",
        additional: false
    })
    const [source, setSource] = React.useState<Sources>({
        src_name: "",
        src_desc: ""
    })
    const [sources, setSources] = React.useState<Sources[]>([]);

    const { req_name, req_desc, notes, additional } = requirements;

    const handleRequirementsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRequirements({ ...requirements, [e.target.name]: e.target.value })
    }

    const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSource({ ...source, [e.target.name]: e.target.value })
    }

    const handleAddSources = () => {
        setSources([ ...sources, source ])
        setSource({
            src_name: "",
            src_desc: ""
        })
    }

    const handleAddReq = () => {
        const requirement: TaxpayerReq = {
            req_name: req_name,
            req_desc: req_desc,
            notes: notes,
            additional: addon ? true : additional,
            sources: sources
        }
        addReq(name, requirement);
        setRequirements({
            req_name: "",
            req_desc: "",
            notes: "",
            additional: false
        })
        setSources([])
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{addon ? "Additional Requirements" : "Requirements"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                {`Add Requirements to ${name}`}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    name="req_name"
                    value={req_name}
                    onChange={handleRequirementsChange}
                    label="Name"
                    fullWidth
                    variant="standard"
                />
               <TextField
                    autoFocus
                    margin="dense"
                    name="req_desc"
                    value={req_desc}
                    onChange={handleRequirementsChange}
                    multiline
                    rows={3}
                    label="Description"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="notes"
                    value={notes}
                    onChange={handleRequirementsChange}
                    label="Notes"
                    fullWidth
                    variant="standard"
                />

                {!addon && (
                    <FormControlLabel control={
                        <Checkbox 
                            checked={additional} 
                            onChange={() => setRequirements({ ...requirements, additional: !additional })} 
                        />} label="Additional" />
                )}

                <Typography variant="h5" sx={{ my: 2 }}>Sources</Typography>

                <Stack spacing={2}>
                    {sources.map(r => (
                        <Stack key={r.src_name} direction="row" spacing={2}>
                            <TextField 
                                name="classification"
                                label="Source Name"
                                value={r.src_name}
                                fullWidth
                            />
                            <TextField 
                                name="registerOffice"
                                label="Source Description"
                                value={r.src_desc}
                                fullWidth
                            />
                        </Stack>
                        ))}
                        <Stack direction="row" spacing={2}>
                            <TextField 
                                name="src_name"
                                label="Source Name"
                                value={source.src_name}
                                onChange={handleSourceChange}
                                fullWidth
                            />
                            <TextField 
                                name="src_desc"
                                label="Source Description"
                                value={source.src_desc}
                                onChange={handleSourceChange}
                                fullWidth
                            />
                        </Stack>
                        <Button variant='contained' onClick={handleAddSources} fullWidth>Add Source</Button>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddReq}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { data: { officesDivision } } = await apolloClient.query({
        query: GET_OFFICES_DIVISION,
    });

    const { data: { transactions } } = await apolloClient.query({
        query: GET_TRANSACTION_TYPES,
    });

    return {
        props: {
            transactionType: transactions, 
            officesDivision: officesDivision
        }
    }
}
