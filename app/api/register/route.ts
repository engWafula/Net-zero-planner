import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, password } = body;

  if (!password || password.length < 5) {
    return NextResponse.json({ error: "Password must be at least 5 characters" }, { status: 400 });

  }

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });

  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const createdUser = await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  });

  return NextResponse.json(createdUser);
}
