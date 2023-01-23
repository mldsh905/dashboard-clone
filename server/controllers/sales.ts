import {Request, Response} from "express";
import OverallStat from "../models/OverallStat";

export const getSales = async (req: Request, res: Response) => {
    try {
        const overallStats = await OverallStat.find();
        res.status(200).json(overallStats)
    } catch (error: any) {
        res.status(404).json({message: error.message})
    }
}