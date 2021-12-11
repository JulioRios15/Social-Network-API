import { object,  string, TypeOf } from "zod";

const params = {
    params: object({
        thoughtId: string({
            required_error: "thoughtId is required"
        })
    })
}

const payload = {
    body: object({
        thoughtText: string({
            required_error: "thought text is required"
        }),
        username: string({
            required_error: "username is required"
        }),
    })
}

export const createThoughtSchema = object({
    ...payload
  });

export const getThoughtSchema = object({
    ...params
})

export type CreateThoughtInput = TypeOf<typeof createThoughtSchema>;
export type ReadThoughtInput = TypeOf<typeof getThoughtSchema>;