import { ElectrumUtil } from '../util';
import { IElectrumRequestBody } from '../';

class Blockchain {
  static async numBlocksSubscribe(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.numblocks.subscribe',
      params: request.params || [],
    });
    return result;
  }

  static async headersSubscribe(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.headers.subscribe',
      params: request.params || [],
    });
    return result;
  }

  static async addressSubscribe(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.address.subscribe',
      params: request.params || [],
    });
    return result;
  }

  static async addressGetHistory(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.address.get_history',
      params: request.params || [],
    });
    return result;
  }

  static async addressGetMempool(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.address.get_mempool',
      params: request.params || [],
    });
    return result;
  }

  static async addressGetBalance(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.address.get_balance',
      params: request.params || [],
    });
    return result;
  }

  static async addressGetProof(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.address.get_proof',
      params: request.params || [],
    });
    return result;
  }

  static async addressListUnspent(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.address.listunspent',
      params: request.params || [],
    });
    return result;
  }

  static async utxoGetAddress(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.utxo.get_address',
      params: request.params || [],
    });
    return result;
  }

  static async blockGetHeader(request: IElectrumRequestBody) {
    const result = await ElectrumUtil.makeRequest({
      socket: request.socket,
      id: request.id,
      method: 'blockchain.block.get_header',
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
