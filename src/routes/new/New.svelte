<script lang="ts">
    import BackButton from '$components/BackButton.svelte';
    import metadata from '$data/cards/cah-metadata-cards.json';
    import { Button } from 'flowbite-svelte';

    let hidePassword = false;
    let cardSetWindowOpen = true;
    let fields: HTMLFieldSetElement;
    let checkboxes = [];
    let checkedBoxes = [];

    function selectAll() {
        checkboxes.forEach((el: HTMLInputElement) => {
            el.checked = true;
        });
    }
</script>

<div class="p-5 w-screen h-screen m-0">
    <BackButton />

    <h1 class="pt-5 ml11 text-black-800 text-2xl sm:text-1xl md:text-4xl font-bold mb-4 md:mb-6 font-inter">
        Create a new game!
    </h1>

    <div id="title-wrapper">
        <h2 class="text-lg sm:text-md md:text-xl font-semibold font-inter">Game Options</h2>

        <div id="option-wrapper" class="border-2 rounded-md border-slate-500 p-4 grid grid-cols-2 h-full">
            <div class="columns-1 flex flex-col justify-around items-start">
                <!-- Score to win -->
                <div class="mb-4">
                    <label for="score-to-win" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Score to win</label>
                    <input
                        type="number"
                        id="score-to-win"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="8"
                        required
                        min="4"
                        max="45"
                        value="8" />
                </div>

                <!-- Idle timer  -->
                <div class="mb-4">
                    <label for="score-to-win" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Idle timer <small>(in seconds)</small></label>
                    <input
                        type="number"
                        id="score-to-win"
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
                    <label for="player-limit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Player limit</label>
                    <input
                        type="number"
                        id="player-limit"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="10"
                        required
                        min="3"
                        max="15"
                        value="10" />
                </div>

                <!-- Game Password -->
                <div class="mb-4">
                    <label for="player-limit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >Game Password</label>
                    <input
                        type={hidePassword ? 'password' : 'text'}
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
</div>

<div id="card-set-window" class:hidden={!cardSetWindowOpen} class="bg-slate-200 absolute top-0 left-0 z-50 p-4">
    <span class="w-full flex justify-center items-center">
        <h1 class="ml11 text-black-800 text-3xl sm:text-2xl md:text-5xl font-bold mb-8 md:mb-12 font-inter">
            Card Sets
        </h1>
    </span>

    <span class="flex flex-row justify-start items-center ">
        <input type="checkbox" id="select-all" on:click={selectAll} /><label for="select-all" class="ml-1"
            >Select All</label>
    </span>
    <div id="sets-container" class="relative w-full mb-8 p-4 border-2 border-slate-400 rounded-md">
        <fieldset bind:this={fields} class="grid grid-cols-3">
            {#each metadata as { name, id, official }}
                <div class="flex flex-row justify-start items-center ">
                    <input
                        type="checkbox"
                        id="{name}-checkbox"
                        bind:this={checkboxes[id]}
                        bind:checked={checkedBoxes[id]} />
                    <label for="{name}-checkbox" class="align-baseline ml-1">{name}</label>
                </div>
            {/each}
        </fieldset>
    </div>

    <span class="w-full flex justify-center items-center">
        <Button btnColor="green-outline" name="Done" textSize="text-xl" />
    </span>
</div>
