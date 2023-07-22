export namespace NsPost{
    export interface Preview{
        createdAt:Date
        description:string
        id:string | number
        image:string //url
        preview:string
        title: string

        //доклеивает фронт
        date?:string,
        time?:string
    }

    export interface Detailed extends Preview{
        //??? поля полученные с записи, id:74
        operationName?:string ,
        variables?: {},
        query?:string
    }
}