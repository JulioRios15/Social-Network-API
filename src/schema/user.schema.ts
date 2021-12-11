import { object,  string, TypeOf } from "zod";

const payload = {
    body: object({
      username: string({
        required_error: "username is required",
      }),
      email: string({
        required_error: "email is required",
      })
    }),
  };
  
  const params = {
    params: object({
      userId: string({
        required_error: "userId is required",
      }),
    })
  };


  export const createUserSchema = object({
    body: object({
      username: string({
        required_error: "username is required",
      }),
      email: string({
        required_error: "email is required",
      }),
      password: string({
        required_error: "password is required",
      })
    })
  });

  export const userFriendSchema = object({
    params: object({
      userId: string({
        required_error: "userId is required"
      }),
      friendId: string({
        required_error: "friendId is required"
      })
    })
  })

  export const updateUserSchema = object({
    ...params,
    ...payload
  });

  export const getUserSchema = object({
    ...params
  })

  export const deleteUserSchema = object({
    ...params
  })

  export type CreateUserInput = TypeOf<typeof createUserSchema>;
  export type ReadUserInput = TypeOf<typeof getUserSchema>;
  export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
  export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;

  export type UserFriendInput = TypeOf<typeof userFriendSchema>;


