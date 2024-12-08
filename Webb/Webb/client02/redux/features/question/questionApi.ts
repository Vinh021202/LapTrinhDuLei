import { apiSlice } from "../api/apiSilce";

export const questionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuestions: builder.query({
      query: () => ({
        url: "get-all-questions",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    submitTest: builder.mutation({
      query: ({ answers }: { answers: any[] }) => ({
        url: "submit-test",
        method: "POST",
        body: { answers },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllQuestionsQuery, useSubmitTestMutation } = questionApi;