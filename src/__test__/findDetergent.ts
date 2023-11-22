import { DetergentRepository, QueryableDatabase } from "../repositories";

const main = async () => {
  let db = new QueryableDatabase();
  const detergentRepository = await db.getCustomRepository(DetergentRepository);
  try {
    const work = () => detergentRepository.findByIds([1, 2, 3, 4, 5]);
    const list = await db.handle(work);
    console.log(list);
  } catch (error) {
    console.log(error);
  }
};

main();
