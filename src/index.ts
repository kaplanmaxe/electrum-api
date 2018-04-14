import { TLSSocket  } from 'tls';
import { Server } from './server';
import {
  Socket,
} from 'json-rpc-tls';

export interface IElectrumRequestBody {
  socket: TLSSocket;
  id: number;
  params?: string[];
}

export {
  Server,
  Socket,
};
