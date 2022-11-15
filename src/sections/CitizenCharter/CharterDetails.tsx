import React from 'react';
// next
import Image from 'next/image';
// mui
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Transaction, OfficeDivision } from "src/apollo/citizen-charter/types";

interface CharterDetailsProps {
    officeDivision: OfficeDivision[];
    transType: Transaction[];
    classification: string;
}

export default function CharterDetails(props: CharterDetailsProps) {
    const { officeDivision, transType, classification } = props;

    return (
        <Stack spacing={2}>
            <Card>
                <CardMedia sx={{ pt: 2, pl: 2 }}>
                    <Image 
                        src="/assets/ic_office.png"
                        alt="office"
                        height={100}
                        width={100}
                    />
                </CardMedia>
                <List>
                    <Typography variant="h6" sx={{ pl: 2 }}>
                        Office / Division
                    </Typography>
                    {officeDivision.map((o, i) => (
                        <div key={i}>
                            <ListItem>
                                <ListItemText 
                                    primary={
                                        <Typography variant="body1">
                                            {o.name}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
            </Card>
            <Card>
                <CardMedia sx={{ pt: 2, pl: 2 }}>
                    <Image 
                        src="/assets/ic_transaction.png"
                        alt="office"
                        height={100}
                        width={100}
                    />
                </CardMedia>
                <List>
                    <Typography variant="h6" sx={{ pl: 2 }}>
                        Office / Division
                    </Typography>
                    {transType.map((o, i) => (
                        <div key={i}>
                            <ListItem>
                                <ListItemText 
                                    primary={
                                        <Typography variant="body1">
                                            {o.name}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <Divider />
                        </div>
                    ))}
                </List>
            </Card>
            <Card>
                <CardMedia sx={{ pt: 2, pl: 2 }}>
                    <Image 
                        src="/assets/ic_classification.png"
                        alt="office"
                        height={100}
                        width={100}
                    />
                </CardMedia>
                <CardContent>
                    <Typography variant="h6">
                        Classification
                    </Typography>
                    <Typography variant="body1">
                        {classification}
                    </Typography>
                </CardContent>
            </Card>
        </Stack>
    )
}