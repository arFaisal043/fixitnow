import prisma from '../../utils/prisma';

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isBanned: true,
      createdAt: true,
    },
  });
  return users;
};

const updateUserStatus = async (id: string, isBanned: boolean) => {
  const user = await prisma.user.update({
    where: { id },
    data: { isBanned },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isBanned: true,
    },
  });
  return user;
};

export const AdminService = {
  getAllUsers,
  updateUserStatus,
};
