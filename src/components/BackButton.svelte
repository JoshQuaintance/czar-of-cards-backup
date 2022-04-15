<script lang="ts">
    import { goto, afterNavigate } from '$app/navigation';

    import Icon from './Icon.svelte';
    let previousPage = '/';

    // 'navigation' returns the 'from' URL object, assign to value, and use it later in a function. ex) goto(previousPage)
    afterNavigate((navigation) => {
        previousPage = navigation?.from?.pathname || '/';
    });

    function back() {
        goto(previousPage);
    }
</script>

<span class="flex justify-start items-center cursor-pointer group" on:click={back}>
    <Icon icon="arrow-left-thick" width={32} height={32} class="text-black " />
    <p class="font-bold text-lg font-inter transform group-hover:translate-x-0 -translate-x-4 ">Back</p>
</span>

<style>
    p {
        opacity: 0;
    }

    span:hover > p {
        opacity: 1 !important;
    }
</style>
