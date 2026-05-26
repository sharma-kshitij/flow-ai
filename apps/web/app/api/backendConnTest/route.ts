import axios from "axios"
import { NextResponse } from "next/server"

export const GET = async()=>{
    const url = process.env.BACKEND_BASE_URL || ""
    console.log("URL:" , url)
    const res = await axios.get(`${url}`)
    return NextResponse.json(res.data)
}