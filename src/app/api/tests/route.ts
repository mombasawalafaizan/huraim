import connect from "@/db";
import Test from "@/models/Test";
import { ITest } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const data: ITest[] = await Test.find();
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching tests" + error, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { name } = await request.json();
    if (!name || typeof name !== "string") {
      return new NextResponse("Invalid or missing 'name' in the request body", {
        status: 400,
      });
    }
    const newTest: ITest = new Test({ name });
    const savedTest = await newTest.save();
    return new NextResponse(JSON.stringify(savedTest), { status: 201 }); // 201 Created
  } catch (error) {
    return new NextResponse("Error in creating a new test: " + error, {
      status: 500,
    });
  }
}
