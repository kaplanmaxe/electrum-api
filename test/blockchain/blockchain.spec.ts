import { expect } from 'chai';
import * as fs from 'fs';
import { Blockchain, Utils } from '../../src';
import { TestUtils } from '../util';

import * as bitcoinjs from 'bitcoinjs-lib';

describe('Electrum blockchain method tests', () => {

  it('should subscribe to receive headers', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Blockchain.headersSubscribe({ socket, id: 1 });
    TestUtils.closeSocket(socket);
    expect(response.result).to.have.property('height');
    expect(response.result).to.have.property('hex');
  });

  it('should subscribe to receive changes to address', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);

    const network = bitcoinjs.networks.bitcoin;
    const scripthash = Utils.addressToScriptHash('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', network);

    const response = await Blockchain.scriptHashSubscribe({
      socket,
      id: 1,
      params: [scripthash]
    });
    TestUtils.closeSocket(socket);
    expect(response.result).to.not.contain('is not a valid address');
    expect(response.result.length).to.equal(64);
  });

  it('should get address history', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);

    const network = bitcoinjs.networks.bitcoin;
    const scripthash = Utils.addressToScriptHash('1MaxKapqcv8KVHw1mTzZd23uvntnLABvnB', network);

    const response = await Blockchain.scriptHashGetHistory({
      socket,
      id: 1,
      params: [scripthash],
    });
    TestUtils.closeSocket(socket);
    expect(response.result[0]).have.property('height');
    expect(response.result[0]).have.property('tx_hash');
  });

  it('should get address mempool', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);

    const network = bitcoinjs.networks.bitcoin;
    const scripthash = Utils.addressToScriptHash('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', network);

    const response = await Blockchain.scriptHashGetMempool({
      socket,
      id: 1,
      params: [scripthash],
    });
    TestUtils.closeSocket(socket);
    expect(response.result).be.an('array');
  });

  it('should get address balance', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);

    const network = bitcoinjs.networks.bitcoin;
    const scripthash = Utils.addressToScriptHash('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', network);

    const response = await Blockchain.scriptHashGetBalance({
      socket,
      id: 1,
      params: [scripthash],
    });
    TestUtils.closeSocket(socket);
    expect(response.result).to.have.property('confirmed');
    expect(response.result).to.have.property('unconfirmed');
  });

  it('should list address unspent', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);

    const network = bitcoinjs.networks.bitcoin;
    const scripthash = Utils.addressToScriptHash('12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX', network);

    const response = await Blockchain.scriptHashListUnspent({
      socket,
      id: 1,
      params: [scripthash],
    });
    TestUtils.closeSocket(socket);
    expect(response.result[0]).to.have.property('tx_hash');
    expect(response.result[0]).to.have.property('height');
    expect(response.result[0]).to.have.property('tx_pos');
    expect(response.result[0]).to.have.property('value');
  });

  it('should get block header from block number', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Blockchain.blockGetHeader({
      socket,
      id: 1,
      params: ['1'],
    });
    TestUtils.closeSocket(socket);
    // The precise format of a deserialized block header varies by coin, and also potentially by height for the same coin.
    // Detailed knowledge of the meaning of a block header is neither necessary nor appropriate in the server.
    // Consequently they were removed from the protocol in version 1.4.

    // Guess you can do: bitcoinjs.Block.fromHex(response.result)
    expect(response.result).to.equal('010000006fe28c0ab6f1b372c1a6a246ae63f74f931e8365e15a089c68d6190000000000982051fd1e4ba744bbbe680e1fee14677ba1a3c3540bf7b1cdb606e857233e0e61bc6649ffff001d01e36299');
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
