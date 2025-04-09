import { ICreateUserDTO } from "dtos/entities.dto";
import users from "./users.mongo";
import { IUser } from "core/types/entities";

const DEFAULT_FIRST_USER_ID = 0;

const getLatestUserId = async () => {
  const lastId: IUser | null = await users.findOne().sort("-id");
  if (!lastId) {
    return DEFAULT_FIRST_USER_ID;
  }

  return lastId.id as number;
};

export const createUser = async (userDto: ICreateUserDTO) => {
  const existingUser = await users.findOne({
    email: userDto.email,
  });

  if (existingUser) {
    throw new Error("A user with this email already exists");
  }

  const newId = (await getLatestUserId()) + 1;

  const user = Object.assign(userDto, {
    id: newId,
  });

  return await users.insertOne(user);
};

export const getAllUsers = async () => {
  return await users.find({}, { __v: 0, _id: 0, password: 0 });
};

export const getUserById = async (id: number) => {
  return await users.findOne({ id: id }, { __v: 0, _id: 0, password: 0 });
};

export const deleteUserById = async (id: number) => {
  return users.deleteOne({ id: id });
};
