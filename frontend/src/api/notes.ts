import axiosInstance from "./axios";

export const getNoteById = (id: string) => {
  if (!id) throw new Error("Note ID is required");
  return axiosInstance.get(`/api/notes/getNotesById/${id}`, {
    withCredentials: true,
  });
};
