<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" :md="6">
                    <v-card style="background:#fff; height:400px">
                        <v-card-text style="background:#66B1FF;height:45px;text-align:center">
                            <p style="color:#fff;font-size:20px;">
                                折线图
                            </p>
                        </v-card-text>
                        <div id="line" style="height:320px;padding-top:20px"></div>
                    </v-card>
                </v-col>

                <v-col cols="12" :md="6">
                    <v-card style="background:#fff;height:400px">
                        <v-card-text style="background:#D53A35;height:45px;text-align:center">
                            <p style="color:#fff;font-size:20px;">
                                柱状图
                            </p>
                        </v-card-text>
                        <div id="bar" style="height:320px;padding-top:20px"></div>
                    </v-card>
                </v-col>
            </v-row>
            <!-- 圆 -->
            <v-row>
                <v-col :md="12">
                    <v-card class="mx-auto" style="background:#fff;height:500px;">
                        <v-card-text style="background:#D53A35;height:45px;text-align:center">
                            <p style="color:#fff;font-size:20px;">
                             结构爱好图
                            </p>
                        </v-card-text>
                        <div id="circle" style="height:430px;padding:20px !important;"></div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
export default {
    data() {
        return {};
    },
    mounted() {
        this.getLine();
        this.getCircle();
    },
    methods: {
        getLine() {
            let myChart = this.$echarts.init(document.getElementById("line"));
            myChart.setOption({
                tooltip: {},
                legend: { data: ["销量"] },
                grid: {
                    x: "7%", //值越大越靠右
                    y: "7%", //值越大越靠下
                    width: "75%",
                    height: "75%",
                },
                xAxis: {
                    data: ["裤子", "衬衫", "毛衣", "褂子", "运动海"],
                    axisLine: {
                        lineStyle: {
                            show: false,
                            // 设置x轴颜色
                            color: "#66B1FF",
                            onZero: false,
                        },
                    },
                },
                yAxis: {
                    axisLine: {
                        lineStyle: {
                            show: false,
                            // 设置y轴颜色
                            color: "red",
                        },
                    },
                },
                series: [
                    {
                        name: "销量",
                        type: "line",
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: "#66B1FF",
                                lineStyle: {
                                    color: "#66B1FF",
                                    width: 2,
                                },
                            },
                        },
                        data: [5, 20, 21, 30, 15],
                    },
                ],
            });
            let myBar = this.$echarts.init(document.getElementById("bar"));
            myBar.setOption({
                title: { text: "柱状图" },
                grid: {
                    //值越大越靠下
                    width: "75%",
                    height: "70%",
                },
                legend: { data: ["销量"] },
                xAxis: { data: ["裤子", "衬衫", "毛衣", "褂子", "运动海"] },
                yAxis: {},

                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data: [5, 20, 21, 30, 15],
                    },
                ],
            });
            setTimeout(function() {
                window.addEventListener("resize", function() {
                    myChart.resize();
                    myBar.resize();
                });
            }, 300);
        },
        getCircle() {
            let myCircle = this.$echarts.init(document.getElementById("circle"));
            var colors = ["#FFAE57", "#FF7853", "#EA5151", "#CC3F57", "#9A2555"];
            var bgColor = "#2E2733";

            var itemStyle = {
                star5: {
                    color: colors[0],
                },
                star4: {
                    color: colors[1],
                },
                star3: {
                    color: colors[2],
                },
                star2: {
                    color: colors[3],
                },
            };

            var data = [
                {
                    name: "虚构",
                    itemStyle: {
                        color: colors[1],
                    },
                    children: [
                        {
                            name: "小说",
                            children: [
                                {
                                    name: "5☆",
                                    children: [
                                        {
                                            name: "疼",
                                        },
                                        {
                                            name: "慈悲",
                                        },
                                        {
                                            name: "楼下的房客",
                                        },
                                    ],
                                },
                                {
                                    name: "4☆",
                                    children: [
                                        {
                                            name: "虚无的十字架",
                                        },
                                        {
                                            name: "无声告白",
                                        },
                                        {
                                            name: "童年的终结",
                                        },
                                    ],
                                },
                                {
                                    name: "3☆",
                                    children: [
                                        {
                                            name: "疯癫老人日记",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: "其他",
                            children: [
                                {
                                    name: "5☆",
                                    children: [
                                        {
                                            name: "纳博科夫短篇小说全集",
                                        },
                                    ],
                                },
                                {
                                    name: "4☆",
                                    children: [
                                        {
                                            name: "安魂曲",
                                        },
                                        {
                                            name: "人生拼图版",
                                        },
                                    ],
                                },
                                {
                                    name: "3☆",
                                    children: [
                                        {
                                            name: "比起爱你，我更需要你",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "非虚构",
                    itemStyle: {
                        color: colors[2],
                    },
                    children: [
                        {
                            name: "设计",
                            children: [
                                {
                                    name: "5☆",
                                    children: [
                                        {
                                            name: "无界面交互",
                                        },
                                    ],
                                },
                                {
                                    name: "4☆",
                                    children: [
                                        {
                                            name: "数字绘图的光照与渲染技术",
                                        },
                                        {
                                            name: "日本建筑解剖书",
                                        },
                                    ],
                                },
                                {
                                    name: "3☆",
                                    children: [
                                        {
                                            name: "奇幻世界艺术\n&RPG地图绘制讲座",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: "社科",
                            children: [
                                {
                                    name: "5☆",
                                    children: [
                                        {
                                            name: "痛点",
                                        },
                                    ],
                                },
                                {
                                    name: "4☆",
                                    children: [
                                        {
                                            name: "卓有成效的管理者",
                                        },
                                        {
                                            name: "进化",
                                        },
                                        {
                                            name: "后物欲时代的来临",
                                        },
                                    ],
                                },
                                {
                                    name: "3☆",
                                    children: [
                                        {
                                            name: "疯癫与文明",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: "心理",
                            children: [
                                {
                                    name: "5☆",
                                    children: [
                                        {
                                            name: "我们时代的神经症人格",
                                        },
                                    ],
                                },
                                {
                                    name: "4☆",
                                    children: [
                                        {
                                            name: "皮格马利翁效应",
                                        },
                                        {
                                            name: "受伤的人",
                                        },
                                    ],
                                },
                                {
                                    name: "3☆",
                                },
                                {
                                    name: "2☆",
                                    children: [
                                        {
                                            name: "迷恋",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: "居家",
                            children: [
                                {
                                    name: "4☆",
                                    children: [
                                        {
                                            name: "把房子住成家",
                                        },
                                        {
                                            name: "只过必要生活",
                                        },
                                        {
                                            name: "北欧简约风格",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: "绘本",
                            children: [
                                {
                                    name: "5☆",
                                    children: [
                                        {
                                            name: "设计诗",
                                        },
                                    ],
                                },
                                {
                                    name: "4☆",
                                    children: [
                                        {
                                            name: "假如生活糊弄了你",
                                        },
                                        {
                                            name: "博物学家的神秘动物图鉴",
                                        },
                                    ],
                                },
                                {
                                    name: "3☆",
                                    children: [
                                        {
                                            name: "方向",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: "哲学",
                            children: [
                                {
                                    name: "4☆",
                                    children: [
                                        {
                                            name: "人生的智慧",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: "技术",
                            children: [
                                {
                                    name: "5☆",
                                    children: [
                                        {
                                            name: "代码整洁之道",
                                        },
                                    ],
                                },
                                {
                                    name: "4☆",
                                    children: [
                                        {
                                            name: "Three.js 开发指南",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ];

            for (var j = 0; j < data.length; ++j) {
                var level1 = data[j].children;
                for (var i = 0; i < level1.length; ++i) {
                    var block = level1[i].children;
                    var bookScore = [];
                    var bookScoreId;
                    for (var star = 0; star < block.length; ++star) {
                        var style = (function(name) {
                            switch (name) {
                                case "5☆":
                                    bookScoreId = 0;
                                    return itemStyle.star5;
                                case "4☆":
                                    bookScoreId = 1;
                                    return itemStyle.star4;
                                case "3☆":
                                    bookScoreId = 2;
                                    return itemStyle.star3;
                                case "2☆":
                                    bookScoreId = 3;
                                    return itemStyle.star2;
                            }
                        })(block[star].name);

                        block[star].label = {
                            color: style.color,
                            downplay: {
                                opacity: 0.5,
                            },
                        };

                        if (block[star].children) {
                            style = {
                                opacity: 1,
                                color: style.color,
                            };
                            block[star].children.forEach(function(book) {
                                book.value = 1;
                                book.itemStyle = style;

                                book.label = {
                                    color: style.color,
                                };

                                var value = 1;
                                if (bookScoreId === 0 || bookScoreId === 3) {
                                    value = 5;
                                }

                                if (bookScore[bookScoreId]) {
                                    bookScore[bookScoreId].value += value;
                                } else {
                                    bookScore[bookScoreId] = {
                                        color: colors[bookScoreId],
                                        value: value,
                                    };
                                }
                            });
                        }
                    }

                    level1[i].itemStyle = {
                        color: data[j].itemStyle.color,
                    };
                }
            }
            myCircle.setOption({
                backgroundColor: bgColor,
                color: colors,
                grid: {
                    width: "70%",
                   
                },
                series: [
                    {
                        type: "sunburst",
                        center: ["50%", "48%"],
                        data: data,
                        sort: function(a, b) {
                            if (a.depth === 1) {
                                return b.getValue() - a.getValue();
                            } else {
                                return a.dataIndex - b.dataIndex;
                            }
                        },
                        label: {
                            rotate: "radial",
                            color: bgColor,
                        },
                        itemStyle: {
                            borderColor: bgColor,
                            borderWidth: 2,
                        },
                        levels: [
                            {},
                            {
                                r0: 0,
                                r: 40,
                                label: {
                                    rotate: 0,
                                },
                            },
                            {
                                r0: 40,
                                r: 105,
                            },
                            {
                                r0: 115,
                                r: 140,
                                itemStyle: {
                                    shadowBlur: 2,
                                    shadowColor: colors[2],
                                    color: "transparent",
                                },
                                label: {
                                    rotate: "tangential",
                                    fontSize: 10,
                                    color: colors[0],
                                },
                            },
                            {
                                r0: 140,
                                r: 145,
                                itemStyle: {
                                    shadowBlur: 80,
                                    shadowColor: colors[0],
                                },
                                label: {
                                    position: "inside",
                                    textShadowBlur: 5,
                                    textShadowColor: "#333",
                                },
                                downplay: {
                                    label: {
                                        opacity: 0.5,
                                    },
                                },
                            },
                        ],
                    },
                ],
            });
            setTimeout(function() {
                window.addEventListener("resize", function() {
                    myCircle.resize();
                });
            }, 300);
        },
    },
};
</script>
