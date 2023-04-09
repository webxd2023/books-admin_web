<template>
  <div class="body1">
    <div class="mybody">
      <div class="system_info">
        <div class="disk_info">
          <br/>
          <h1 class="os_text">磁盘信息</h1>
          <br/>
          <br/>
          <div class="cpu_info_text">
            <div class = "cr_progress_css" >
              <div class="disk_list"  v-on:mouseenter="msg" v-on:mouseleave="msg2" v-for="(item,index) in  system_params.disk_info_list">
                <div>
                  &nbsp;&nbsp;&nbsp;
                  <h7>{{item.disk_path}}盘</h7>
                  <br/>
                  <n-popover trigger="hover"  :delay="100" :duration="100" placement="bottom">
                    <template #trigger>
                      <el-progress
                          type="circle"
                          :percentage="item.disk_usage_info.disk_percent"
                          :width="120"
                          :color="item.disk_usage_info.disk_percent_color">
                          <h10 style="color: #ffffff;  ">{{ item.disk_usage_info.disk_percent }}%</h10>
                          <br/>
                      </el-progress>
                    </template>
                    <div style="transform-origin: inherit; background-color: #efebe8;">
                      <br/>
                      &nbsp;&nbsp;磁盘信息&nbsp;<br/>
                      &nbsp;&nbsp;盘符：{{item.disk_path}}&nbsp;<br/>
                      &nbsp;&nbsp;文件系统：{{item.disk_fstype}}&nbsp;<br/>
                      &nbsp;&nbsp;已使用：{{item.disk_usage_info.disk_used}}GB&nbsp;<br/>
                      &nbsp;&nbsp;可使用：{{item.disk_usage_info.disk_free}}GB&nbsp;<br/>
                      &nbsp;&nbsp;总容量：{{item.disk_usage_info.disk_total}}GB&nbsp;<br/>
                      &nbsp;&nbsp;磁盘使用率：{{item.disk_usage_info.disk_percent}}%&nbsp;&nbsp;<br/><br/>
                    </div>

                  </n-popover>


                  <br/>
                  <h10>{{item.disk_usage_info.disk_used}}GB/{{ item.disk_usage_info.disk_total }}GB</h10>
                </div>


                <div class="disk_floating_ayer" v-show="system_params.show_params">
                  <br/>
                  <h10>【基础信息】</h10>
                  <br/>
                  <h10>盘符：{{item.disk_path}}</h10>
                  <br/>
                  <h10>文件系统：{{item.disk_fstype}}</h10>
                  <br/>
                  <h10>磁盘使用率：{{item.disk_usage_info.disk_percent}}%</h10>
                  <br/>
                  <h10>已使用：{{item.disk_usage_info.disk_used}}GB</h10>
                  <br/>
                  <h10>可使用：{{item.disk_usage_info.disk_free}}GB</h10>
                  <br/>
                  <h10>磁盘总容量：{{item.disk_usage_info.disk_total}}GB</h10>
                </div>
                &nbsp;&nbsp;
              </div>
            </div>




          </div>
        </div>

        <div class="os_info">
          <br/>
          <h1 class="os_text">设备信息</h1>
          <br/>
          <div class="cpu_info_text">
            <h4>设备名称：{{ system_params.os_info.net_name }}</h4>
            <h4>系统：{{ system_params.os_info.os_sname }} {{ system_params.os_info.os_arnum }}</h4>
            <br/>
            <n-popover trigger="hover" >
              <template #trigger>
                <el-progress type="circle" :percentage="system_params.cpu_info.cpu_percent" :color="system_params.cpu_info.cpu_percent_color">
                    <h10 class="percentage-value" style="color: #ffffff">{{ system_params.cpu_info.cpu_percent }}%</h10>
                  <br/>
                    <h10 class="percentage-label" style="color: #ffffff">cpu占用率</h10>
                </el-progress>
              </template>
              <div style="transform-origin: inherit; background-color: #f6ebeb;">
                <br/>
                &nbsp;&nbsp;CPU信息&nbsp;<br/>
                &nbsp;&nbsp;核心数：{{system_params.cpu_info.cpu_physical_core}}&nbsp;<br/>
                &nbsp;&nbsp;线程数：{{system_params.cpu_info.cpu_thread}}&nbsp;<br/>
                &nbsp;&nbsp;主频率：{{system_params.cpu_info.cpu_freq}}&nbsp;&nbsp;&nbsp;<br/>
                &nbsp;&nbsp;占用率：{{system_params.cpu_info.cpu_percent}}%&nbsp;<br/><br/>
              </div>

            </n-popover>

            <n-popover trigger="hover"  :delay="100" :duration="100"
                              >
              <template #trigger>
                <el-progress type="circle" :percentage="system_params.ram_info.ram_percent" :color="system_params.ram_info.ram_percent_color">
                  <h10 class="percentage-value" style="color: #ffffff">{{ system_params.ram_info.ram_percent }}%</h10>
                  <br/>
                  <h10 class="percentage-label" style="color: #ffffff">内存占用率</h10>
                </el-progress>
              </template>
              <div style="transform-origin: inherit; background-color: #f6ebeb;">
                <br/>
                &nbsp;&nbsp;内存信息&nbsp;<br/>
                &nbsp;&nbsp;已用：{{system_params.ram_info.ram_used}}(GB)&nbsp;<br/>
                &nbsp;&nbsp;可用：{{system_params.ram_info.ram_free}}(GB)<br/>
                &nbsp;&nbsp;总大小：{{system_params.ram_info.ram_total}}(GB)&nbsp;&nbsp;&nbsp;<br/>
                &nbsp;&nbsp;占用率：{{system_params.ram_info.ram_percent}}%&nbsp;<br/><br/>
              </div>

            </n-popover>
          </div>
        </div>
      </div>

      <div class="container1">
        <div class="os2_info">
          <br/>
          <h1 class="os_text">网络信息</h1>
          <br/>
          <div class="cpu_info_text">
<!--            <h4>总发送：{{ system_params.net_info.networkInfo.upTotal }}</h4>-->
<!--            <h4>总接收：{{ system_params.net_info.networkInfo.downTotal }}</h4>-->
<!--            <h4>上行：{{ system_params.net_info.networkInfo.upPackets }}</h4>-->

            <h4>{{ system_params.net_info.upSpeed }}</h4>
            <h4>总发送：{{ system_params.net_info.networkInfo.upTotal}}MB</h4>

            <h4>{{ system_params.net_info.doownSpeed }}</h4>
            <h4>总接收：{{ system_params.net_info.networkInfo.downTotal}}MB</h4>
            <br/>
            <el-image src="http://api.webxd.top/media/微信图片_20230409155107.png">

            </el-image>
          </div>
        </div>
        <div class="container">
          <div class="weather-side">
            <div class="weather-gradient"></div>
            <div class="date-container">
              <h2 class="date-dayname">{{ weatherinfo.week }}</h2>
              <span class="date-day">{{ weatherinfo.date }}</span>
              <i class="location-icon" data-feather="map-pin"></i>
              <span class="location">{{amapinfo.province}}-{{amapinfo.city}}</span>
            </div>

            <div class="weather-container">
              <i class="weather-icon" data-feather="sun"></i>
              <img v-bind:src="weatherinfo.weatherImgsrc" style="width: 80px;" />&nbsp;&nbsp;
              <h1 class="weather-temp">{{ weatherinfo.temp }}°C</h1>
              <h3 class="weather-desc">{{weatherinfo.weather}}天</h3>
            </div>
          </div>
          <div class="info-side">
            <div class="today-info-container">
              <div class="today-info">
                <div class="precipitation">
                  <span class="title">风向</span>
                  <span class="value">{{ weatherinfo.windDirect }}</span>
                  <div class="clear"></div>
                </div>
                <div class="humidity">
                  <span class="title">风力</span>
                  <span class="value">{{ weatherinfo.windPower }}</span>
                  <div class="clear"></div>
                </div>
                <div class="wind">
                  <span class="title">风速</span>
                  <span class="value">{{ weatherinfo.windSpeed }}m/s</span>
                  <div class="clear"></div>
                </div>
              </div>
            </div>
            <div class="week-container" >
              <ul class="week-list" >
                <li class="hover" v-for="(item,index) in  dailyarr">
                  <i class="day-icon" data-feather="sun"></i>
                  &nbsp;
                  <span style="font-size: 15px;top: 0;">{{item.day.temphigh+'℃'}}</span>
                  <br>
                  &nbsp;
                  <img style="width: 30px" :src="imgsrc+item.day.img+'.png'"/>
                  <span class="day-name">{{dailyarr[index].week}}</span>
                  <span class="day-temp">{{dailyarr[index].day.weather}}</span>
                </li>
                <div class="clear">
                </div>
              </ul>
            </div>
          </div>
        </div>

      </div>


    </div>
  </div>



</template>

<script>
import Schart from "vue-schart";
import {reactive, ref} from "vue";
// import router from "../router";
import {useRouter} from "vue-router";
// import {getinternetip} from "../api";
import {get_system_info, get_network_info,getamapip, weatherData} from "../api/index";
// import {ElMessage, ElMessageBox} from "element-plus";
import {ElMessage, ElMessageBox, ElLoading, ElNotification} from "element-plus";
import { NButton } from 'naive-ui'

export default {
  name: "myhome",
  components: { Schart ,
    // NConfigProvider,
    // NInput,
    // NDatePicker,
    // NSpace
  },

  setup() {
    const router = useRouter()
    const amapinfo=reactive({
      ip:'',
      province:'',
      city:'',
      key:'311510dc71c226d04b1837c69c4516b9',

    });
    let dailyarr=ref([]);
    const weatherinfo=reactive({
      weatherlist:[],
      weatherImgsrc:'',
      temp:'',
      weather:'',
      date:'',
      week:'',
      windDirect:'',  //风向
      windPower:'',  //风力
      windSpeed:'',  //风速
      imgsrc:'http://www.webxd.top/static/uploads/',
    });
    const imgsrc=reactive('http://www.webxd.top/static/uploads/');
    // 请求高德获取定位
    const getgaodip=()=>{
      getamapip(amapinfo).then((res) =>{
        amapinfo.province=res.province;
        amapinfo.city=res.city;
        weatherData(amapinfo).then((reg) =>{
          console.log(reg.result)
          // const reginfo = localStorage.getItem("user_name")
          const res=JSON.stringify(reg.result)
          localStorage.setItem("reginfo",res);
          const reginfo =JSON.parse(localStorage.getItem("reginfo"))
          weatherinfo.week=reginfo.week
          weatherinfo.date=reginfo.date
          weatherinfo.temp=reginfo.temp
          weatherinfo.weather=reginfo.weather
          weatherinfo.windDirect=reginfo.winddirect
          weatherinfo.windPower=reginfo.windpower
          weatherinfo.windSpeed=reginfo.windspeed
          console.log(weatherinfo.temp)
          let imgid=reginfo.img
          weatherinfo.weatherImgsrc='http://www.webxd.top/static/uploads/'+imgid+'.png'
          weatherinfo.weatherlist=reginfo.daily
          dailyarr.value=(reginfo.daily)
          })
      })
    };

    const msg=() =>{
      // ElMessage.warning("碰我干嘛！");
      ElNotification({
        title: 'Success',
        message: '碰我干嘛！',
        type: 'warning',
      })
      system_params.show_params = true
    };

    const msg2=() =>{
      // ElMessage.warning("别走啊！");
      ElNotification({
        title: 'Success',
        message: '别走啊',
        type: 'success',
      })
      system_params.show_params = false
    };

    const system_params=reactive({
      disk_info_list:[],
      cpu_info:{},
      ram_info:{},
      os_info:{},
      net_info:{},
      show_params:false
      // disk_data_list:[]
    });
    // 请求系统信息接口
    const get_system_infos=()=>{
      get_system_info().then((res) =>{
        system_params.cpu_info = res.data.cpu_info
        system_params.ram_info = res.data.ram_info
        system_params.disk_info_list = res.data.disk_info.disk_info_list
        system_params.os_info = res.data.os_info
      })
    };

    // 请求系统信息接口
    const get_network_infos=()=>{
      get_network_info().then((res) =>{
        console.log(res.data)
        system_params.net_info = res.data
        console.log(system_params.net_info)

      })
    };

    const time_data=reactive({
      times:null
    });

    const created=()=>{
      {

        time_data.times = setInterval(() => {
          get_system_infos();
          get_network_infos();
        }, 4000);
      }
    };
    const created_weather=()=>{
      {
        getgaodip();
        time_data.times = setInterval(() => {
          getgaodip();
        }, 300000);
      }
    };
    get_system_infos();
    created()
    created_weather()

    return {
      weatherinfo,getgaodip,amapinfo,imgsrc,dailyarr,system_params,msg,msg2,NButton
    }
  },
};
</script>

<style >
@import url('css/myhome.css');


</style>