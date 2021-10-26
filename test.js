const $axios = require('axios');

const delay = time => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      return res();
    }, time);
  });
}

const main = async () => {
  await $axios.get('http://localhost:3001').then(res => console.log(res.data))
  await $axios.get('http://localhost:3001/test').then(res => console.log(res.data.length))
  console.log('hello')
}

const test = async () => {
  for (let i = 0; i < 5; i++) {
    await delay(500);
    await Promise.all([
      main(),
      main(),
      main(),
      main(),
      main()
    ])
    console.log('test')
  }
};

test();
