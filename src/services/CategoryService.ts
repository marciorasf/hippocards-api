import { PrismaClient, CategoryCreateInput, CategoryUpdateInput } from "@prisma/client";

const prisma = new PrismaClient();

class CategoryService {
  async create(data: CategoryCreateInput) {
    return prisma.category.create({
      data,
    });
  }

  async retrieveAll(userId: number) {
    return prisma.category.findMany({
      where: {
        userId,
      },
    });
  }

  async update(categoryId: number, data: CategoryUpdateInput) {
    return prisma.category.update({
      where: { id: categoryId },
      data,
    });
  }

  async delete(categoryId: number) {
    return prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
}

export default new CategoryService();
