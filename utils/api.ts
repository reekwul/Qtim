import {$fetch} from "ofetch";

export default class Api {
    private constructor() {
    }

    private static instance: Api
    private url: string | undefined = import.meta.env.VITE_API_URL


    public static getInstance(): Api {
        if (!Api.instance) {
            Api.instance = new Api()
        }

        return Api.instance
    }

    /**
     *  PUT, PATCH, DELETE реализуются по анологии с GET и POST методами
     **/

    public get<T>(url: string, fields?: { [key: string]: string }): Promise<T> {
        const p = new Promise<T>((resolve, reject) => {
            $fetch(this.preparePath(url, fields), {
                method: 'get'
            })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
        return p
    }

    public post<T, R>(url: string, data?: BodyInit, fields?: { [key: string]: string }): Promise<T> {
        const p = new Promise<T>((resolve, reject) => {
            $fetch(this.preparePath(url, fields), {
                method: 'post',
                body:data
            })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
        return p
    }

    /**
     * Парсит строку для запроса к api
     */
    private preparePath<T>(route: string, fields?: { [key: string]: string }): string {
        if (fields === undefined || Object.keys(fields).length < 1) {
            return encodeURI(this.url + '/' + route)
        }

        const queryKeys = Object.keys(fields)
        const queryValues = Object.values(fields)
        const query = queryValues
            .reduce((acc: string[], item, i) => {
                acc.push(`${queryKeys[i]}=${item}`)
                return acc
            }, [])
            .join('&')

        return encodeURI(this.url + '/' + route + '?' + query)
    }

}