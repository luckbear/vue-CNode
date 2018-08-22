import axios from 'axios'
import Vue from 'vue'

let response = axios.create({
    baseURL: ' https://cnodejs.org/api/v1'
});

// get /topics 主题首页
// 接收 get 参数
// page Number 页数
// tab String 主题分类。目前有 ask share job good
// limit Number 每一页的主题数量
// mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
export const getList = params => {
    return response({
        methods: 'get',
        url: '/topics',
        params: {
            tab: params.tab,
            page: params.page,
            limit: params.limit
        }
    });
};

// get / topic /: id 主题详情
// 接收 get 参数
// mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
// accesstoken String 当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，
// 才需要带此参数。会影响返回值中的 is_collect 以及 replies 列表中的 is_uped 值。
export const getDetail = params => {
    return response({
        methods: 'get',
        url: `/topic/${params.id}`,
        params: {
            mdrender: params.md,
            accesstoken: params.accesstoken,
        }
    });
};

// get /user/:loginname 用户详情
// post /accesstoken 验证 accessToken 的正确性
// 接收 post 参数
// accesstoken String 用户的 accessToken
// 如果成功匹配上用户，返回成功信息。否则 403
export const getUserInfo = params => {
    return response({
        method: 'get',
        url: '/user/' + params,
        params: {

        }
    });
};

// post /accesstoken 验证 accessToken 的正确性
// 接收 post 参数

// accesstoken String 用户的 accessToken
// 如果成功匹配上用户，返回成功信息。否则 403。
export const login = params => {
    return response({
        method: 'post',
        url: '/accesstoken',
        data: {
            accesstoken: params
        }
    })
}

// post /topic_collect/collect 收藏主题
// 接收 post 参数
// accesstoken String 用户的 accessToken
// topic_id String 主题的id
export const collect = params => {
    return response({
        method: 'post',
        url: '/topic_collect/collect',
        data: {
            accesstoken: params.key,
            topic_id: params.id
        }
    })
};

// post /topic_collect/de_collect 取消主题
// 接收 post 参数
// accesstoken String 用户的 accessToken
// topic_id String 主题的id
export const noCollect = params => {
    return response({
        method: 'post',
        url: '/topic_collect/de_collect',
        data: {
            accesstoken: params.key,
            topic_id: params.id
        }
    })
};


// post / reply /: reply_id / ups 为评论点赞
// 接受 post 参数
// accesstoken String
// 接口会自动判断用户是否已点赞，如果否，则点赞；如果是，则取消点赞。点赞的动作反应在返回数据的 action 字段中，up or down。
// 返回值示例
// { "success": true, "action": "down" }
export const thumbsUp = params => {
    return response({
        method: 'post',
        url: '/reply/' + params.id + '/ups',
        data: {
            accesstoken: params.key,
        }
    })
};

// post /topic/:topic_id/replies 新建评论
// 接收 post 参数
// accesstoken String 用户的 accessToken
// content String 评论的主体
// reply_id String 如果这个评论是对另一个评论的回复，请务必带上此字段。这样前端就可以构建出评论线索图。
export const reply = params => {
    return response({
        method: 'post',
        url: '/topic/' + params.id + '/replies',
        data: {
            id:params.id,
            accesstoken: params.key,
            content:params.content,
            reply_id:params.repId

        }
    })
};






export default {
    install(Vue) {
        Vue.prototype.http = {
            getList,
            getDetail,
            getUserInfo,
            login,
            collect,
            noCollect,
            thumbsUp,
            reply
        }
    }
}