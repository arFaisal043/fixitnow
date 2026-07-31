import prisma from '../../utils/prisma';
import { Role } from '@prisma/client';

const getAllTechnicians = async () => {
  const technicians = await prisma.user.findMany({
    where: { role: Role.TECHNICIAN },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isBanned: true,
      createdAt: true,
      updatedAt: true,
      technicianProfile: true,
    },
  });
  return technicians;
};

const getTechnicianById = async (id: string) => {
  const technician = await prisma.user.findUnique({
    where: { id, role: Role.TECHNICIAN },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isBanned: true,
      createdAt: true,
      updatedAt: true,
      technicianProfile: true,
      services: true,
    },
  });
  if (!technician) {
    throw new Error('Technician not found');
  }
  return technician;
};

const updateProfile = async (userId: string, payload: any) => {
  const updateData: any = {};
  if (payload.skills !== undefined) updateData.skills = payload.skills;
  if (payload.experience !== undefined) updateData.experience = parseInt(String(payload.experience)) || 0;
  if (payload.hourlyRate !== undefined) updateData.hourlyRate = parseFloat(String(payload.hourlyRate)) || 0;
  if (payload.availability !== undefined) updateData.availability = payload.availability;

  const profile = await prisma.technicianProfile.upsert({
    where: { userId },
    update: updateData,
    create: {
      userId,
      skills: updateData.skills || [],
      experience: updateData.experience || 0,
      hourlyRate: updateData.hourlyRate || 0,
      availability: updateData.availability || [],
    },
  });
  return profile;
};

const updateAvailability = async (userId: string, payload: any) => {
  const profile = await prisma.technicianProfile.upsert({
    where: { userId },
    update: { availability: payload.availability },
    create: {
      userId,
      skills: [],
      experience: 0,
      hourlyRate: 0,
      availability: payload.availability || [],
    },
  });
  return profile;
};

export const TechnicianService = {
  getAllTechnicians,
  getTechnicianById,
  updateProfile,
  updateAvailability,
};
