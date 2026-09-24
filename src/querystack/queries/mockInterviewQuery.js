import { useQuery , useMutation , useQueryClient } from "@tanstack/react-query";
import { createMockInterview } from "../helpers/mockInterviewHelper";


export const useCreateMockInterview = () =>{

    return useMutation({
        mutationFn:createMockInterview,  
    })

}