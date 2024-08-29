"use client";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  console.log("params", params);
  return <div className="text-xl font-bold">Camera {params?.id}</div>;
};

export default page;
