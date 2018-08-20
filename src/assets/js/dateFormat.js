import moment from 'moment'
var mapObj = {
    years: '年',
    year: '年',
    months: '个月',
    month: '个月',
    days: '天',
    day: '天',
    hours: '小时',
    hour: '小时',
    minutes: '分钟',
    minute: '分钟',
    seconds: '秒',
    second: '秒',
    ago: '前',
    an:'1',
    'a':'1'
};

var reg = new RegExp(Object.keys(mapObj).join('|'), 'gi');

export const dateFormat = params => {
    return moment(params).fromNow().replace(reg, el => {
        return mapObj[el]
    })
}