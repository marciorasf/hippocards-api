import { Category } from "@entities/category";

interface CommonData {
  name: string;
}

interface CreateData extends CommonData {
  user: any;
}

type UpdateData = Partial<CommonData>;

const categoryService = {
  async create(data: CreateData) {
    return Category.create(data).save();
  },

  async retrieveAll(userId: number) {
    return Category.find({
      where: {
        user: userId,
      },
      order: { createdAt: "DESC" },
    });
  },

  async retrieveAllWithFlashcards(userId: number) {
    return Category.find({
      where: {
        user: userId,
      },
      order: { createdAt: "DESC" },
      relations: ["flashcards"],
    });
  },

  async retrieveOne(categoryId: number) {
    return Category.findOne({
      where: {
        id: categoryId,
      },
    });
  },

  async retrieveOneWithFlashcards(categoryId: number) {
    return Category.findOne({
      where: {
        id: categoryId,
      },
      relations: ["flashcards"],
    });
  },

  async update(categoryId: number, data: UpdateData) {
    await Category.update(
      {
        id: categoryId,
      },
      data
    );

    return Category.findOne({
      where: {
        id: categoryId,
      },
    });
  },

  async delete(categoryId: number) {
    return Category.delete({ id: categoryId });
  },
};

export default categoryService;
