<script setup lang="ts">
const
    {length, viewCount, activePage} = defineProps<{ length: number, viewCount: number, activePage: number }>(),
    page = ref(Math.ceil(length / viewCount)),
    emit = defineEmits<{ (e: 'update:activePage', value: number): void }>();

function changePage(index:number) {
    emit('update:activePage', index);
    useRouter().push({path:'/',query:{page:index}})
}
</script>

<template>
    <ul class="c-pagination">
        <li
            v-for="index in page"
            :key="index"
            :value="index"
            @click="changePage(index)"
            :class="['item',{active:index === activePage}]"
        >
            {{ index }}
        </li>
    </ul>
</template>

<style scoped>
.c-pagination{
    list-style: none;
    padding: 0;
    display: flex;
    column-gap: 24px;
    justify-content: center;

    .item{
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 8px 48px 4px #0234E30A, 0 0 10px 0 #0234E308;
        border-radius: 15px;
        width: 30px;
        height: 30px;
        transition: 0.2s ease-in-out;
        cursor: pointer;


        &:hover{
            color: white;
            background-color:#6495ED5F ;
        }

        &.active{
            color: white;
            background-color: cornflowerblue;
        }

    }
}
</style>