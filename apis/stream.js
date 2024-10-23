import { responseApi } from "use-hook-api";

export const singleStreamApi = (id) => {
  return responseApi(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stream/${id}`, "get");
};