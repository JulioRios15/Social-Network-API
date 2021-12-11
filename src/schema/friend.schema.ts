import { object,  string, TypeOf } from "zod";

const params = object({
    userId: string({
        required_error: "userId is required"
      }),
      friendId: string({
        required_error: "friendId is required"
      })
});

export const friendSchema = object({
    params: params
});

export type FriendInput = TypeOf<typeof friendSchema>;