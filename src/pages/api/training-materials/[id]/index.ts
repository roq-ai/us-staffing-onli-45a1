import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { trainingMaterialValidationSchema } from 'validationSchema/training-materials';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.training_material
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTrainingMaterialById();
    case 'PUT':
      return updateTrainingMaterialById();
    case 'DELETE':
      return deleteTrainingMaterialById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTrainingMaterialById() {
    const data = await prisma.training_material.findFirst(convertQueryToPrismaUtil(req.query, 'training_material'));
    return res.status(200).json(data);
  }

  async function updateTrainingMaterialById() {
    await trainingMaterialValidationSchema.validate(req.body);
    const data = await prisma.training_material.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTrainingMaterialById() {
    const data = await prisma.training_material.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
