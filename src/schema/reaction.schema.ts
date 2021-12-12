import { object,  string, TypeOf } from "zod";

const params = object({
    thoughtId: string({
        required_error: "thoughtId is required"
    }),
    reactionId: string({
        required_error: "reactionId is required"
    })
})

const body = object({
    reactionBody: string({
        required_error: "reaction body is required"
    })
});

export const createReactionSchema = object({
    params: params.omit({reactionId: true}),
    body: body
});

export const deleteReactionSchema = object({
    params: params.omit({thoughtId: true})
});

export type CreateReactionInput = TypeOf<typeof createReactionSchema>;
export type DeleteReactionInput = TypeOf<typeof deleteReactionSchema>;

