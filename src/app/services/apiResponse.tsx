import {NextResponse} from "next/server";

export function ApiSuccess(message:string , data : any={}, status:number=200 ){
  const response = NextResponse.json(
    {
      success:true,
      message,
      data,
    },
    {status:status}
  )
  return response;
}

export function ApiError(error?: any, status:number=500){
  console.error(`API Error: ` , error?.message || "");

  return NextResponse.json(
    {
      success:false,
      error: error ? error.message || error : undefined ,
    },
    {status:status}
  )
}