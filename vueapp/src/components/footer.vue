<template>
    <footer class="footer">
        <p>Copyright</p>
        <p>All rights reserved</p>
    </footer>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class Footer extends Vue{
    
}
</script>

<style scoped>
/* Footer */
.footer{
    display: flex;
    justify-content: space-between;
    background-color: var(--blue);
    padding-left: 3em;
    padding-right: 3em;
    border:1px solid black;
}
.footer p{
    font-weight: bold;
}
</style>