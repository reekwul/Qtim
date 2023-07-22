<script setup lang="ts">
import Post from "~/utils/post";
import {NsPost} from "~/types";

const
    { id } = useRoute().params,
    post = ref({} as NsPost.Detailed),
    loading = ref(false),
    error = ref('');

onMounted(()=>{
    getPost()
})
function getPost(){
    loading.value = true
    error.value = ''

    Post.get(String(id))
        .then((res)=>{
            post.value = res
        })
        .catch(()=>{
            error.value = 'Неудалось загрузить данные'
        })
        .finally(()=>{
            loading.value = false
        })
}


function goBack(){
    useRouter().back()
}
</script>

<template>
    <transition mode="out-in">
        <div v-if="!error && !loading" class="post">
            <div class="post__meta">
                <button class="btn" @click="goBack">
                    ← Назад
                </button>
                <div class="data">
                    {{post.date}} {{post.time}}
                </div>
            </div>
            <div class="post__title">
                <h1 class="header">
                    {{post.title}}
                </h1>
                <p class="preview">
                    {{post.preview}}
                </p>
            </div>
            <div class="post__image">
                <img :src="post.image || NO_PICTURE"
                     alt="не удалось загрузить картинку"
                     class="image"
                     @error="(event)=>event.target.src = NO_PICTURE"
                >
            </div>

            <div class="post__description">
                {{post.description}}
            </div>
            <button class="btn" @click="goBack">
                ← Назад
            </button>
        </div>
        <div v-else-if="loading">
            Идет загрузка
        </div>
        <div v-else>
            <div>
                {{error}}
            </div>
            <button class="btn" @click="getPost">
                Попробовать еще раз
            </button>
            <button class="btn" @click="goBack">
                Вернутся назад
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

.post{
    max-width: 1440px;
    height: 100vh;
    margin: 30px auto;

    .post__meta{
        display: flex;
        align-items: center;
        justify-content: space-between;

        .date{
            color:#B1B0B0;
        }
    }
    .post__title{
        .header{
            margin-top: 5vh;
            margin-bottom:1vh;
            font-size: 32px;
        }
        .preview{
            font-size: 14px;
            margin: 0;
            color:#B1B0B0;
        }
    }
    .post__image{
        text-align: center;
        margin: 20px auto;
        .image{
            width: 640px;
            height: 480px;
        }
    }
    .post__description{
        max-width: 768px;
        margin:20px auto;
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