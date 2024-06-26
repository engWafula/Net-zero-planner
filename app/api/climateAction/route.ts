
import { db } from "@/lib/db";
import { ClimateAction } from "@prisma/client";
import { NextResponse } from "next/server";

const currentYear = new Date().getFullYear();

export async function POST(req: Request) {
    const body = await req.json();
  
    const startYear = body.startYear;
    const emissionsReduction = body.emissionsReduction;
    const title = body.title;
    const netZeroPlanId = body.netZeroPlanId;
    const actionCost = body.cost
  
    if (!netZeroPlanId) {
      return NextResponse.json({ error: "NetZeroPlan ID is required." }, { status: 400 });
    }
  
    try {
      const climateAction:ClimateAction = await db.climateAction.create({
        data: {
          title,
          startYear,
          emissionsReduction,
          actionCost,
          netZeroPlan: {
            connect: {
              id: netZeroPlanId
            }
          }
        }
      });
  
      return NextResponse.json(climateAction);
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: "An error occurred while creating the ClimateAction." }, { status: 500 });
    }
  }
  


export async function GET(req:Request) {
  const plan = await db.climateAction.findMany();
return NextResponse.json(plan);
}





