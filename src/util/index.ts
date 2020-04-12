import { TLSSocket } from 'tls';
import { Socket } from 'json-rpc-tls';
import { IElectrumRequestBody } from '../';
import * as bitcoinjs from 'bitcoinjs-lib';

export interface IElectrumRequest extends IElectrumRequestBody {
  method: string;
}

class ElectrumUtil {
  static async makeRequest(request: IElectrumRequest) {
    const result = await Socket.request(request.socket, request.id, request.method, request.params || []);
    return JSON.parse(result as string);
  }
}

/* tslint:disable:max-classes-per-file */
class Utils {
  static addressToScriptHash(address: string, network: any) {
    const script = bitcoinjs.address.toOutputScript(address, network);
    const hash = bitcoinjs.crypto.sha256(script);
    const reversedScriptHash = (Buffer.from(hash.reverse())).toString('hex');
    return reversedScriptHash;
  }
}
/* tslint:enable:max-classes-per-file */

export { ElectrumUtil, Utils };
