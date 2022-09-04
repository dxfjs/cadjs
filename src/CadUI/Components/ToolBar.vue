<template>
    <div class="cadjs__toolbar">
        <div class="cadjs__toolbar__group">
            <button @click="$emit('cmd', CommandNames.Segment)">Line</button>
            <button @click="$emit('cmd', CommandNames.Circle)">Circle</button>
            <button @click="$emit('cmd', CommandNames.Arc)">Arc</button>
            <button @click="$emit('cmd', CommandNames.Rectangle)">Rectangle</button>
        </div>
        <div class="cadjs__toolbar__group">
            <button @click="$emit('undo')">Undo</button>
            <button @click="$emit('select')">Select</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CommandNames } from '../../CadEngine';
</script>

<style lang="css">
.cadjs__toolbar {
    background-color: inherit;
    display: flex;
    flex-direction: row;
    justify-items: center;
    justify-content: space-between;
    padding: 5px;
    border: 1px solid var(--cadjs-toolbar-border);
    margin: 20px 20px 0 20px;
    border-radius: 10px 10px 0 0;
}
.cadjs__toolbar button {
    background-color: var(--cadjs-toolbar-button-background);
    border: 1px solid transparent;
    cursor: pointer;
    font-size: 14px;
    padding: 15px 10px;
    color: aliceblue;
    border-radius: 5px;
}

.cadjs__toolbar button:hover {
    background-color: var(--cadjs-toolbar-button-hover-background);
    border: 1px solid var(--cadjs-toolbar-border);
}
</style>
