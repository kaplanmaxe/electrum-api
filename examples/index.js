const Socket =  require('json-rpc-tls').Socket;
const Blockchain = require('../').Blockchain;

Socket.tlsSocket('185.64.116.15', 50002, {
  // Note: this sends all data in plain text. You should connect using server's cert
  rejectUnauthorized: false,
  checkServerIdentity: () => undefined,
})
.then(async (socket) => {
  socket.setEncoding('utf8');
  socket.setKeepAlive(true, 0);
  socket.setNoDelay(true);

  const balance = await Blockchain.addressGetBalance({ id: 1, params: ['1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'], socket });
  console.log(`Balance is ${balance.result.confirmed / 100000000} BTC`);
  Socket.close(socket);
})
.catch((e) => {
  console.log(e.error);
  Socket.close(e.socket);
});