<script setup lang="ts">
import Post from "~/utils/post";
import {NsPost} from "~/types";

const
    data = reactive({
        posts: [] as NsPost.Preview[],
        viewCount: 16,
        activePage: 1,
        loading: true,
        error: ''
    }),
    viewPosts = computed(
        (): NsPost.Preview[] => {
            const
                start = (data.activePage - 1) * data.viewCount,
                end = start + data.viewCount ;
            return data.posts.slice(start, end)
        }
    );
onMounted(() => {
    getList()
    data.activePage = Number(useRoute().query.page) || 1
})

function getList() {
    data.loading = true
    data.error = ''
    Post.getList()
        .then((posts) => {
            data.posts.push(...posts)
        })
        .catch(() => {
            data.error = 'Не удалось загрузить данные'
        })
        .finally(() => data.loading = false)
}

</script>

<template>
    <transition mode="out-in">
        <div v-if="!data.error && !data.loading">
            <ul class="card-list">
                <cCard
                    v-for="post in viewPosts"
                    :key="post.id + ' - post'"
                    :item="post"
                />
            </ul>
            <cPagination
                :length="data.posts.length"
                :view-count="data.viewCount"
                v-model:active-page="data.activePage"
            />
        </div>
        <div v-else-if="data.loading">
            Идет загрузка
        </div>
        <div v-else>
            {{ data.error }}
            <button class="btn" @click="getList">
                Попробовать еще раз
            </button>
        </div>
    </transition>
</template>

<style scoped lang="scss">

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.card-list{
    max-width: 1440px;
    display: grid;
    grid-template-columns:repeat(4, 1fr);
    grid-gap:20px ;
    padding: 2vw;
    margin: 0 auto;
    
    @media (max-width: 1024px) {
        grid-template-columns:repeat(3, 1fr);
    }
    @media (max-width: 768px) {
        grid-template-columns:repeat(2, 1fr);
    }
    @media (max-width: 425px) {
        grid-template-columns:repeat(1, 1fr);
    }
}

.btn {
    grid-area: c;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-color: transparent;
    border-radius: 8px;
    transition: 0.4s  ease-in-out;

    &:hover{
        color: white;
        background-color: #6495ED5F;
    }
    &:active{
        background-color: cornflowerblue;
    }
}
</style>