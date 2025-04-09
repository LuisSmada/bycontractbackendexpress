import { IUser } from "core/types/entities";
import { ICreateUserDTO } from "dtos/entities.dto";
import { Request, Response } from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
} from "models/users.model";

interface IErrorMessage {
  error: string;
}

export const httpCreateNewUser = async (
  req: Request<{}, {}, ICreateUserDTO>,
  res: Response<IUser | IErrorMessage>
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

export const httpGetAllUsers = async (
  req: Request,
  res: Response<IUser[]>
): Promise<any> => {
  return res.status(200).json(await getAllUsers());
};

export const httpGetUserById = async (
  req: Request<{ id: number }>,
  res: Response<IUser | IErrorMessage>
): Promise<any> => {
  const userFound = await getUserById(Number(req.params.id));
  if (userFound) {
    return res.status(200).json(userFound);
  } else {
    return res.status(500).json({
      error: "This user does not exists",
    });
  }
};

export const httpDeleteUserById = async (
  req: Request<{ id: number }>,
  res: Response<IUser | IErrorMessage>
): Promise<any> => {
  const userFound = await getUserById(Number(req.params.id));
  if (!userFound) {
    return res.status(500).json({
      error: "This user does not exists",
    });
  }

  await deleteUserById(Number(req.params.id));

  return res.status(200).json(userFound);
};
