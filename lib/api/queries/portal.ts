import { api } from "../client";
import { ENDPOINTS } from "../endpoints";

export async function getPortal() {
  return await api.get(ENDPOINTS.portals);
}

export async function generateTicketPortal(portalId: string) {
  return await api.post(ENDPOINTS.ticketPortal, { portal_id: portalId });
}
