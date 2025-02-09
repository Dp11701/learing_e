// src/api/task.ts
import { useQuery } from "@tanstack/react-query";
import { Word } from "../../types/word";
import axiosClient from "../axiosClient";

const fetchTasks = async (): Promise<any> => {
  const response = await axiosClient.get("/task/unlearned");
  return response.data; // Đảm bảo rằng bạn đang lấy đúng dữ liệu từ phản hồi
};

export const updateWord = async (data: any): Promise<any> => {
  const response = await axiosClient.put<any>("/task/", data);
  return response.data;
};
export const useTasks = () => {
    return useQuery({
      queryKey: ["tasks"],
      queryFn: fetchTasks,
      staleTime: 1000 * 60 * 5, // Mark data as fresh for 5 minutes
    });
  };