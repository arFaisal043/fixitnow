import prisma from '../../utils/prisma';

const getAllCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

const createCategory = async (payload: { name: string; description: string }) => {
  const category = await prisma.category.create({
    data: payload,
  });
  return category;
};

export const CategoryService = {
  getAllCategories,
  createCategory,
};
