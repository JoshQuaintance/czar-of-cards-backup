import ioClient from 'socket.io-client';

const io = ioClient(import.meta.env['VITE_SECRET_SERVER_URI'] as string);

export const socket = io;
