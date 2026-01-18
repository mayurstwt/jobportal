import { api } from "../../app/api";

export const analyticsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRecruiterStats: builder.query({
            query: () => "/analytics/recruiter"
        }),
        getAdminStats: builder.query({
            query: () => "/analytics/admin"
        })
    })
})


export const {useGetRecruiterStatsQuery, useGetAdminStatsQuery} = analyticsApi;