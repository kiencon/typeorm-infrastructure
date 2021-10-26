const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const { QueryableDatabase, DetergentRepository } = require('./repository');
const { UnitOfWork } = require('./unitOfWork');
const { Detergent } = require('./entity');
const { QueryFailedError } = require('typeorm');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))    

// parse application/json
app.use(bodyParser.json())
  
app.listen(3001, () => {
  console.log('app listen on port 3001');
});

app.get('/', async (req, res) => {
  try {
    const uow = new UnitOfWork();
    await uow.startTransaction();
    const detergentRepository = uow.getRepository(Detergent);
    const work = async () => {
      await Promise.all([
        detergentRepository.save({
          name: 'fail',
          number: 1
        }),
        detergentRepository.save({
          name: 'fail'
        })
      ]);
    };
    await uow.complete(work);
    res.json({ok : 200})
  } catch (error) {
    if (error instanceof QueryFailedError) {
      console.log(error.message);
    } else {
      console.log(error);
    }
    res.json({ code : 500, msg: error.message });
  }
});

app.get('/test', async (req, res) => {
  let db = new QueryableDatabase();
  const detergentRepository = await db.getCustomRepository(DetergentRepository);
  try {
    const work = () => detergentRepository.findByIds([1, 2, 3, 4, 5]);
    const list = await db.handle(work);
    res.json(list);
  } catch (error) {
    res.json({ err: error.message });
  }
});
