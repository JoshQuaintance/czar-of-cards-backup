// import { connectToDB } from '$utils/db';

// export async function post(req) {
//     try {
//         const { mongoose, schemas } = await connectToDB();
//         const { LobbySchema } = await schemas;

//         const Lobby = mongoose.models.Lobbies || mongoose.model('Lobbies', LobbySchema);

//         const body = await req.request.json();
//         const { host, password, roomId, idleTimer, playerLimit, winningScore } = body;

//         console.log(body)

//         console.log('host', host, 'p', password, 'r', roomId, 'i', idleTimer, 'pl', playerLimit, 'w', winningScore)

//         const newLobby = new Lobby({
//             host,
//             password: password || '___',
//             roomId,
//             users: [host],
//             idleTimer,
//             playerLimit,
//             winningScore,
//             inProgress: false,
//             usedWhite: [],
//             usedBlack: [],
//             nextBlack: "",
//             nextWhite: []
//         })

//         let res = await newLobby.save((err: any) => {
//             if (err)
//                 throw {
//                     status: 500,
//                     message: 'Error saving new user credentials',
//                     err
//                 };
//         });

//         console.log('s', res)

//         return {
//             status: 201,
//             body: {
//                 res: JSON.stringify(res),
//                 message: 'Success!'
//             }
//         }

//     } catch (err) {
//         console.log(err)
//         return {
//             status: 500,
//             body: {
//                 err,
//                 message: "Error in server!"
//             }
//         }
//     }
// }
