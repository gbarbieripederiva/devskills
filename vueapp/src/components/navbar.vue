<template>
    <nav class="navbar">
        <button>Home</button>
        <button>Other page</button>
    </nav>
</template>

<script lang="ts">
import {Component,Vue} from "vue-property-decorator";

@Component
export default class Navbar extends Vue{
    
}
</script>

<style scoped>
/* Navbar */
.navbar{
    display: flex;
    justify-content: space-around;
    height: 3em;
}
.navbar button{
    background-color: var(--green);
    width: 100%;
    border: 1px solid black;
}
.navbar button:active{
    box-shadow: inset -2px -2px 4px 2px rgba(31, 31, 31, 0.2);
}
</style>