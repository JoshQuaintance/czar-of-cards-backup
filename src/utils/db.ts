import mongoose from 'mongoose';

async function initSchemas() {
    // Checks if mongoose is connected to the db or not
    // and if it's not then do so
    if (mongoose.connection.readyState != 1) return;

    const LobbySchema: mongoose.Schema<unknown> = new mongoose.Schema({
        roomId: { type: String, required: true, unique: true },
        host: { type: String, required: true },
        users: { type: Array<string>(), required: true, default: [] },
        password: { type: String, required: true },
        usedWhite: { type: Array<number>(), default: [] },
        usedBlack: { type: Array<number>(), default: [] },
        nextBlack: { type: String, default: '' },
        nextWhite: { type: Array<number>(), default: [] },
        inProgress: { type: Boolean, required: true, default: false },
        idleTimer: { type: Number, required: true },
        winningScore: { type: Number, required: true },
        playerLimit: { type: Number, required: true }
    });

    return {
        LobbySchema
    };
}

export async function connectToDB(): Promise<{
    mongoose: typeof mongoose;
    schemas: Promise<{ LobbySchema: mongoose.Schema }>;
}> {
    try {
        // Before connecting, always check if somehow the database is already connected
        if (!mongoose?.connection || mongoose.connection.readyState != 1)
            await mongoose.connect(import.meta.env['VITE_SECRET_MONGO_URI'] as string);
    } catch (err) {
        console.error(err);
    }

    const schemas = initSchemas();

    return {
        mongoose,
        schemas
    };
}
