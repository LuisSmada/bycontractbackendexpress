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
    throw new Error("A uuser with this email already exists");
  }

  const newId = (await getLatestUserId()) + 1;

  const user = Object.assign(userDto, {
    id: newId,
  });

  return await users.insertOne(user);
};
