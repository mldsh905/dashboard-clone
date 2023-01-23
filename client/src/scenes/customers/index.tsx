import React from 'react';
import {Box, useTheme} from "@mui/material";
import {useGetCustomersQuery} from "../../state/api";
import Header from "../../components/Header";
import {DataGrid} from "@mui/x-data-grid";

const Customers = () => {
    const theme = useTheme();
    const {data, isLoading} = useGetCustomersQuery();
    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 1.5
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 0.5
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1.5
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            flex: 0.8,
        },
        {
            field: 'country',
            headerName: 'Country',
            flex: 0.4
        },
        {
            field: 'occupation',
            headerName: 'Occupation',
            flex: 1
        },
        {
            field: 'role',
            headerName: 'Role',
            flex: 0.5
        },
    ]


    return (
        <Box m={'1.5rem 2.5rem'}>
            <Header title='CUSTOMERS' subtitle='List of Customers'/>
            {/*@ts-ignore*/}
            <Box mt='40px' height='75vh' minWidth='900px' sx={{'& .MuiDataGrid-root':{border:'none'}, '& .MuiDataGrid-cell':{borderBottom:'none'}, "& .MuiDataGrid-columnHeaders":{backgroundColor:theme.palette.background.alt, color:theme.palette.secondary[100], borderBottom:'none'}, '& .MuiDataGrid-virtualScroller':{backgroundColor: theme.palette.background.light}, '& .MuiDataGrid-footerContainer':{backgroundColor:theme.palette.background.alt, color:theme.palette.secondary[100],borderTop:'none'}, '& .MuiDataGrid-toolbarContainer .MuiButton-text':{color:`${theme.palette.secondary[200]} !important`} }}>
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={row=>row._id}
                    rows={data||[]}
                    columns={columns}/>
            </Box>
        </Box>
    );
};

export default Customers;