import mongoose from "mongoose";
import { DBConnect } from "./repo/db.repo.js";
import { DBURI } from "../config/config.js";

export async function DBConnection() {
    try {
        await DBConnect({ Tool : mongoose , DBConnectionString : DBURI })
        console.log("DB Connected");
        
    } catch (error) {
        console.log(error);
        
    }
}