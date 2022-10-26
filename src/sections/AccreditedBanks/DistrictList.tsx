import * as React from 'react';
// mui
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";
// types
import { RevenueDistrictOffice } from "src/apollo/accredited-banks/types"

const StyledListItemButton = styled(ListItemButton, 
    { shouldForwardProp: (prop) => prop !== 'selected' })<{
        selected?: boolean;
    }>(({ theme, selected }) => ({
        ...(selected && {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
                background: theme.palette.primary.dark
            },
        })
}))

interface DistrictListProps {
    selected: number[],
    onSelect: (rdo: number) => void,
    districtOffices: RevenueDistrictOffice[]
}

function DistrictList({ selected, districtOffices, onSelect }: DistrictListProps) {
  return (
    <List sx={{ p: 2 }}>
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" component="h1">
                Districts
            </Typography>
            <Typography variant="body2">
                Select your revenue district
            </Typography>
        </Box>
        {districtOffices.map(office => (
            <div key={office.rdo_no}>
                <StyledListItemButton 
                    selected={selected.includes(office.rdo_no)}
                    onClick={() => onSelect(office.rdo_no)}
                >
                    <ListItemText 
                        disableTypography
                        primary={
                            <Typography variant="subtitle1">
                                {office.rdo_name}
                            </Typography>
                        }
                        secondary={
                            <Typography variant="body2">
                                {`Revenue District Office ${office.rdo_no}`}
                            </Typography>
                        }
                    />
                </StyledListItemButton>
                <Divider />
            </div>
        ))}
    </List>
  )
}

export default DistrictList