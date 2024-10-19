import { responseApi } from "use-hook-api";

export const getUserSettings = () => {
    return responseApi("/get_user_settings", "get");
};

export const postUserSettings = (payload) => {
    return responseApi("/update_user_settings", "post", payload);
};