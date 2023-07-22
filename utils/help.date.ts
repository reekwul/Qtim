export default function convertDate(val:Date):{date:string,time:string}{
    return {
        date: val ? new Date(val).toLocaleString('ru', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        }) : 'не определнно',
        time: val ? new Date(val).toLocaleString('ru', {
            hour: 'numeric',
            minute: 'numeric',
        }) : ''
    }
}