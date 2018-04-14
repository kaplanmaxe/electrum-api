import { TLSSocket  } from 'tls';
import { Server } from './server';
import { Blockchain } from './blockchain';

export interface IElectrumRequestBody {
  socket: TLSSocket;
  id: number;
  params?: string[];
}

export {
  Server,
  Blockchain,
};
