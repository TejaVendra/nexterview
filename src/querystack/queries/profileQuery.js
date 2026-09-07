import { useQuery , useMutation , useQueryClient } from '@tanstack/react-query'
import { deleteUser, getProfile, updateName } from '../helpers/profileHelpers.js'
import { toast } from 'react-toastify';
import { logout, uploadProfile } from '../../api/userAPI.js';




export const useProfile = () =>{
    return useQuery({
        queryKey:["profile"],
        queryFn:getProfile,
    });
}


export const useUpdateName = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:updateName,

        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey:["profile"],
            })
        }
    })
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:deleteUser,

        onSuccess: (data) =>{
            if(data.success){
                toast.success(data.message)
            }
            queryClient.invalidateQueries({
                queryKey:["profile"]
            })
        }
    })
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();




    return useMutation({
        mutationFn:uploadProfile,

        onSuccess:(data) =>{
            toast.success(data.message || "Profile picture updated");


            queryClient.invalidateQueries({
                queryKey:["profile"],
            })

        },
        onError:(error) =>{
            toast.error(
                error.response?.data?.message ||
                 error.message || "Image upload failed"
            )
        }
    })
}

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:logout,

        onSuccess:(data) =>{
            window.localStorage.removeItem("access_token");
            toast.success(data.message || "Logged out successfully");

            queryClient.invalidateQueries({
                queryKey:["profile"],
            })
            window.location.reload();
        }
    })
}