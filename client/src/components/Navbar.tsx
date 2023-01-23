import React, {Dispatch, SetStateAction, useState} from 'react';
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import {useDispatch} from "react-redux";
import {setMode} from "../state";
import {
    AppBar,
    Box,
    Button,
    ButtonTypeMap,
    ExtendButtonBase,
    IconButton,
    InputBase, Menu,
    MenuItem,
    Toolbar, Typography,
    useTheme
} from "@mui/material";
import profileImage from "../assets/profileImage.jpeg";

interface IProps {
    user:any
    isSidebarOpen: boolean,
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}

const Navbar = ({user, isSidebarOpen, setIsSidebarOpen}: IProps) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (e:any)=>setAnchorEl(e.currentTarget);
    const handleClose = ()=>setAnchorEl(null);

    return (
        <div>
            <AppBar sx={{position: 'static', background: 'none', boxShadow: 'none'}}>
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    {/*left side*/}
                    <div className='flex justify-between items-center'>
                        <IconButton onClick={() => {
                            return setIsSidebarOpen(!isSidebarOpen)
                        }}>
                            <MenuIcon/>
                        </IconButton>
                        <div className={`flex items-center justify-between ${theme.palette.mode === 'dark'? 'bg-indigo-900' : 'bg-gray-200'} text-black rounded-lg gap-12 px-2 md:px-6`}>
                            <InputBase placeholder='Search'/>
                            <IconButton>
                                <Search/>
                            </IconButton>
                        </div>
                    </div>

                    {/*Right Side*/}
                    <div className='flex justify-center items-center'>
                        <IconButton onClick={()=>dispatch(setMode())}>
                            {theme.palette.mode === 'dark'?(
                                <DarkModeOutlined sx={{fontSize:'25px'}}/>
                            ):(
                                <LightModeOutlined sx={{fontSize:'25px'}}/>
                            )}
                        </IconButton>
                        <IconButton>
                            <SettingsOutlined sx={{fontSize:'25px'}}/>
                        </IconButton>
                        <FlexBetween>
                            <Button onClick={handleClick} sx={{display:'flex', justifyContent:'space-between', alignItems:'center', textTransform:'none',gap:'1rem'}}>
                                <Box component='img' alt='profile' src={profileImage} height='30px' width='30px'
                                     borderRadius='50%' sx={{objectFit:'cover'}}/>
                                <Box textAlign='left'>
                                    {/*@ts-ignore*/}
                                    <Typography fontWeight='bold' fontSize='0.8rem' sx={{color:theme.palette.secondary[100]}}>
                                        {user.name}
                                    </Typography>
                                    {/*@ts-ignore*/}
                                    <Typography fontWeight='bold' fontSize='0.7rem' sx={{color:theme.palette.secondary[200]}}>
                                        {user.occupation}
                                    </Typography>
                                </Box>
                                {/*@ts-ignore*/}
                                <ArrowDropDownOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}/>
                            </Button>
                            <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
                                <MenuItem onClick={handleClose}>
                                    Log out
                                </MenuItem>
                            </Menu>
                        </FlexBetween>
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;