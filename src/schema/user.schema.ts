import { object,  string, TypeOf } from "zod";

const body = object({
  username: string({
    required_error: "username is required",
  }),
  email: string({
    required_error: "email is required",
  }),
  password: string({
    required_error: "password is required"
  })
})
  
  const params = object({
    userId: string({
      required_error: "userId is required",
    }),
  })


  export const createUserSchema = object({
    body: body
  });

  export const updateUserSchema = object({
    params: params,
    body: body.omit({password: true})
  });

  export const getUserSchema = object({
    params: params
  });

  export const deleteUserSchema = object({
    params: params
  });

  export type CreateUserInput = TypeOf<typeof createUserSchema>;
  export type ReadUserInput = TypeOf<typeof getUserSchema>;
  export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
  export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;


