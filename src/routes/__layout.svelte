<script context="module">
    export const load = async ({ url }) => {
        return {
            props: {
                key: url.pathname
            }
        };
    };
</script>

<script lang="ts">
    import '../app.css';
</script>

<slot />
