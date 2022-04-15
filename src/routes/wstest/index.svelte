<script lang="ts">
    import io from 'socket.io-client';
    const socket = io('http://localhost:3030');

    let time;

    socket.on('time', (timeString) => {
        time = 'Server time: ' + timeString;
    });
</script>

<p>
    {time}
</p>
