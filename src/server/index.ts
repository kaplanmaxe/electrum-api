import { TLSSocket } from 'tls';
import { ElectrumUtil } from '../util';
import { IElectrumRequestBody } from '../';

class Server {

  static async version(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'server.version',
      params: request.params || [],
    });
    return result;
  }

  static async banner(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'server.banner',
      params: request.params || [],
    });
    return result;
  }

  static async donationAddress(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'server.donation_address',
      params: request.params || [],
    });
    return result;
  }

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
