import { expect } from 'chai';
import * as fs from 'fs';
import { Blockchain } from '../../src';
import { TestUtils } from '../util';

describe('Electrum blockchain method tests', () => {
  it('should subscribe to receive numblocks', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Blockchain.numBlocksSubscribe({ socket, id: 1 });
    TestUtils.closeSocket(socket);
    expect(typeof response.result).to.equal('number');
  });

  it('should subscribe to receive headers', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Blockchain.headersSubscribe({ socket, id: 1 });
    TestUtils.closeSocket(socket);
    expect(response.result).to.have.property('block_height');
    expect(response.result).to.have.property('version');
    expect(response.result).to.have.property('bits');
    expect(response.result).to.have.property('nonce');
  });

  it('should subscribe to receive changes to address', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Blockchain.addressSubscribe({
      socket,
      id: 1,
      params: ['1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'],
    });
    TestUtils.closeSocket(socket);
    expect(response.result).to.not.contain('is not a valid address');
    expect(response.result.length).to.equal(64);
  });

  it('should get address history', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Blockchain.addressGetHistory({
      socket,
      id: 1,
      params: ['1MaxKapqcv8KVHw1mTzZd23uvntnLABvnB'],
    });
    TestUtils.closeSocket(socket);
    expect(response.result[0]).have.property('height');
    expect(response.result[0]).have.property('tx_hash');
  });

  it('should get address mempool', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Blockchain.addressGetMempool({
      socket,
      id: 1,
      params: ['1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'],
    });
    TestUtils.closeSocket(socket);
    expect(response.result).be.an('array');
  });

  it('should get address balance', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Blockchain.addressGetBalance({
      socket,
      id: 1,
      params: ['1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'],
    });
    TestUtils.closeSocket(socket);
    expect(response.result).to.have.property('confirmed');
    expect(response.result).to.have.property('unconfirmed');
  });

  it('should get address proof', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Blockchain.addressGetBalance({
      socket,
      id: 1,
      params: ['1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'],
    });
    TestUtils.closeSocket(socket);
    expect(response.result).to.have.property('confirmed');
    expect(response.result).to.have.property('unconfirmed');
  });

  it('should list address unspent', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Blockchain.addressListUnspent({
      socket,
      id: 1,
      params: ['1MaxKapqcv8KVHw1mTzZd23uvntnLABvnB'],
    });
    TestUtils.closeSocket(socket);
    expect(response.result[0]).to.have.property('tx_hash');
    expect(response.result[0]).to.have.property('height');
  });

  it('should give address given a utxo', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Blockchain.utxoGetAddress({
      socket,
      id: 1,
      params: ['3387418aaddb4927209c5032f515aa442a6587d6e54677f08a03b8fa7789e688', '1'],
    });
    TestUtils.closeSocket(socket);
    expect(response.result).to.equal('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
  });

  it('should get block header from block number', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Blockchain.blockGetHeader({
      socket,
      id: 1,
      params: ['0'],
    });
    TestUtils.closeSocket(socket);
    expect(response.result).to.have.property('block_height');
    expect(response.result).to.have.property('merkle_root');
    expect(response.result.merkle_root).to.equal('4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b');
  });

  it('should get merkle tree from transaction hash', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Blockchain.transactionGetMerkle({
      socket,
      id: 1,
      params: ['3387418aaddb4927209c5032f515aa442a6587d6e54677f08a03b8fa7789e688', '123723'],
    });
    TestUtils.closeSocket(socket);
    expect(response.result).to.have.property('block_height');
    expect(response.result).to.have.property('merkle');
    expect(response.result.block_height).to.equal(123723);
  });

  it('should get transaction details from transaction hash', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Blockchain.transactionGet({
      socket,
      id: 1,
      params: ['3387418aaddb4927209c5032f515aa442a6587d6e54677f08a03b8fa7789e688'],
    });
    TestUtils.closeSocket(socket);
    expect(response.result.length).to.equal(516);
  });

  it('should get return estimated fee', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Blockchain.estimateFee({
      socket,
      id: 1,
      params: ['2'],
    });
    TestUtils.closeSocket(socket);
    expect(typeof response.result).to.equal('number');
    expect(String(response.result).charAt(1)).to.equal('.');
  });
});
