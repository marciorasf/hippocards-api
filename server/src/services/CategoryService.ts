import { PrismaClient, CategoryCreateInput, CategoryUpdateInput } from "@prisma/client";

const prisma = new PrismaClient();

class CategoryService {
  public async create(data: CategoryCreateInput) {
    return prisma.category.create({
      data,
    });
  }

  public async index(userId: number) {
    return prisma.category.findMany({
      where: {
        userId,
      },
    });
  }

  public async update(categoryId: number, data: CategoryUpdateInput) {
    return prisma.category.update({
      where: { id: categoryId },
      data,
    });
  }

  public async delete(categoryId: number) {
    return prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
}

export default new CategoryService();
