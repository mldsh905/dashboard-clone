import User from "../models/User";
import {Request, Response} from "express";
import OverallStat from "../models/OverallStat";
import Transaction from "../models/Transaction";

export const getUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (error: any) {
        res.status(404).json({message: error.message})
    }
}

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const currentMonth = 'November';
        const currentYear = 2021;
        const currentDay = '2021-11-15';

        const transactions = await Transaction.find().limit(50).sort({createOn:-1});
        const overallStat:any = await OverallStat.find({year:currentYear});
        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory
        } = overallStat;
        const thisMonthStats = overallStat[0].monthlyData.find(({month}:any)=>{
            return month === currentMonth
        });
        const todayStats = overallStat[0].dailyData.find(({date}:any)=>{
            return date === currentDay
        })

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            thisMonthStats,
            todayStats,
            transactions
        })
    } catch (error: any) {
        res.status(404).json({message: error.message})
    }
}