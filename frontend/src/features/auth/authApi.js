import {api} from "../../app/api";


export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            })
        })
    })
})

export const {useLoginMutation, useRegisterMutation} = authApi;