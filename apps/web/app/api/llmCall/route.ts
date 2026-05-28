import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

export const POST = async(req:NextRequest) => {
  const {workflow} = await req.json()
  const url = process.env.BACKEND_BASE_URL || ""
  const res = await axios.post(`${url}/run`,workflow,{
        headers: {
          "Content-Type": "application/json"
        }
      })

  
  return NextResponse.json(res.data)
}