import moment from 'moment'

export const dateFormat = params=>{
    return moment(params).fromNow()
}