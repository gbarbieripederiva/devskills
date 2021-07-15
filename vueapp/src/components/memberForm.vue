<template>
    <form class="members-form" id="addMemberForm" @submit="handleSubmit">
        <input v-model="firstName" type="text" name="firstName" id="firstname" placeholder="First Name">
        <input v-model="lastName" type="text" name="lastName" id="lastname" placeholder="Last Name">
        <input v-model="address" type="text" name="address" id="address" placeholder="Address">
        <input v-model="ssn" type="text" name="ssn" id="ssn" placeholder="SSN">
        <div class="form-footer">
            <button type="reset">Reset</button>
            <button :disabled="disableSubmit" type="submit" id="addMemberFormSaveBtn">Save</button>
        </div>
    </form>
</template>

<script lang="ts">
import {Vue,Component, Emit} from "vue-property-decorator";
import {isValidMember, Member, postMember} from "@/scripts/api";

@Component
export default class Main extends Vue{
    private firstName = "";
    private lastName = "";
    private address = "";
    private ssn = "";

   @Emit('memberAdded')
    onMemberAdded(member:Member):Member{
        return member;
    }

    get member():Member{
        return {
            firstName:this.firstName,
            lastName:this.lastName,
            address:this.address,
            ssn:this.ssn
        } as Member
    }
    get disableSubmit():boolean{
        return !isValidMember(this.member);
    }

    handleSubmit(event:Event):void{
        const member = this.member;
        event.preventDefault();
        if(isValidMember(member)){
            try {
                postMember(member).then(()=>{
                    this.onMemberAdded(member);
                });       
            } catch (error) {
                this.$showErrorToast("Could not upload member")
            }
        }else{
            this.$showErrorToast("Member information is invalid");
        }
    }
}
</script>

<style scoped>

/* Member form */
.members-form{
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: var(--white);
}
.members-form input{
    margin: 1em;
    height: 3em;
    border: 1px solid black;
    padding-left: 1em;
}
.members-form input::placeholder{
    color: black;
}

.form-footer{
    display: flex;
    justify-content: space-around;
}
.form-footer button{
    border-radius: 100%;
    height: 3.7em;
    width: 3.7em;
    background-color: var(--white);
}
</style>