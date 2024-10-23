import { responseApi } from "use-hook-api";

export const addCameraApi = (payload) => {
  return responseApi("/add_camera", "post", payload);
};

export const deleteCameraApi = (payload) => {
  return responseApi("/delete_camera", "post", payload);
};

export const getCameraCoordinatesApi = () => {
  return responseApi("/get_camera_coordinates", "post");
};

export const getAllCamerasConfigApi = () => {
  return responseApi("/get_camera_config", "get");
};

export const listCamerasApi=()=>{
  return responseApi('/list_cameras','get')
}