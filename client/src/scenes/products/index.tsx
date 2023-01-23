import React, {useState} from 'react';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery
} from "@mui/material";
import {useGetProductsQuery, useGetUserQuery} from "../../state/api";
import Header from "../../components/Header";
import {useSelector} from "react-redux";

interface IProps {
    _id: string,
    name: string,
    description: string,
    price: number,
    rating: number,
    category: string,
    supply: number,
    stat: any
}

const Product = ({
                     _id,
                     name, description,
                     price, rating,
                     category, supply, stat
                 }: IProps) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        // @ts-ignore
        <Card sx={{backgroundImage: 'none', backgroundColor: theme.palette.background.alt, borderRadius: '0.55rem'}}>
            <CardContent sx={{'& .MuiCardContent-root':{padding:0}}}>
                {/*@ts-ignore*/}
                <Typography sx={{fontSize: 14}} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>
                <Typography variant='h5' component='div'>
                    {name}
                </Typography>
                {/*@ts-ignore*/}
                <Typography sx={{mb: '1.5rem'}} color={theme.palette.secondary[400]}>
                    {'$' + price.toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly/>
                <Typography variant='body2'>
                    {description}
                </Typography>
                <CardActions>
                    <Button size='small' onClick={() => setIsExpanded(!isExpanded)}>
                        See more
                    </Button>
                </CardActions>
                {/*@ts-ignore*/}
                <Collapse in={isExpanded} unmountOnExit sx={{color: theme.palette.neutral[300]}}>
                    <CardContent>
                        <Typography>
                            id: {_id}
                        </Typography>
                        <Typography>
                            Supply Left: {supply}
                        </Typography>
                        <Typography>
                            Yearly Sales: {stat[0].yearlySalesTotal}
                        </Typography>
                        <Typography>
                            Yearly Units Sold: {stat[0].yearlyTotalSoldUnits}
                        </Typography>
                    </CardContent>
                </Collapse>
            </CardContent>
        </Card>
    )
}

const Products = () => {
    const {data, isLoading} = useGetProductsQuery();

    return (
        <Box m='1.5rem 2.5rem'>
            <Header title='PRODUCTS' subtitle='See your list of products'/>
            {data || !isLoading ? (
                <Box className='mt-8 grid lg:grid-cols-3 justify-between gap-8'>
                    {data.map(({_id, name, description, price, rating, category, supply, stat}:any) => (
                        <Product key={_id} _id={_id} name={name} description={description} price={price} rating={rating} category={category} supply={supply} stat={stat}/>
                    ))}
                </Box>
            ) : (
                <div>
                    <>Loading...</>
                </div>
            )}
        </Box>
    );
};

export default Products;