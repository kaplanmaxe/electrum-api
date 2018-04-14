import { expect } from 'chai';
import * as fs from 'fs';
import { Server } from '../../src';
import { TestUtils } from '../util';

describe('Electrum server method tests', () => {
  it('should receive a list of peers', async () => {
    const socket = await TestUtils.constructSocket('185.64.116.15', 50002);
    const response = await Server.peersSubscribe({ socket, id: 1 });
    TestUtils.closeSocket(socket);
    expect(response).to.have.property('result');
  });
});
