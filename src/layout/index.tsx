import * as React from 'react';
// mui
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// project components
import MainDrawer from './MainDrawer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState<boolean>(false);

    const handleToggleDrawer = () => setOpen(!open);

    return (
        <Box 
            component='main' 
            sx={{ marginLeft: { xs: '0px', md: '400px' }, position: 'relative' }}
        >
            <MainDrawer 
                open={open}
                handleToggle={handleToggleDrawer}
            />
            <Box sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                display: { sm: 'flex', md: 'none' }
            }}>
                <IconButton onClick={handleToggleDrawer}>
                    <MenuIcon fontSize='large' color="primary" />
                </IconButton>
            </Box>
            {children}
        </Box>
    )
}
