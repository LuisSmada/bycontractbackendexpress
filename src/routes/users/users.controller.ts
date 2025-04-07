import { IUser } from "core/types/entities";
import { ICreateUserDTO } from "dtos/entities.dto";
import { Request, Response } from "express";
import { createUser } from "models/users.model";

interface IErrorMessage {
  error: string;
}

export const httpCreateNewUser = async (
  req: Request<{}, IUser | IErrorMessage, ICreateUserDTO>,
  res: Response
): Promise<any> => {
  const userToBeCreated = req.body;
  if (
    !userToBeCreated.email ||
    !userToBeCreated.firstName ||
    !userToBeCreated.password
  ) {
    return res.status(400).json({
      error: "Missing required data properties",
    });
  }

  try {
    const user = await createUser(userToBeCreated);
    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        error: error.message || "An error occurred while creating the user",
      });
    }

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
