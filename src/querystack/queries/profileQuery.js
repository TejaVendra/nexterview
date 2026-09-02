import { useQuery  } from '@tanstack/react-query'
import { getProfile } from '../helpers/profileHelpers.js'




export const useProfile = (email) =>{
    return useQuery({
        queryKey:["profile"],
        queryFn:getProfile(email),
    });
}