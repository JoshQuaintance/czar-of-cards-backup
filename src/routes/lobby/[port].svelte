<script context="module">
    export function load({ params }) {
        return {
            props: {
                port: params?.port
            }
        };
    }
</script>

<script lang="ts">
    import { getGameSocket } from '$utils/realtime';

    export let port;
    let playerList = [];

    const gameSocket = getGameSocket(port);

    gameSocket.emit('get-player-list');

    gameSocket.on('player-list-update', (data) => {
        playerList = [...playerList, ...JSON.parse(data)];
    });
</script>

{port}

{#each playerList as player, i}
    <p>{player}</p>
{/each}
