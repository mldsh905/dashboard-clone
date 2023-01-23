import React from 'react';
import {Typography, Box, useTheme} from "@mui/material";

interface IProps {
    title:string,
    subtitle:string
}

const Header = ({title, subtitle}:IProps) => {
    const theme = useTheme();

    return (
        <Box>
            {/*@ts-ignore*/}
            <Typography variant='h2' color={theme.palette.secondary[100]} fontWeight='bold' sx={{mb:'5px'}}>
                {title}
            </Typography>
            {/*@ts-ignore*/}
            <Typography variant='h5' color={theme.palette.secondary[300]}>
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;