import ioClient, { Socket } from 'socket.io-client';

const newRoomIO = ioClient((import.meta.env['VITE_SECRET_SERVER_URI'] as string) + ':3030', {
    upgrade: false,
    transports: ['websocket']
});

let gameSocket: Socket | null = null;
let roomFinder: Socket = null;

export function getNewRoomSocket(): Socket {
    newRoomIO.connect();

    return newRoomIO;
}

export function getGameSocket(port: number, hostPassword: string = null) {
    if (gameSocket) return gameSocket;

    gameSocket = ioClient((import.meta.env['VITE_SECRET_SERVER_URI'] as string) + `:${port}`, {
        upgrade: false,
        transports: ['websocket']
    });

    gameSocket.connect();

    return gameSocket;
}

export function getRoomFinderSocket(): Socket {
    if (roomFinder) return roomFinder;

    roomFinder = ioClient((import.meta.env['VITE_SECRET_SERVER_URI'] as string) + ':3031', {
        upgrade: false,
        transports: ['websocket']
    });

    roomFinder.connect();

    return roomFinder;
}
