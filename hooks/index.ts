import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

import useTimeAgo from "./useTimeAgo";
export { useTimeAgo };

import { useCloudStorageFileUpload, cloudStorageFileDelete } from "./firebase";
export { useCloudStorageFileUpload, cloudStorageFileDelete };

import { useDeviceType } from "./useDeviceType";
export { useDeviceType };

import { useTinyPNG } from "./useTinyPNG";
export { useTinyPNG };
