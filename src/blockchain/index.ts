import { ElectrumUtil } from '../util';
import { IElectrumRequestBody } from '../';

class Blockchain {

  static async request(request: IElectrumRequestBody, path: string) {
    return ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: path,
      params: request.params || [],
    });
  }

  static async headersSubscribe(request: IElectrumRequestBody) {
    return Blockchain.request(request, 'blockchain.headers.subscribe');
  }

  static async scriptHashSubscribe(request: IElectrumRequestBody) {
    return Blockchain.request(request, 'blockchain.scripthash.subscribe');
  }

  static async scriptHashGetHistory(request: IElectrumRequestBody) {
    return Blockchain.request(request, 'blockchain.scripthash.get_history');
  }

  static async scriptHashGetMempool(request: IElectrumRequestBody) {
    return Blockchain.request(request, 'blockchain.scripthash.get_mempool');
  }

  static async scriptHashGetBalance(request: IElectrumRequestBody) {
    return Blockchain.request(request, 'blockchain.scripthash.get_balance');
  }

  static async scriptHashListUnspent(request: IElectrumRequestBody) {
    return Blockchain.request(request, 'blockchain.scripthash.listunspent');
  }

  static async blockGetHeader(request: IElectrumRequestBody) {
    return Blockchain.request(request, 'blockchain.block.header');
  }

  static async transactionBroadcast(request: IElectrumRequestBody) {
    return Blockchain.request(request, 'blockchain.transaction.broadcast');
  }

  static async transactionGetMerkle(request: IElectrumRequestBody) {
    return Blockchain.request(request, 'blockchain.transaction.get_merkle');
  }

  static async transactionGet(request: IElectrumRequestBody) {
    return Blockchain.request(request, 'blockchain.transaction.get');
  }

  static async estimateFee(request: IElectrumRequestBody) {
    return Blockchain.request(request, 'blockchain.estimatefee');
  }
}

export { Blockchain };
