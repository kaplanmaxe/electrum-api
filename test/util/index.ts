import { TLSSocket, ConnectionOptions } from 'tls';
import {Socket } from 'json-rpc-tls';

class TestUtils {
  static constructSocket(host: string, port: number, options: ConnectionOptions = {
    rejectUnauthorized: false,
    checkServerIdentity: () => undefined, // Self signed cert
  }): Promise<TLSSocket> {
    return new Promise((resolve, reject) => {
      Socket.tlsSocket(host, port, options)
      .then((socket: TLSSocket) => {
        socket.setEncoding('utf8');
        socket.setKeepAlive(true, 0);
        socket.setNoDelay(true);

        resolve(socket);
      })
      .catch((e) => {
        console.log(e.error);
        Socket.close(e.socket);
      });
    });
  }

  static closeSocket(socket: TLSSocket) {
    Socket.close(socket);
  }
}

export { TestUtils };
