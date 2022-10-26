import * as React from 'react';
// mui
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
// types
import { AccreditedBanks } from "src/apollo/accredited-banks/types";

interface BankListProps {
    selected: string[],
    accreditedBanks: AccreditedBanks[]
    onPinBank: (bank: AccreditedBanks) => void
}

function BankList({ selected, accreditedBanks, onPinBank }: BankListProps) {
    const [page, setPage] = React.useState<number>(1);
    const results = accreditedBanks.filter(b => selected.includes(b.bank_abbr) || selected.length === 0).length;

    React.useEffect(() => {
        setPage(1)
    }, [accreditedBanks])

    const handlePageChange = (page: number) => {
        setPage(page + 1);
        window.scrollTo(0, 0);
    }
    
    return (
        <>
            <Typography variant="subtitle2" sx={{ mt: 8 }}>
                {`Page ${page} of ${results} ${results > 1 ? 'banks' : 'bank'} found`}
            </Typography>

            <Stack spacing={2} sx={{ my: 2, mr: 2 }}>
                {accreditedBanks
                    .filter(b => selected.includes(b.bank_abbr) || selected.length === 0)
                    .slice((page - 1) * 10, page * 10)
                    .map(bank => (
                        <Card key={bank.bank_no} variant='outlined' sx={{ p: 3, position: 'relative' }}>
                            <Tooltip 
                                title="Pin Bank"
                                sx={{  
                                    position: 'absolute',
                                    top: 10,
                                    right: 10
                                }}
                            >
                                <IconButton onClick={() => onPinBank(bank)}>
                                    <BookmarkAddIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <Avatar 
                                    variant="square"
                                    alt={bank.bank_details.bank_name}
                                    src={bank.bank_details.bank_logo}
                                    sx={{ width: 80, height: 80, objectFit: 'fill' }}
                                />
                                <Stack>
                                    <Typography variant="h5">
                                        {bank.bank_details.bank_name}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {`${bank.bank_branch} Branch | RDO ${bank.rdo_no}`}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mt: 2 }}>
                                        <Typography component="span" variant="subtitle1">
                                            {"Address: "}
                                        </Typography>
                                        {[bank.bldg_no ? bank.bldg_no : '', bank.street, bank.district, bank.city].join(' ')}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Card>
                ))}
            </Stack>

            <Stack 
                direction="row" 
                spacing={2}
                justifyContent="center"
                sx={{ my: 5, mx: 2 }}
            >
                {Array(Math.ceil(results / 10))
                    .fill(0)
                    .map((_, i) => (
                        <Card 
                            key={i}
                            elevation={4}
                            onClick={() => handlePageChange(i)}
                            sx={{ 
                                width: 40, 
                                height: 40, 
                                borderRadius: 20,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                ...(page === (i + 1) && {
                                    border: (theme) => `2px solid ${theme.palette.error.main}`,
                                    color: (theme) => theme.palette.error.main
                                })
                            }}
                        >
                            <Typography variant="button">
                                {i + 1}
                            </Typography>
                        </Card>
                ))}
            </Stack>
        </>
    )
}

export default BankList