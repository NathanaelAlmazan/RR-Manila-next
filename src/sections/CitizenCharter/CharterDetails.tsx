// next
import Image from 'next/image';
// mui
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Transaction, OfficeDivision, Registry } from "src/apollo/citizen-charter/types";

interface CharterDetailsProps {
    officeDivision: OfficeDivision[];
    transType: Transaction[];
    classification: string;
    registries: Registry[];
}

export default function CharterDetails(props: CharterDetailsProps) {
    const { officeDivision, transType, classification, registries } = props;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems={officeDivision.length > 1 ? "flex-start" : "center"} justifyContent="space-between">
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Image 
                            src="/assets/ic_office.png"
                            alt="office"
                            height={100}
                            width={100}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="subtitle2">Office / Division</Typography>
                        {officeDivision.map((o, i) => (
                            <Typography key={i} variant="body1" sx={{ mb: 2 }}>
                                {`${officeDivision.length > 1 ? i + 1 : ''} ${o.name}`}
                            </Typography>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems={transType.length > 1 ? "flex-start" : "center"} justifyContent="space-between">
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Image 
                            src="/assets/ic_transaction.png"
                            alt="office"
                            height={100}
                            width={100}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="subtitle2">Transaction Type</Typography>
                        {transType.map((o, i) => (
                            <Typography key={i} variant="body1" sx={{ mb: 2 }}>
                                {`${transType.length > 1 ? i + 1 : ''} ${o.name}`}
                            </Typography>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Image 
                            src="/assets/ic_classification.png"
                            alt="office"
                            height={100}
                            width={100}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="subtitle2">Classification</Typography>
                        <Typography variant="body1">
                            {classification}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems={registries.length > 1 ? "flex-start" : "center"} justifyContent="space-between">
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Image 
                            src="/assets/ic_location.png"
                            alt="office"
                            height={100}
                            width={100}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="subtitle2">Register Location</Typography>
                        {registries.map((o, i) => (
                            <Typography key={i} variant="body1" sx={{ mb: 2 }}>
                                {`${registries.length > 1 ? `${i + 1}.` : ''} ${o.register_office} — (${o.classification} Applicants)`}
                            </Typography>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}