import { NextResponse } from "next/server";
import type { ApiResponse } from "@/models/types/api/api-response";

const createJsonResponse = <TData>(input: ApiResponse<TData>, status: number): Response => {
  return NextResponse.json(input, { status });
};

export default createJsonResponse;
