import { TLSSocket } from 'tls';
import { ElectrumUtil } from '../util';
import { IElectrumRequestBody } from '../';

class Server {
  static async peersSubscribe(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'server.peers.subscribe',
      params: request.params || [],
    });
    return result;
  }
}

export { Server };
