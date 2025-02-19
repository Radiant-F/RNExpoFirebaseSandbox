import * as Device from "expo-device";
import { useEffect, useState } from "react";

export function useDeviceType() {
  const [device, setDevice] = useState<"phone" | "tablet" | "any">();

  async function onGetDeviceTypes() {
    try {
      const device = await Device.getDeviceTypeAsync();
      if (device == Device.DeviceType.PHONE) setDevice("phone");
      else if (device == Device.DeviceType.TABLET) setDevice("tablet");
      else setDevice("any");
    } catch (error) {
      console.log("error reading device type:", error);
    }
  }

  useEffect(() => {
    onGetDeviceTypes();
  }, []);

  return device;
}
