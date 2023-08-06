const net = require("net");
const readline = require("readline");
const { port, host, name } = require("./data/package");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new net.Socket();

client.connect(port, host, () => {
  console.log("🎈 Sunucuya girdi : " + name);
  rl.prompt();
});

client.write(JSON.stringify({ name: name }));

client.on("data", (data) => {
  console.log(data.toString());
  rl.prompt();
});

client.on("close", () => {
    client.write("🚪 ———>")
});

rl.on("line", (input) => {
  const msgobj = {
    msg: input,
    name: name,
  };
  client.write(JSON.stringify(msgobj));
});

rl.on("close", () => {
  client.destroy();
  client.write("🚪 ———> Biri sunucudan çıktı ")
  console.log("🚪 ———> Sunucudan başarıyla çıkış yaptın !");
});
