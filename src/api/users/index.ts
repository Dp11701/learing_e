import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axiosClient";

type User = {
  id: number;
  name: string;
  progress: number; // Progress in percentage
};

const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosClient.get("/users/all");
  return response.data;
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // Mark data as fresh for 5 minutes
  });
};
