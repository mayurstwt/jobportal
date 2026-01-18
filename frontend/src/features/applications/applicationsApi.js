import { api } from "../../app/api";

export const applicationsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        applyToJob: builder.mutation({
            query: (jobId) => ({
                url: `/applications/jobs/${jobId}/apply`,
                method: "POST",
            })
        }),

        getApplicationsByJob: builder.query({
            query: (jobId) => `/applications/jobs/${jobId}`
        }),

        updateApplicationStatus: builder.mutation({
            query: ({id, status}) => ({
                url: `/applications/${id}/status`,
                method: "PATCH",
                body: {status}
            })
        })
    })
})

export const {useApplyToJobMutation, useGetApplicationsByJobQuery, useUpdateApplicationStatusMutation} = applicationsApi;