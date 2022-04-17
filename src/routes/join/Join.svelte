<script lang="ts">
    import { goto } from '$app/navigation';

    import BackButton from '$components/BackButton.svelte';
    import { getGameSocket, getRoomFinderSocket } from '$utils/realtime';
    import { Button } from 'flowbite-svelte';

    let roomId: string;
    let gameSocket;
    let username;

    function joinRoom() {
        let roomFinder = getRoomFinderSocket();

        roomFinder.emit('connect-to-room', roomId.toUpperCase());

        roomFinder.once('room-not-found', (message) => {
            alert(message);
        });

        roomFinder.on('password-required', () => {
            let pwd = prompt('Password Required! Enter password in:');

            roomFinder.emit('room-pass-attempt', pwd);
        });

        roomFinder.once('room-found', (port) => {
            gameSocket = getGameSocket(port);

            gameSocket.emit('identification', { username });

            goto('/lobby/' + port);
        });
    }
</script>

<form class="p-5 w-screen h-screen m-0" on:submit|preventDefault={joinRoom}>
    <BackButton />

    <h1 class="pt-5 ml11 text-black-800 text-2xl sm:text-1xl md:text-4xl font-bold mb-4 md:mb-6 font-inter">
        Find a lobby!
    </h1>

    <label for="room-id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
    <input
        type="text"
        bind:value={username}
        id="room-id"
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light "
        required />

    <div class="mt-4">
        <!-- Room ID -->
        <div class="mb-4">
            <label for="room-id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Enter Room ID:</label>
            <input
                type="text"
                bind:value={roomId}
                id="room-id"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light text-center tracking-[.5em]
                uppercase mb-4"
                placeholder="XXXXX"
                autocapitalize="characters"
                required
                maxlength="6" />

            <Button btnColor="dark" name="Join Room" btnType="submit" />
        </div>
    </div>
</form>
