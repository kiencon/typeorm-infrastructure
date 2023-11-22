import migrate from "../migrate";

const main = async () => {
  await migrate();
  console.log('migrate successfully');
};

main();