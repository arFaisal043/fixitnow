import prisma from '../../utils/prisma';

const getAllServices = async () => {
  const services = await prisma.service.findMany({
    include: {
      category: true,
      technician: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return services;
};

const createService = async (payload: { name: string; description: string; price: number; categoryId: string; technicianId: string }) => {
  const service = await prisma.service.create({
    data: payload,
  });
  return service;
};

export const ServiceService = {
  getAllServices,
  createService,
};
