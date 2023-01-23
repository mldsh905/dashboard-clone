import React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {useGetTransactionsQuery} from "../../state/api";
import Header from '../../components/Header'
import {Box, useTheme} from "@mui/material";

const Transactions = () => {
    const theme = useTheme();
    const {data, isLoading} = useGetTransactionsQuery();
    // console.log(data);
    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 1.5
        },
        {
            field: 'cost',
            headerName: 'Cost',
            flex: 0.5
        },
        {
            field: "products",
            headerName: "Products Number",
            flex: 0.5,
            sortable: false,
            renderCell: (params:any) => params.value.length,
        },
    ]

    return (
        <Box m={'1.5rem 2.5rem'}>
            <Header title='TRANSACTIONS' subtitle='List of Transactions ID and Costs'/>
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

export default Transactions;