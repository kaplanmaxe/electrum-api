import { TLSSocket } from 'tls';
import { Socket } from 'json-rpc-tls';
import { IElectrumRequestBody } from '../';

export interface IElectrumRequest extends IElectrumRequestBody {
  method: string;
}

class ElectrumUtil {
  static async makeRequest(request: IElectrumRequest) {
    const result = await Socket.request(request.socket, request.id, request.method, request.params || []);
    return JSON.parse(result as string);
  }
}

export { ElectrumUtil };
