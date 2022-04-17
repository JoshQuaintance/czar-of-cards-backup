<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import { goto } from '$app/navigation';

    function createGame() {
        goto('/new');
    }
</script>

<!-- !TODO! MAKE SURE TO PUT LICENSING -->

<main class="h-screen w-screen">
    <div class="wrapper flex justify-center items-center flex-col w-full h-full gap-2">
        <div class="container p-24 flex-col">
            <div class="text-wrapper mb-8">
                <h1 class="ml11 text-black-800 text-3xl sm:text-2xl md:text-5xl font-bold mb-8 md:mb-12 font-inter">
                    Czar of Cards
                </h1>

                <p>
                    This is a clone of <a
                        class="fancy-link"
                        href="https://www.cardsagainsthumanity.com/"
                        target="_blank">Cards Against Humanity</a>
                    made because I think
                    <a class="fancy-link" href="https://pyx-1.pretendyoure.xyz/zy/game.jsp" target="_blank"
                        >Pretend You're xyzzy</a>
                    needs a <strong>massive</strong> overhaul
                </p>
            </div>

            <div class="buttons flex items-start justify-start">
                <Button btnColor="blue-outline" name="Create a Game" textSize="text-base" on:click={createGame} />
                <Button
                    btnColor="blue-outline"
                    name="Join a Game"
                    textSize="text-base"
                    on:click={() => goto('/join')} />
            </div>
        </div>
        <!-- container -->
    </div>
    <!-- wrapper -->
</main>
