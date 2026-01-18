import { api } from "../../app/api";

export const jobsApi = api.injectEndpoints( {
    endpoints: (builder) => ({
        getJobs: builder.query({
            query: (params) => ({
                url: "/jobs",
                params
            })
        }),
        getMyJobs: builder.query({
            query: () => "/jobs?mine=true"
        })
    })
});

export const {useGetJobsQuery, useGetMyJobsQuery} = jobsApi;