import Product from '../models/Product';
import ProductStat from "../models/ProductStat";
import User from "../models/User";
import {Request, Response} from "express";
import Transaction from "../models/Transaction";


export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        const productsWithStats = await Promise.all(
            products.map(async (product: any) => {
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return {
                    ...product._doc, stat
                }
            })
        )
        res.status(200).json(productsWithStats)
    } catch (error: any) {
        res.status(404).json({message: error.message})
    }
}

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await User.find({role: "user"}).select("-password");

        res.status(200).json(customers)
    } catch (error: any) {
        res.status(404).json({message: error.message})
    }
}


export const getTransactions = async (req: Request, res: Response) => {
    try {
        const {search} = req.query;
        const transactions = await Transaction.find({

        })

        res.status(200).json(
            transactions
        );
    } catch (error: any) {
        res.status(404).json({message: error.message});
    }
};
