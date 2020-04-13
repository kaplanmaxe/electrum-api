import { ElectrumUtil } from '../util';
import { IElectrumRequestBody } from '../';

class Blockchain {

  static async headersSubscribe(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.headers.subscribe',
      params: request.params || [],
    });
    return result;
  }

  static async scriptHashSubscribe(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.scripthash.subscribe',
      params: request.params || [],
    });
    return result;
  }

  static async scriptHashGetHistory(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.scripthash.get_history',
      params: request.params || [],
    });
    return result;
  }

  static async scriptHashGetMempool(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.scripthash.get_mempool',
      params: request.params || [],
    });
    return result;
  }

  static async scriptHashGetBalance(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.scripthash.get_balance',
      params: request.params || [],
    });
    return result;
  }

  static async scriptHashListUnspent(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.scripthash.listunspent',
      params: request.params || [],
    });
    return result;
  }

  static async blockGetHeader(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.block.header',
      params: request.params || [],
    });
    return result;
  }

  static async transactionBroadcast(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.transaction.broadcast',
      params: request.params || [],
    });
    return result;
  }

  static async transactionGetMerkle(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.transaction.get_merkle',
      params: request.params || [],
    });
    return result;
  }

  static async transactionGet(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.transaction.get',
      params: request.params || [],
    });
    return result;
  }

  static async estimateFee(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.estimatefee',
      params: request.params || [],
    });
    return result;
  }
}

export { Blockchain };
