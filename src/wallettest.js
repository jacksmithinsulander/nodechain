const Wallet = require("./models/Wallet");
const readline = require("readline");

const wallet = new Wallet();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const walletTest = async (usrName, pass) => {
  await wallet.generateKeyPair(usrName, pass);
};

rl.question('Enter your username: ', async (username) => {
  rl.question('Enter your password: ', async (password) => {
    console.log('Username:', username);
    console.log('Password:', password);
    await walletTest(username, password);

    rl.close();
  });
});