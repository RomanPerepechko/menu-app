<template>
    <div style="margin-bottom:16px" class="menu-element">
        <div class="menu-element__icon-placeholder">
            <img :src="require(`@/assets/icons/${menuElement.type}.png`)" alt=""
                class="menu-element__icon-placeholder__icon">
        </div>
        <div v-if="isEdit" class="input-block">
            <input class="input-block__input" v-model="title"> <button class="input-block__submit"
                @click="editName()">ok</button>
        </div>

        <div v-if="!isEdit" class="menu-element__name">{{ menuElement.name }}</div>
        <div class="buttons-block">
            <img @click="isEdit = true" src="@/assets/icons/pencil.png" alt="" class="button-edit">
            <img @click="deleteElement()" src="@/assets/icons/cart.png" alt="" class="button-delete">
        </div>
    </div>
    <div v-if="true" class="menu-element"
        style="flex-direction:column;align-items: flex-start;justify-content: center;">
        <node v-for="child in menuElement.children" :key="child.id" :menuElement="child"></node>
    </div>
</template>
<script>
/* eslint-disable */
import { useStore } from "vuex";
export default {
    name: 'node',
    props: {
        menuElement: Object,
    },
    data() {
        const store = useStore();
        return {
            store,
            title: this.menuElement.name,
            isEdit: false
        }
    },
    methods: {
        editName() {
            this.store.dispatch("setElementName", { title: this.title, id: this.menuElement.id });
            this.isEdit = false;
        },
        deleteElement() {
            this.store.dispatch("deleteElement", this.menuElement.id);
        }
    }
}
</script>
<style scoped>
.buttons-block {
    display: flex;
}

.button-edit {
    margin-right: 4px;
    width: 15px;
    height: 15px;
}

.button-delete {
    width: 15px;
    height: 15px;
}

.menu-element {
    padding-left: 25px;
    display: flex;
    align-items: center;
    /* width: 200px;
    justify-content: space-between; */
}


.menu-element__icon-placeholder {
    max-width: 30px;
    max-height: 30px;
    margin-right: 16px;
}

.menu-element__icon-placeholder__icon {
    width: 30px;
    height: 100%;
    max-height: 30px;
    /* object-fit: cover; */
}
</style>