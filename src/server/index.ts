import { ElectrumUtil } from '../util';
import { IElectrumRequestBody } from '../';

class Server {

  static async request(request: IElectrumRequestBody, path: string) {
    return ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: path,
      params: request.params || [],
    });
  }

  static async version(request: IElectrumRequestBody) {
    return Server.request(request, 'server.version');
  }

  static async banner(request: IElectrumRequestBody) {
    return Server.request(request, 'server.banner');
  }

  static async donationAddress(request: IElectrumRequestBody) {
    return Server.request(request, 'server.donation_address');
  }

  static async peersSubscribe(request: IElectrumRequestBody) {
    return Server.request(request, 'server.peers.subscribe');
  }
}

export { Server };
