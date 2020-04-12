import { TLSSocket  } from 'tls';
import { Server } from './server';
import { Blockchain } from './blockchain';
import { Utils } from './util';

export interface IElectrumRequestBody {
  socket: TLSSocket;
  id: number;
  params?: string[];
}

export {
  Server,
  Blockchain,
  Utils,
};
