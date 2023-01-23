import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    RampLeftOutlined,
    PodcastsOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlineOutlined, ReceiptLongOutlined, PublicOutlined
} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from '../assets/profileImage.jpeg';

interface IProps {
    user: any
    isSidebarOpen: boolean,
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}

const navItems = [
    {
        text: 'Dashboard',
        icon: <HomeOutlined/>
    },
    {
        text: 'Client Facing',
        icon: null
    },
    {
        text: 'Products',
        icon: <ShoppingCartOutlined/>
    },
    {
        text: 'Customers',
        icon: <Groups2Outlined/>
    },
    {
        text: 'Transactions',
        icon: <ReceiptLongOutlined/>
    },
    {
        text: 'Sales',
        icon: null
    },
]

const Sidebar = ({isSidebarOpen, setIsSidebarOpen, user}: IProps) => {
    const {pathname} = useLocation();
    const [active, setActive] = useState('');
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname])

    return (
        <Box component='nav' className=''>
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant='persistent'
                    anchor='left'
                    sx={{
                        width: '250px', '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            // @ts-ignore
                            color: theme.palette.secondary[200],
                            // @ts-ignore
                            backgroundColor: theme.palette.background.alt,
                            borderWidth: 0
                        }
                    }}
                >
                    <Box className='w-full'>
                        <Box className='my-6 mx-8'>
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box className='flex items-center gap-2'>
                                    <Typography variant='h4' fontWeight='bold'>
                                        Ecom-Vision
                                    </Typography>
                                </Box>
                                <div className='block md:hidden'>
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft/>
                                    </IconButton>
                                </div>
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({text, icon}) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{m: '1.5rem 0 0.5rem 2rem'}}>
                                            {text}
                                        </Typography>
                                    )
                                }
                                const tl = text.toLowerCase();
                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${tl}`);
                                                setActive(tl)
                                            }}
                                            sx={{
                                                pl: '2rem',
                                                mr: '1rem',
                                                pr: '1rem',
                                                // @ts-ignore
                                                backgroundColor: active === tl ? theme.palette.secondary[300] : 'transparent',
                                                // @ts-ignore
                                                color: active === tl ? theme.palette.primary[600] : theme.palette.secondary[100]
                                            }}
                                        >
                                            <ListItemIcon sx={{
                                                // @ts-ignore
                                                color: active === tl ? theme.palette.primary[600] : theme.palette.secondary[200]
                                            }}>
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text}/>
                                            {active === tl && (
                                                <ChevronRightOutlined sx={{ml: 'auto'}}/>
                                            )}
                                        </ListItemButton>
                                    </ListItem>

                                )
                            })}
                        </List>
                    </Box>
                    <Box >
                        <Divider/>
                        <FlexBetween textTransform='none' gap='1rem' m='1.5rem 2rem 1rem 2rem'>
                            <Box component='img' alt='profile' src={profileImage} height='40px' width='40px'
                                 borderRadius='50%' sx={{objectFit:'cover'}}/>
                                <Box textAlign='left'>
                                    {/*@ts-ignore*/}
                                    <Typography fontWeight='bold' fontSize='0.9rem' sx={{color:theme.palette.secondary[100]}}>
                                        {user.name}
                                    </Typography>
                                    {/*@ts-ignore*/}
                                    <Typography fontWeight='bold' fontSize='0.8rem' sx={{color:theme.palette.secondary[200]}}>
                                        {user.occupation}
                                    </Typography>
                                </Box>
                                {/*@ts-ignore*/}
                                <SettingsOutlined sx={{color: theme.palette.secondary[300], fontSize:'25px'}}/>
                        </FlexBetween>
                    </Box>
                </Drawer>
            )
            }
        </Box>
    );
};

export default Sidebar;