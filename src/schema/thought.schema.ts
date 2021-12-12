import { object,  string, TypeOf } from "zod";

const params = object({
    thoughtId: string({
        required_error: "thoughtId is required"
    })
});

const body = object({
    thoughtText: string({
        required_error: "thought text is required"
    }),
    username: string({
        required_error: "username is required"
    }),
});

export const createThoughtSchema = object({
    body: body
  });

export const getThoughtSchema = object({
    params: params
});

export const updateThoughtSchema = object({
    params: params,
    body: body.omit({username: true})
});

export const deleteThoughtSchema = object({
    params: params
});

export type CreateThoughtInput = TypeOf<typeof createThoughtSchema>;
export type ReadThoughtInput = TypeOf<typeof getThoughtSchema>;
export type UpdateThoughtInput = TypeOf<typeof updateThoughtSchema>;
export type DeleteThoughtInput = TypeOf<typeof deleteThoughtSchema>;