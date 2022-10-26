import * as React from 'react';
// next
import { useRouter } from 'next/router';
// mui
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
// icons
import { Icon } from '@iconify/react';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import MapIcon from '@mui/icons-material/Map';
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = 400;

const appPaths = [
    {
        label: "Home",
        icon: <HomeIcon />,
        path: '/'
    },
    {
        label: "Citizens' Charter",
        icon: <BookIcon />,
        path: '/charter'
    },
    {
        label: "Accredited Banks",
        icon: <AccountBalanceIcon />,
        path: '/banks'
    },
    {
        label: "Directory and Offices",
        icon: <MapsHomeWorkIcon />,
        path: '/directory'
    },
    {
        label: "Manila Zonal Value",
        icon: <MapIcon />,
        path: '/zone'
    }
]

const DrawerContent = ({ mobile, currentPath, handleClick }: 
    { mobile?: boolean, currentPath: string, handleClick: (path: string) => void }
) => (
    <>
        <List sx={{ my: mobile ? 2 : 8 }}>
            {appPaths.map(path => (
                <ListItem 
                    key={path.label} 
                    disablePadding
                    sx={{
                        color: 'white',
                        ...(currentPath === path.path && {
                            color: 'white',
                            backgroundColor: (theme) => theme.palette.primary.dark,
                        })
                    }}
                >
                    <ListItemButton onClick={() => handleClick(path.path)}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            {path.icon}
                        </ListItemIcon>
                        <ListItemText primary={path.label} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        <Stack
            sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                py: 8
            }}
        >
            <Typography 
                variant="h3" 
                component="h1" 
                color='white'
                sx={{ px: 3 }}
            >
                Bureau of Internal Revenue
            </Typography>
            <Typography 
                variant="h5" 
                color='secondary'
                sx={{ px: 3 }}
            >
                Manila Revenue Region
            </Typography>

            <Stack 
                direction="row" 
                sx={{ 
                    my: 2, 
                    px: 3,
                    py: 2,
                    backgroundColor: (theme) => theme.palette.secondary.light
                }}
            >
                <Tooltip title="Visit Page">
                    <IconButton
                        onClick={() => window.open('https://www.bir.gov.ph/')}
                    >
                        <Avatar 
                            alt='bir-logo'
                            src='/logo/bir_logo.png'
                            sx={{ width: 30, height: 30 }}
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Visit Facebook Page">
                    <IconButton
                        onClick={() => window.open('https://bit.ly/3zdV5CX')}
                    >
                        <Icon 
                            icon='eva:facebook-fill' 
                            color="#1877F2"
                            width={30} 
                            height={30} 
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Answer Survey">
                    <IconButton
                        onClick={() => 
                            window.open('https://bit.ly/3FcykmM')}
                    >
                        <Icon 
                            icon='jam:write-f'
                            width={30} 
                            height={30} 
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="File Complains">
                    <IconButton
                        onClick={() => 
                            window.open('https://bit.ly/3f4BA92')}
                    >
                        <Icon 
                            icon='zondicons:announcement'
                            width={30} 
                            height={30} 
                        />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Stack>
    </>
)

interface MainDrawerProps {
    open: boolean;
    handleToggle: () => void
}

function MainDrawer({ open, handleToggle }: MainDrawerProps) {
    const { pathname, push } = useRouter();

    const handleClickPath = (path: string) => push(path)

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="temporary"
                open={open}
                onClose={handleToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { 
                        boxSizing: 'border-box', 
                        backgroundColor: (theme) => theme.palette.primary.main,
                        width: { xs: '100%', sm: drawerWidth } 
                    },
                }}
            >
                <Stack direction="row" justifyContent="flex-end" sx={{ m: 2 }}>
                    <IconButton onClick={handleToggle}>
                        <CloseIcon fontSize='large' sx={{ color: 'white' }} />
                    </IconButton>
                </Stack>
                <DrawerContent 
                    currentPath={pathname} 
                    handleClick={handleClickPath}
                    mobile 
                />
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { 
                        boxSizing: 'border-box', 
                        backgroundColor: (theme) => theme.palette.primary.main,
                        width: drawerWidth
                    },
                }}
                open
            >
                <DrawerContent 
                    currentPath={pathname} 
                    handleClick={handleClickPath}
                />
            </Drawer>
      </Box>
    )
}

export default MainDrawer