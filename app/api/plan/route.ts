
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const currentYear = new Date().getFullYear();

export async function POST(req: { json: () => any; }) {
  const body = await req.json();

  const targetYear = body.targetYear;
  const currentEmissions = body.currentEmissions;

  if (!targetYear || !currentEmissions) {
    throw new Error('Target year and the current year must be provided');
  }

  if (targetYear <= currentYear) {
    throw new Error('Target year must be a future year');
  }


  const plan = await db.netZeroPlan.create({
    data: {
      targetYear,
      currentEmissions
    }
  });
return Response.json(plan);

}



export async function GET(req: { json: () => any; }) {

  const session = await getServerSession(authOptions);

 console.log(session,"AM THE SESSION")
  const plan = await db.netZeroPlan.findMany({
    include: {
      climateActions: true,
    },
  });
return Response.json(plan);

}