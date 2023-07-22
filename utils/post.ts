import Api from "~/utils/api";
import {NsPost} from "~/types";
import convertDate from "~/utils/help.date";

export default class Post {

    public static getList() {
        return Api.getInstance().get<NsPost.Preview[]>('posts')
            .then((posts) => {
                return posts.map((post) => ({
                    ...post,
                    ...convertDate(post.createdAt)
                }))
            })
    }

    public static get(id: string | number) {
        return Api.getInstance().get<NsPost.Detailed>(`posts/${id}`)
            .then((post) => ({
                ...post,
                ...convertDate(post.createdAt)
            }))
    }
}