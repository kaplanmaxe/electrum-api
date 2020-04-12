import { expect } from 'chai';
import * as fs from 'fs';
import { Server } from '../../src';
import { TestUtils } from '../util';

describe('Electrum server method tests', () => {
  it('should receive version', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Server.version({ socket, id: 1 });
    TestUtils.closeSocket(socket);

    expect(response.result[0].substring(0, 8)).to.equal('Electrum');
  });

  it('should receive banner', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Server.banner({ socket, id: 1 });
    TestUtils.closeSocket(socket);
    expect(response.result).to.contain('Welcome to this Electrum server!');
  });

  it('should receive donation address', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Server.donationAddress({ socket, id: 1 });
    TestUtils.closeSocket(socket);
    const prefixes = ['b', '1', '3'];
    expect(prefixes.indexOf(response.result.charAt(0))).to.be.greaterThan(-1);
  });

  it('should receive a list of peers', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Server.peersSubscribe({ socket, id: 1 });
    TestUtils.closeSocket(socket);
    expect(typeof response.result).to.equal('object');
    expect(response.result[0][0]).to.contain('.');
  });
});
