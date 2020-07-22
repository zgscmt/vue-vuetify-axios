<template>
    <div>
        <v-form>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field dense label="当前位置" solo  append-icon="mdi-map-marker" v-model="myAddress"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <v-btn dense color="primary" :disabled="isClick" @click="getAddress">
                            <i v-if="!isClick" class="fa fa-search"></i>
                            <i v-if="isClick" class="fa fa-spinner fa-spin"></i> 获取当前位置</v-btn
                        >
                    </v-col>
                </v-row>
            </v-container>
        </v-form>

        <baidu-map class="bm-view" @ready="handler" id="allmap">
            <bm-geolocation
                anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                :showAddressBar="true"
                :autoLocation="true"
            ></bm-geolocation>
        </baidu-map>
    </div>
</template>
<script>
// import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
export default {
    components: {
        // BaiduMap
    },
    data() {
        return {
            myAddress: "",
            isClick: false,
        };
    },
    mounted() {
        //   this.handler();
        // this.getAddress();
    },
    methods: {
        handler({ BMap, map }) {
            //   var map = new BMap.Map("allmap"); // 创建地图实例
            var point = new BMap.Point(122.07, 37.25);
            map.centerAndZoom(point, 11); // 初始化地图，设置中心点坐标和地图级别
            map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.ScaleControl());
            map.addControl(new BMap.OverviewMapControl());
            map.addControl(new BMap.MapTypeControl());
            var marker = new window.BMap.Marker(point); // 创建标注
            map.addOverlay(marker); // 将标注添加到地图中
            var infoWindow = new BMap.InfoWindow("这是提示信息");
            // 鼠标移上标注点要发生的事
            marker.addEventListener("mouseover", function() {
                this.openInfoWindow(infoWindow);
            });
            marker.addEventListener("mouseout", function() {
                //this.closeInfoWindow(infoWindow)
            });
        },
        getAddress() {
            var map = new BMap.Map("allmap");
            this.isClick=true;
            var geolocation = new BMap.Geolocation();
            var gcAddress = new BMap.Geocoder();
            let that = this;
            geolocation.getCurrentPosition(function(r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    that.map_click(r, r.point.lng, r.point.lat);
                } else {
                    alert("failed" + this.getStatus());
                }
            });
        },
        map_click(r, lng, lat) {
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(lng, lat);
            map.centerAndZoom(point, 15);

            var mk = new BMap.Marker(r.point); //设置点击的红点
            map.addOverlay(mk);
            map.panTo(r.point);

            let that = this;
            var geoc = new BMap.Geocoder();
            geoc.getLocation(point, function(rs) {
                var addComp = rs.addressComponents;
                that.myAddress=addComp.city + addComp.district
                that.isClick=false
            });
        },
    },
};
</script>
<style lang="stylus" scoped>
.bm-view {
  width: 100%;
  height: 500px;
}
</style>
