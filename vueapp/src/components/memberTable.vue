<template>
    <table class="members-table">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>SSN</th>
            </tr>
        </thead>
        <tbody id="memberTbody">
            <tr v-for="m of members" :key="m.ssn">
                <td>{{m.firstName}}</td>
                <td>{{m.lastName}}</td>
                <td>{{m.address}}</td>
                <td>{{m.ssn}}</td>
            </tr>
            <tr id="memberTbodyEmptytr">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import {Vue,Component,Prop} from "vue-property-decorator";
import {Member} from "@/scripts/api";

@Component
export default class Main extends Vue{
    @Prop({ default: () => [] })
    readonly members!:Member[];
}
</script>

<style scoped>

/* Member table */
.members-table{
    background-color: var(--white);
    border-collapse: collapse;
    text-align: center;
}
.members-table th{
    border: 1px solid black;
    padding: 1em;
}
.members-table td {
    border-right: 1px solid black;
    border-left: 1px solid black;
    padding: 0em 1em;
}
.members-table tr{
    height: 2em;
}
#memberTbodyEmptytr{
    height: auto;
}
</style>