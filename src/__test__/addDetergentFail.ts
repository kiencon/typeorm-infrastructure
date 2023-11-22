import { Detergent } from "../entities";
import { UnitOfWork } from "../unitOfWork";
import { DetergentPayload } from "./@type";

const addDetergentFail = async () => {
  const detergents: DetergentPayload[] = [{
    name: 'dt-10003',
    number: 10001
  }, {
    name: 'dt-20004',
  }]
  const uow = new UnitOfWork();
  await uow.startTransaction();
  const detergentRepository = uow.getRepository(Detergent);
  const work = () => Promise.all(detergents.map(detergent => detergentRepository.save(detergent)));
  const results = await uow.complete(work);
  console.log(results);
};

addDetergentFail();
