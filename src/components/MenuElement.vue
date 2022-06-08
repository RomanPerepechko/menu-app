<template>
    <div style="margin-bottom:16px" class="menu-element">
        <div class="element-info">
            <div class="element-info__icon-placeholder">
                <img :src="require(`@/assets/icons/${menuElement.type}.png`)" alt=""
                    class="element-info__icon-placeholder__icon">
            </div>
            <div v-if="!isEdit" class="element-info__name">{{ menuElement.type }} {{ menuElement.name }}</div>
            <div v-if="isEdit" class="element-info__input-block">
                <input class="element-info__input-block__input" v-model="title"> <button class="element-info__input-block__submit"
                    @click="editNameElement()">ok</button>
            </div>
        </div>
        <div class="buttons-block">
            <img @click="isEdit = true" src="@/assets/icons/pencil.png" alt="" class="buttons-block__button-edit">
            <img @click="deleteElement()" src="@/assets/icons/cart.png" alt="" class="buttons-block__button-delete">
        </div>
    </div>
    <div v-if="true" class="menu-element node" style="">
        <node-tree v-for="child in menuElement.children" :key="child.id" :menuElement="child"></node-tree>
        <!-- рекурсивно вызываем компонент для всех последующих уровней вложенности -->
    </div>
</template>
<script> 
import { useStore } from "vuex";
export default {
    name: 'node-tree',
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
        editNameElement() {
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
.node{
    flex-direction:column;
}
.element-info {
    display: flex;
    align-items: center;
}

.buttons-block {
    display: flex;
}

.buttons-block__button-edit {
    margin-right: 4px;
    width: 15px;
    height: 15px;
}

.buttons-block__button-delete {
    width: 15px;
    height: 15px;
}

.menu-element {
    padding-left: 25px;
    display: flex;
    align-items: center;
    width: calc(100% - 25px);
    justify-content: space-between;
}

.element-info__icon-placeholder {
    margin-right: 16px;
}

.element-info__icon-placeholder__icon {
    width: 20px;
}
</style>