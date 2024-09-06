import { responseApi } from "use-hook-api";

export const getEventsListApi = (payload) => {
  return responseApi("/get_event_data", "post", payload);
};
