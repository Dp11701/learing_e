// src/api/task.ts
import { useQuery } from "@tanstack/react-query";
import { Word } from "../../types/word";
import axiosClient from "../axiosClient";

const fetchTasks = async (): Promise<Word[]> => {
  const response = await axiosClient.get("/task/");
  return response.data.words; // Đảm bảo rằng bạn đang lấy đúng dữ liệu từ phản hồi
};

export const useTasks = () => {
    return useQuery({
      queryKey: ["tasks"],
      queryFn: fetchTasks,
      staleTime: 1000 * 60 * 5, // Mark data as fresh for 5 minutes
    });
  };