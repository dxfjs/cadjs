<template>
    <div class="cadjs__container">
        <ToolBar @cmd="command" @undo="undo" @select="select" />
        <canvas ref="canvas" tabindex="1"></canvas>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { CadEngine } from '../CadEngine';
import { CommandNames } from '../CadEngine';
import ToolBar from './Components/ToolBar.vue';

const canvas = ref<HTMLCanvasElement | null>(null);
const engine = ref<CadEngine | null>(null);

onMounted(() => {
    if (canvas.value) {
        const context = canvas.value.getContext('2d');
        if (context) engine.value = new CadEngine(context);
    }
});

function command(commandName: CommandNames) {
    if (engine.value) engine.value.command(commandName);
}

function undo() {
    if (engine.value) engine.value.commandsManager.undo();
}

function select() {
    if (engine.value) engine.value.command(CommandNames.Select);
}
</script>

<style lang="css">
.cadjs__container {
    background-color: var(--cadjs-container-background);
    flex-direction: column;
    display: flex;
    height: 100%;
}

.cadjs__container canvas {
    background-color: var(--cadjs-canvas-background);
    cursor: crosshair;
    height: 100%;
    flex-grow: 1;
    border: 1px solid var(--cadjs-toolbar-border);
    border-top: none;
    margin: 0 20px 20px 20px;
    border-radius: 0 0 10px 10px;
}

.cadjs__container .cadjs__pan {
    cursor: grabbing;
    cursor: -webkit-grabbing;
}
</style>
