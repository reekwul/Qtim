<script setup lang="ts">
import {NsPost} from "~/types";
import {NO_PICTURE} from "~/utils/constants";

const {item} = defineProps<{
    item: NsPost.Preview
}>()

function go(id: string | number) {
    useRouter().push('/' + id)
}
</script>

<template>
    <li class="c-card">
        <img :src="item.image || NO_PICTURE"
             alt="не удалось загрузить картинку"
             class="c-card__image"
             @error="(event)=>event.target.src = NO_PICTURE"
        >
        <div class="c-card__text">
            <div class="about">
                <h3>{{ item.title }}</h3>
                <p>{{ item.preview }}</p>
            </div>
            <div class="date">
                {{ item.date }} {{ item.time }}
            </div>
            <button class="btn" @click="go(item.id)">
                →
            </button>
        </div>
    </li>
</template>

<style scoped lang="scss">
.c-card {
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 48px 4px #0234E30A, 0 0 10px 0 #0234E308;
    border-radius: 1vw;
    overflow: hidden;

    .c-card__image{
        height: 250px;
        width: 100%;
        align-self: center;

    }

    .c-card__text {
        padding: 16px;
        display: grid;
        grid-template-areas:
            'a a'
            'a a'
            'b c';

        .about {
            grid-area: a;
        }

        .date {
            grid-area: b;
            color:#B1B0B0;
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
    }

}
</style>