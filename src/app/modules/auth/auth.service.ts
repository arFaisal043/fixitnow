import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';
import { createToken } from '../../utils/jwt';
import config from '../../config';

const registerUserIntoDB = async (payload: any) => {
  const { name, email, password, role } = payload;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    }
  });

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    user,
    token: accessToken,
  };
};

const loginUser = async (payload: any) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User does not exist');
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error('Password does not match');
  }

  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

const getMe = async (email: string) => {
  return null;
};

export const AuthService = {
  registerUserIntoDB,
  loginUser,
  getMe,
};
