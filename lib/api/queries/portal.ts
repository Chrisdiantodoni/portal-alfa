import { api } from "../client";
import { ENDPOINTS } from "../endpoints";

export async function getPortal() {
  return await api.get(ENDPOINTS.portals);
}
