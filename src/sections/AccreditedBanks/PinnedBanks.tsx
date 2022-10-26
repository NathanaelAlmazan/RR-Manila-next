import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// types
import { AccreditedBanks } from "src/apollo/accredited-banks/types"

interface PinnedBanksProps {
    pinned: AccreditedBanks[],
    onUnpinBank: (bank: AccreditedBanks) => void
}

function PinnedBanks({ pinned, onUnpinBank }: PinnedBanksProps) {
    return (
        <List sx={{ p: 2 }}>
            <Typography variant="h6" component="h1" sx={{ p: 2 }}>
                Pinned Banks
            </Typography>
            {pinned.map(bank => (
                <div key={bank.bank_no}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar 
                            variant="square"
                            alt={bank.bank_details.bank_name}
                            src={bank.bank_details.bank_logo}
                        />
                        </ListItemAvatar>
                        <ListItemText
                        primary={bank.bank_details.bank_name}
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {bank.bank_branch}
                            </Typography>
                                {' — ' + [bank.bldg_no ? bank.bldg_no : '', bank.street, bank.district, bank.city].join(' ')}
                            </React.Fragment>
                        }
                        />
                        <Tooltip title='Remove Pin'>
                            <IconButton onClick={() => onUnpinBank(bank)}>
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </ListItem>
                    <Divider />
                </div>
            ))}

            {pinned.length === 0 && (
                <Typography variant="subtitle1" component="h1" sx={{ p: 2 }}>
                    Click the bookmark icon to pin bank.
                </Typography>
            )}
        </List>
    )
}

export default PinnedBanks