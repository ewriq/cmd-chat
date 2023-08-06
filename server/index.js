const net = require("net");
const { port } = require("./config/data");

const clients = [];

const cast = (sender, message) => {
  clients.forEach((client) => {
    if (client !== sender) {
      client.write(message);
    }
  });
};

const server = net.createServer((socket) => {
  clients.push(socket);

  socket.on("data", (data) => {
    const datas = JSON.parse(data.toString());

    const name = datas.name;
    const msg = datas.msg || '🚪 ———> Sunucuya katıldı !';
    if (msg === '🚪 ———> Sunucuya katıldı !') {
        const response = `${msg}`;
        cast(socket, response);
    } else {
        const response = `${name} ——— ${msg}`;
        cast(socket, response);
    }
  });

  socket.on("end", () => {
    const index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});


server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
