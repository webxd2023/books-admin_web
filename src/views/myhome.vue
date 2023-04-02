<template>
  <div class="body1">

    <div class="mybody">
      <div class="system_info">
        <div class="disk_info">
          <br/>
          <h1 class="disk_text">磁盘信息</h1>
          <br/>
          <div class="disk_info_text">
            <ul class="disk_list" v-for="(item,index) in  system_params.disk_info_list">
              <h7 style="font-size: 15px;top: 0;">{{item.disk_path}}盘</h7>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <h7 style="font-size: 15px;top: 0;">容量:{{item.disk_usage_info.disk_total}}GB；   </h7>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <h7 style="font-size: 15px;top: 0;">已使用:{{item.disk_usage_info.disk_used}}GB；   </h7>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <h7 style="font-size: 15px;top: 0;">可使用:{{item.disk_usage_info.disk_free}}GB；   </h7>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <h7 style="font-size: 15px;top: 0;">占用率:{{item.disk_usage_info.disk_percent}}%；</h7>
            </ul>
            <br/>
          </div>

        </div>
        <div class="os_info">
          <br/>
          <h1 class="os_text">设备信息</h1>
          <br/>
          <div class="cpu_info_text">
            <h4>设备名称：{{ system_params.os_info.net_name }}</h4>
            <h4>系统：{{ system_params.os_info.os_sname }}</h4>
            <h4>系统类型：{{ system_params.os_info.os_arnum }}  -{{system_params.os_info.os_type}}</h4>
<!--            <h4>CPU占用率：{{ system_params.cpu_info.cpu_percent }}</h4>-->
          </div>

        </div>
        <div class="cpu_info">
          <br/>
          <h1 class="cpu_text">处理器信息</h1>
          <br/>
          <div class="cpu_info_text">
            <h4>物理核心数：{{ system_params.cpu_info.cpu_physical_core }}</h4>
            <h4>线程数：{{ system_params.cpu_info.cpu_thread }}</h4>
            <h4>CPU主频：{{ system_params.cpu_info.cpu_freq }}</h4>
            <h4>CPU占用率：{{ system_params.cpu_info.cpu_percent }}</h4>
          </div>
          <h1 class="ram_text">内存信息</h1>
          <br/>
          <div class="ram_info_text">
            <h4>总容量：{{ system_params.ram_info.ram_total }} GB</h4>
            <h4>已使用：{{ system_params.ram_info.ram_used }} GB</h4>
            <h4>可使用：{{ system_params.ram_info.ram_free }} GB</h4>
            <h4>占用率：{{ system_params.ram_info.ram_percent }}</h4>
          </div>

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



</template>

<script>
import Schart from "vue-schart";
import {reactive, ref} from "vue";
// import router from "../router";
import {useRouter} from "vue-router";
// import {getinternetip} from "../api";


import {get_system_info, getamapip, weatherData} from "../api/index";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "myhome",
  components: { Schart },

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
    const system_params=reactive({
      disk_info_list:[],
      cpu_info:{},
      ram_info:{},
      os_info:{}
    });
    // 请求系统信息接口
    const get_system_infos=()=>{
      get_system_info().then((res) =>{
        system_params.cpu_info = res.data.cpu_info
        system_params.ram_info = res.data.ram_info
        system_params.disk_info_list = res.data.disk_info.disk_info_list
        system_params.os_info = res.data.os_info
        console.log(system_params.cpu_info)
        console.log(system_params.ram_info)
        console.log(system_params.disk_info_list)
      })
    };

    getgaodip()
    get_system_infos()

    const time_data=reactive({
      times:null
    });

    const created=()=>{
      {
        get_system_infos();
        time_data.times = setInterval(() => {
          get_system_infos();
        }, 2000);
      }
    };

    created()
    // {
    //   get_system_infos();
    //   time_data.times = setInterval(() => {
    //     get_system_infos();
    //   }, 1000 * 60);
    // }
    return {
      weatherinfo,getgaodip,amapinfo,imgsrc,dailyarr,system_params
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700,900&display=swap');

:root {
  --gradient: linear-gradient( 135deg, #72EDF2 10%, #5151E5 100%);
}

* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 1.25em;
}

.clear {
  clear: both;
}
.body1{
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: 'Montserrat', sans-serif;
  background-color: #ffffff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;

}
.system_info{
  display: flex;
  height: 40%;
  width: 100%;
  background-color: #ffffff;
  /*float:left;*/
  /*margin-block-end: 2px;*/
  flex-direction: row;
}
.cpu_info{
  height: 100%;
  width: 20%;
  background-color: #2f9394;
  border-radius: 200px;
  margin-left:1%;   /* 距离左侧 px */
  text-align:center;
}
.os_info{
  height: 100%;
  width: 20%;
  background-color: #10b897;
  border-radius: 200px;
  margin-left:1%;   /* 距离左侧 px */
  text-align:center;
}
.disk_info{
  height: 100%;
  width: 35%;
  background-color: #236973;
  border-radius: 50px;
  margin-left:15%;   /* 距离左侧 px */
  text-align:center;
}
.disk_text{
  /*margin-left:40%;   !* 距离左侧 px *!*/
  color: #ffffff;
}
.ram_text{
  /*margin-left:40%;   !* 距离左侧 px *!*/
  color: #ffffff;
}
.os_text{
  /*margin-left:40%;   !* 距离左侧 px *!*/
  color: #ffffff;
}
.cpu_text{
  /*margin-left:40%;   !* 距离左侧 px *!*/
  color: #ffffff;
}
.disk_info_text{
  color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-left:2%;   /* 距离左侧 px */
}
.disk_list{
  /*background-color: #5b553d;*/
  display: flex;
  flex-direction: row;
  color: #ffffff;
}
.cpu_info_text{
  /*margin-left:2%;   !* 距离左侧 px *!*/
  color: #ffffff;
  /*text-align:center;*/
}
.ram_info_text{
  /*margin-left:2%;   !* 距离左侧 px *!*/
  color: #ffffff;
  /*text-align:center;*/
}

.week-lists{
  list-style: none;
  line-height: 40px;
  margin-left: 50px;
}
.week-li{
  display: block;
  float: left;
}
.mybody {
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: 'Montserrat', sans-serif;
  /*background-color: #7cd4d7;*/
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  /*position:absolute;*/
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: start;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: start;
  border-radius: 25px;
  block-progression: 25px;
  flex-direction: column;  /* 按照列column(垂直方向)排列*/
}

.container {
  border-radius: 25px;
  -webkit-box-shadow: 0 0 70px -10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 70px -10px rgba(0, 0, 0, 0.2);
  background-color: #06686b;
  color: #ffffff;
  height: 50%;
  width: 65%;
  margin-left:20%;   /* 距离左侧 px */
  margin-top:3%;   /* 距离左侧 px */
}

.weather-side {
  position: relative;
  height: 100%;
  border-radius: 25px;
  /*background-image: url("../img/1.jpg");*/
  width: 300px;
  -webkit-box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.2);
  -webkit-transition: -webkit-transform 300ms ease;
  transition: -webkit-transform 300ms ease;
  -o-transition: transform 300ms ease;
  -webkit-transform: translateZ(0) scale(1.02) perspective(1000px);
  transform: translateZ(0) scale(1.02) perspective(1000px);
  float: left;
}

.weather-side:hover {
  -webkit-transform: scale(1.1) perspective(1500px) rotateY(10deg);
  transform: scale(1.1) perspective(1500px) rotateY(10deg);
}

.weather-gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: var(--gradient);
  border-radius: 25px;
  opacity: 0.8;
  background-color: #79aaa6;
}

.date-container {
  position: absolute;
  top: 25px;
  left: 25px;
}

.date-dayname {
  margin: 0;
}

.date-day {
  display: block;
}

.location {
  display: inline-block;
  margin-top: 10px;
}

.location-icon {
  display: inline-block;
  height: 0.8em;
  width: auto;
  margin-right: 5px;
}

.weather-container {
  position: absolute;
  bottom: 25px;
  left: 25px;
}

.weather-icon.feather {
  height: 60px;
  width: auto;
}

.weather-temp {
  margin: 0;
  font-weight: 700;
  font-size: 4em;
}

.weather-desc {
  margin: 0;
}

.info-side {
  position: relative;
  float: left;
  height: 100%;
  padding-top: 20px;
  left: 50px;
  /*width:50%*/
}

.today-info {
  padding: 15px;
  margin: 0 25px 25px 25px;
   	/*box-shadow: 0 0 50px -5px rgba(0, 0, 0, 0.25);*/
  border-radius: 10px;
}

.today-info>div:not(:last-child) {
  margin: 0 0 10px 0;
}

.today-info>div .title {
  float: left;
  font-weight: 700;
}

.today-info>div .value {
  float: right;
}

.week-list {
  list-style-type: none;
  padding: 0;
  margin: 20px 40px;
  -webkit-box-shadow: 0 0 50px -5px rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 50px -5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 88%;
  /*background: #*/
}

.week-list>li {
  float: left;
  padding: 15px;
  cursor: pointer;
  -webkit-transition: 200ms ease;
  -o-transition: 200ms ease;
  transition: 200ms ease;
  border-radius: 10px;
}

.week-list>li:hover {
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
  background: #ffffff;
  color: #0c969a;
  -webkit-box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 40px -5px rgba(0, 0, 0, 0.2)
}

.week-list>li.active {
  background: #06686b;
  color: #ffffff;
  border-radius: 10px;
  list-style:none;
  /*padding: 0;*/
  /*margin: 0;*/
  float: left;
  display: block;
  width: 90px;
}

.week-list>li .day-name {
  display: block;
  margin: 10px 0 0 0;
  text-align: center;
}

.week-list>li .day-icon {
  display: block;
  height: 30px;
  width: auto;
  margin: 0 auto;
}

.week-list>li .day-temp {
  display: block;
  text-align: center;
  margin: 10px 0 0 0;
  font-weight: 700;
}

.location-container {
  padding: 25px 35px;
}

.location-button {
  outline: none;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: none;
  border-radius: 25px;
  padding: 10px;
  font-family: 'Montserrat', sans-serif;
  background-image: var(--gradient);
  color: #ffffff;
  font-weight: 700;
  -webkit-box-shadow: 0 0 30px -5px rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 30px -5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  -webkit-transition: -webkit-transform 200ms ease;
  transition: -webkit-transform 200ms ease;
  -o-transition: transform 200ms ease;
  transition: transform 200ms ease;
  transition: transform 200ms ease, -webkit-transform 200ms ease;
}

.location-button:hover {
  -webkit-transform: scale(1.05);
  -ms-transform: scale(1.05);
  transform: scale(1.05);
}

.location-button .feather {
  height: 1em;
  width: auto;
  margin-right: 5px;
}

</style>