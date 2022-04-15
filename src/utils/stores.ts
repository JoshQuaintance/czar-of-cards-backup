import { Writable, writable } from 'svelte/store';

export const cardSet: Writable<number[]> = writable([]);

export const usedWhite: Writable<number[]> = writable([]);
export const usedBlack: Writable<number[]> = writable([]);

export const unusedWhite: Writable<number[]> = writable([]);
export const unusedBlack: Writable<number[]> = writable([]);
