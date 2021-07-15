<template>
    <main>
        <span class="main-body">
            <MemberForm @memberAdded="appendMember"/>
            <MemberTable :members="members"/>
        </span>
    </main>
</template>

<script lang="ts">
import {Vue,Component} from "vue-property-decorator";
import MemberForm from "@/components/memberForm.vue";
import MemberTable from "@/components/memberTable.vue";
import {getMembers, Member} from "@/scripts/api";

@Component({
    components:{
        MemberForm,
        MemberTable
    }
})
export default class Main extends Vue{
    private members:Member[] = []

    async mounted():Promise<void>{
        try {
            this.members = await getMembers();
        } catch (error) {
            console.error(error);
        }
    }

    appendMember(member:Member):void{
        this.members.push(member);
    }
}
</script>

<style scoped>
/* Main */
main{
    display: flex;
    justify-content: center;
    min-height: 70%;
}
.main-body{
    display: flex;
    justify-content: center;
    background-color: var(--red);
    min-width: 80%;
}
.main-body>*{
    margin: 1em;
    flex-grow: 1;
}
</style>