import { NextRequest, NextResponse } from "next/server"

export const POST = async(req:NextRequest) => {
  const {messages} = await req.json()
  console.log(messages)
  return NextResponse.json({msg:"hello"})
}