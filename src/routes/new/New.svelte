<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import { v4 as uuid } from 'uuid';

    import BackButton from '$components/BackButton.svelte';
    import { cardSet } from '$utils/stores';
    import { getGameSocket, getNewRoomSocket } from '$utils/realtime';
    import type { Socket } from 'socket.io-client';

    const newRoomSocket = getNewRoomSocket();
    // let metadata;

    let hidePassword = false,
        cardSetWindowOpen = false;
    let pwdInput: HTMLInputElement,
        checkboxes: HTMLInputElement[] = [],
        using = [];
    let idleTimer = 35,
        winningScore = 8,
        playerLimit = 10;
    let username: string, roomId: string;

    let usersInRoom = [];
    let hostPassword: string = null;
    let gameSocket: Socket = null;

    function selectAll() {
        checkboxes.forEach((el: HTMLInputElement) => {
            el.checked = true;
        });
    }

    function setCardSet() {
        for (let i = 0; i < checkboxes.length; i++) if (checkboxes[i].checked) using.push(i);

        cardSet.set(using);

        cardSetWindowOpen = false;

        using = [];
    }

    function initGameSocket() {
        gameSocket.emit('identification', { username, hostPassword });

        gameSocket.once('init-player-list', (playerList) => {
            console.log(playerList);
            usersInRoom = [...usersInRoom, ...JSON.parse(playerList)];
        });
    }

    async function openLobby() {
        roomId = uuid().slice(0, 6).toUpperCase();

        let payload = {
            host: username,
            password: pwdInput.value,
            roomId,
            idleTimer,
            winningScore,
            playerLimit,
            cardSet: $cardSet
        };

        newRoomSocket.once('room-created', (data) => {
            if (data.created == true) {
                newRoomSocket.disconnect();

                hostPassword = data.hostPassword;
                gameSocket = getGameSocket(data.port);

                initGameSocket();

                return;
            } else alert('Room Creation Failed');
        });

        newRoomSocket.emit('create-new-room', payload);
    }
</script>

{#await import('$data/cards/cah-metadata-cards.json')}
    <p>Loading Data</p>
{:then { default: metadata }}
    <div class="p-5 w-screen h-screen m-0">
        <BackButton />

        <h1 class="pt-5 ml11 text-black-800 text-2xl sm:text-1xl md:text-4xl font-bold mb-4 md:mb-6 font-inter">
            Create a new game!
        </h1>

        <div id="title-wrapper">
            <h2 class="text-lg sm:text-md md:text-xl font-semibold font-inter">Game Options</h2>

            <div id="option-wrapper" class="border-b-2 border-slate-500 p-4 grid grid-cols-2 h-full">
                <div class="columns-1 flex flex-col justify-around items-start">
                    <!-- Score to win -->
                    <div class="mb-4">
                        <label
                            for="score-to-win"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Score to win</label>
                        <input
                            type="number"
                            bind:value={winningScore}
                            id="score-to-win"
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="8"
                            required
                            min="4"
                            max="45" />
                    </div>

                    <!-- Idle timer  -->
                    <div class="mb-4">
                        <label for="idle-timer" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >Idle timer <small>(in seconds)</small></label>
                        <input
                            type="number"
                            bind:value={idleTimer}
                            id="idle-timer"
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="35"
                            min="25"
                            max="9999" />

                        <small><i>*9999 disables the timer (no timeout)</i></small>
                    </div>

                    <div class="mb-4 mt-2">
                        <p>Select Card Sets</p>

                        <button
                            type="number"
                            id="open-card-set"
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light w-full"
                            on:click={() => (cardSetWindowOpen = true)}>Open Window</button>
                    </div>
                </div>

                <div class="columns-2 flex flex-col justify-around items-start">
                    <!-- Player Limit -->
                    <div class="mb-4">
                        <label
                            for="player-limit"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Player limit</label>
                        <input
                            bind:value={playerLimit}
                            type="number"
                            id="player-limit"
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            placeholder="10"
                            required
                            min="3"
                            max="15" />
                    </div>

                    <!-- Game Password -->
                    <div class="mb-4">
                        <label
                            for="player-limit"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >Game Password</label>
                        <input
                            type={hidePassword ? 'password' : 'text'}
                            bind:this={pwdInput}
                            id="player-limit"
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />

                        <span class="ml-1">
                            <input type="checkbox" bind:checked={hidePassword} />
                            <small>Hide Password</small>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div id="title-wrapper2" class="mt-4 grid grid-cols-2">
            <div id="match-info" class="columns-1 ">
                <h2 class="text-lg sm:text-md md:text-xl font-semibold font-inter mb-4">Match</h2>

                <div class="grid grid-cols-2">
                    <form class="flex flex-col justify-between items-start h-full" on:submit|preventDefault={openLobby}>
                        <span id="username" class="mb-6">
                            <label for="username">Username</label>
                            <input
                                type="text"
                                bind:value={username}
                                id="username"
                                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                required />
                            <small><i>*This is your username</i></small>
                        </span>

                        <button
                            type="submit"
                            class="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base py-3 px-6 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700"
                            >Open Lobby</button>
                    </form>

                    <div>
                        <label for="room-id">Room Id</label>
                        <input
                            type="text"
                            disabled
                            bind:value={roomId}
                            id="room-id"
                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light text-center tracking-[.5em] "
                            required
                            placeholder="XXXXX" />
                        <small><i>*Open the lobby to generate a room id</i></small>
                    </div>
                </div>
            </div>

            <div id="match-info" class="columns-2 flex flex-col items-start justify-around">
                <h2 class="text-lg sm:text-md md:text-xl font-semibold font-inter">Players in Lobby</h2>

                <div
                    id="players-container"
                    class="border-slate-600 empty:border-0 border-2 rounded-md w-full h-full gap-4 p-3 grid grid-cols-2">
                    {#each usersInRoom as player, i}
                        <p class="even:text-right">{player}</p>
                    {/each}
                </div>
            </div>
        </div>
    </div>

    <div id="card-set-window" class:hidden={!cardSetWindowOpen} class="bg-slate-200 absolute top-0 left-0 z-50 p-4">
        <span class="w-full flex justify-center items-center">
            <h1 class="ml11 text-black-800 text-3xl sm:text-2xl md:text-5xl font-bold mb-8 md:mb-12 font-inter">
                Card Sets
            </h1>
        </span>

        <span class="flex flex-row justify-start items-center ">
            <Button btnColor="dark" on:click={selectAll} name="Select All" textSize="text-sm" />
        </span>
        <div id="sets-container" class="relative w-full mb-8 p-4 border-2 border-slate-400 rounded-md">
            <fieldset class="grid grid-cols-3">
                {#each metadata as { name, id, official }}
                    <div class="flex flex-row justify-start items-center ">
                        <input type="checkbox" id="{name}-checkbox" data-card-id={id} bind:this={checkboxes[id]} />
                        <label for="{name}-checkbox" class="align-baseline ml-1">{name}</label>
                    </div>
                {/each}
            </fieldset>
        </div>

        <span class="w-full flex justify-center items-center">
            <Button btnColor="green-outline" name="Done" textSize="text-xl" on:click={setCardSet} />
        </span>
    </div>
{/await}
