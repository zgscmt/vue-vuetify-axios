export const navMenu = [{
    //主要的内容
    search: '查找',
    //侧边栏菜单
    index: 0,
    action: 'mdi-cog',
    text: "表单管理",
    active: false,
    children: [{
        text: "表单分类",
        router: "/formType",

    },
    {
        text: "创建表单",
        router: "/creatForm",
        //表单默认提示
        prompt: { name: "姓名", adr: "地址", card: "身份证", gender: { sex: '性别', gender: ["男", "女"], }, party_member: { title: '是否党员', isTeam: ['是', '否'] }, phone: "手机号", type: "类型" },
        // 设置表头
        headers: [
            {
                text: "甜点 (100g 份)",
                align: "start",
                value: "name"
            },
            { text: "卡路里", value: "calories" },
            { text: "脂肪 (g)", value: "fat" },
            { text: "碳水化合物 (g)", value: "carbs" },
            { text: "蛋白质 (g)", value: "protein" },
            { text: "铁元素 (%)", value: "iron" }
        ],
        //按钮设置
        btn: "查找"

    },
    {
        text: "表单数据",
        router: "/informData",

    }],
},
{
    action: 'mdi-database',
    text: "全栈实战",
    index: 1,
    active: false,
    children: [{
        text: "百度地图",
        router: "/map",

    },
    {
        text: "web网站",
        router: "/websites",
        headers: [
            {
                text: "ID",
                align: "center",
                value: "id"
            },
            { text: "网站名", value: "name", align: "center", },
            { text: "网址", value: "url", align: "center", },
            { text: "排名", value: "alexa", align: "center", },
            { text: "国家", value: "country", align: "center", },
            { text: "操作", value: "operation", align: "center", }
        ],
        prompt: { add: '新增数据', info: '数据详情', update: '修改数据', data_info: '详情', data_update: '编辑', data_del: '删除', btn_confirm: '确定', btn_cancel: '取消', name: '网站名', url: '地址', alexa: '排名', country: '国家' }
    },
    {
        text: "图片上传",
        router: "/upload",
        headers: [
            {
                text: "身份证正面",
                align: "center",
                value: "img_head"
            },
            { text: "身份证反面", value: "img_back", align: "center", },
            { text: "操作", value: "operation", align: "center", }
        ],
        prompt:{verified:'已认证(重新认证)',unverified:'未认证(点击认证)',upload:'上传图片',update:'重新上传',btn_confirm: '确定', btn_cancel: '取消',id_card_font:'身份证正面',id_card_reverse:'身份证反面',click:"点击上传"}

    }],
}

];


