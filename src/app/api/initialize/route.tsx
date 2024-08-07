import setupData from "@/lib/database/init";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
	if (process.env.NODE_ENV === "development") {
		await setupData();
		return NextResponse.json({ status: 200, body: "Data initialized" });
	}
	return notFound();
}
