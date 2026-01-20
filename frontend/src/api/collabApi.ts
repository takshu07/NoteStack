import api from "./axios";

export const startCollab = (userId: string) =>
  api.post("/collab/start", { userId });

export const getMyCollabs = () =>
  api.get("/collab/my");

export const deleteCollab = (id: string) =>
  api.delete(`/collab/${id}`);
