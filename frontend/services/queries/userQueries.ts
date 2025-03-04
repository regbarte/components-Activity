import {useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/apiUser";

export const useGetUsers = () => {
    return useQuery<Error> ({
        queryKey: ["users"], 
        queryFn: () => getUsers()
    })
}