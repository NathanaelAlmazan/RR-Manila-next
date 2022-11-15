import React from 'react';
// mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
// icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// types
import {
    TaxpayerRequirements,
    AdditionalRequirement,
    Requirement,
    Sources
} from 'src/apollo/citizen-charter/types';
// utils
import { capitalCase } from 'change-case';

interface RequirementsProps {
    taxpayers: TaxpayerRequirements[];
    additional: AdditionalRequirement[]
}

export default function ChecklistOfRequirements(props: RequirementsProps) {
    const { taxpayers, additional } = props;
    return (
        <Box>
            <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
                Checklist of Requirements
            </Typography>
            <Stack spacing={2} sx={{ mr: 2 }}>
                {taxpayers.map(taxpayer => (
                    <TaxpayerRequirementCard
                        key={taxpayer.taxpayer_name}
                        requirements={taxpayer}
                    />
                ))}
            </Stack>
           {additional.length > 0 && (
            <>
                <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
                    Additional Checklist of Requirements
                </Typography>
                <Stack spacing={2} sx={{ mr: 2 }}>
                    {additional.map(req => (
                        <AdditionalRequirementCard
                            key={req.condition}
                            requirements={req}
                        />
                    ))}
                </Stack>
            </>
           )}
        </Box>
    )
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
        })(({ theme, expand }) => ({
            transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
}));

interface TaxpayerRequirementCardProps {
    requirements: TaxpayerRequirements
}

export function TaxpayerRequirementCard(props: TaxpayerRequirementCardProps) {
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const { requirements } = props

    const handleExpandClick = () => setExpanded(!expanded);

    return (
        <Card elevation={3}>
            <CardHeader 
                title={
                    <Typography variant="subtitle1">
                        {`For ${capitalCase(requirements.taxpayer_name)}`}
                    </Typography>
                }
                action={
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                }
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <List sx={{ width: '100%'  }}>
                    {requirements.requirements.filter(r => !r.additional).map(req => (
                        <RequirementListItem key={req.req_name} requirement={req} />    
                    ))}
                </List>
                {requirements.requirements.filter(req => req.additional).length > 0 && (
                    <List sx={{ width: '100%'  }}>
                        <Typography variant="subtitle2" sx={{ mx: 3 }}>
                            Additional Requirements
                        </Typography>

                        {requirements.requirements.filter(r => r.additional).map(req => (
                            <RequirementListItem key={req.req_name} requirement={req} />
                        ))}
                    </List>
                )}
            </Collapse>
        </Card>
    )
}

interface AdditionalRequirementCardProps {
    requirements: AdditionalRequirement
}

export function AdditionalRequirementCard(props: AdditionalRequirementCardProps) {
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const { requirements } = props

    const handleExpandClick = () => setExpanded(!expanded);

    return (
        <Card elevation={3}>
            <CardHeader 
                title={
                    <Typography variant="subtitle1">
                        {requirements.condition}
                    </Typography>
                }
                action={
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                }
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <List sx={{ width: '100%'  }}>
                    {requirements.requirements.map(req => (
                        <RequirementListItem key={req.req_name} requirement={req} />    
                    ))}
                </List>
            </Collapse>
        </Card>
    )
}

export function RequirementListItem({ requirement }: { requirement: Requirement }) {
    const [expand, setExpand] = React.useState<boolean>(false);

    const handleExpand = () => setExpand(!expand);

    const formatSources = (sources: Sources[]) => {
        const length = sources.length - 1
        const sourcesDesc = sources.map((s, i) =>
            `${i === length && length > 0 ? 'or at ' : ''}${s.src_name} ${s.src_desc ? ` (${s.src_desc})` : ''}${i === length ? '.' : ';'}`
        )
        return `You can secure this requirement through ${sourcesDesc.join(' ')}`
    }

    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Checkbox />
                </ListItemAvatar>
                <Stack>
                    <ListItemText
                        primary={requirement.req_name}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {requirement.req_desc}
                                </Typography>
                                {" — "} 
                                <Link 
                                    onClick={handleExpand}
                                    sx={{ cursor: "pointer" }}
                                >
                                    {expand ? "See Less..." : "See More..."}
                                </Link>
                            </React.Fragment>
                        }
                    />
                    <Collapse in={expand} timeout="auto" unmountOnExit>
                        <Typography component="p" variant="body2">
                            {formatSources(requirement.sources)}
                        </Typography>
                    </Collapse>
                </Stack>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
}