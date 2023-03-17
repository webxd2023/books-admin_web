<template>
    <div class="login-wrap">
        <div class="ms-login">
          <div>
            <h3 class="ms-title">欢迎注册</h3>
          </div>

            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
              <el-form-item prop="user">
                <el-input v-model="param.user" tabindex="1" placeholder="请设置用户名">
                  <template #prepend>
                    <el-button icon="el-icon-user"></el-button>
                  </template>
                </el-input>
              </el-form-item>
                <el-form-item prop="phone">
                    <el-input v-model="param.phone" tabindex="2" placeholder="请设置手机号，可用于登录和找回密码">
                        <template #prepend>
                            <el-button icon="el-icon-mobile-phone"></el-button>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input type="password" tabindex="3" placeholder="请设置登录密码" v-model="param.pwd" @keyup.enter="admin_login()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
              <el-form-item prop="nickname">
                <el-input v-model="param.nickname" tabindex="4" placeholder="请设置昵称">
                  <template #prepend>
                    <el-button icon="el-icon-chat-line-round"></el-button>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="phoneCode">
                <el-input v-model="param.code" tabindex="5" class="res-code" placeholder="请输入验证码">
                  <template #prepend>
                    <el-button icon="el-icon-collection-tag"></el-button>
                  </template>
                </el-input>
                &nbsp;
                <el-button  class="res-codebtn" @click="getCode()">获取验证码</el-button>
              </el-form-item>
              <div class="login-btn">
                <el-button type="success" round="True"  @click="registers()">注册</el-button>
              </div>
              <div>
                <el-checkbox v-model="param.radio" label="阅读并接受《用户协议》《隐私声明》" size="large" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <el-button @click="admin_login()" type="text">已有账号？去登录</el-button>


              </div>


            </el-form>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import {getCodes, register} from "../api/index";

export default {
  name: "register",
  setup() {
    const router = useRouter();
    const param = reactive({
      user: "",
      pwd: "",
      confirmPwd:"",
      nickname:"",
      phone:"",
      radio: '1',
      code:""
    });
    // 登录接口
    const admin_login = () => {
      router.push("/login");

    };
    const getCode=()=>{
      getCodes().then((res)=>{
        param.code=res.verCode;
      }).catch({

      })

    }
    const registers= () => {
      if (param.user.length===0){
        ElMessage.error("用户名不能为空！")
      }else if(param.pwd.length===0){
        ElMessage.error("密码不能为空！")
      }else if(param.nickname.length===0){
        ElMessage.error("昵称不能为空！")
      }else if(param.phone.length===0){
        ElMessage.error("手机号不能为空！")
      }else if ((param.user.length<5)  || (param.user.length>15)){
        ElMessage.error("请输入5-15位的用户名！")
      }
      else{
        register(param).then((res) => {
              var code = res.code;

              if (code===200){
                var msg = res.msg;
                ElMessage.success(""+msg)
                sessionStorage.clear()
                localStorage.removeItem("user_name");
                localStorage.removeItem("token");
                sessionStorage['user_name']=JSON.stringify(res.user_info.user_name)
                sessionStorage['token']=JSON.stringify(res.user_info.jwt_token)
                localStorage.setItem("user_name",res.user_info.user_name);
                localStorage.setItem("token",res.jwt_token);
                router.push("/");
              }
              else{
                var msg = res.msg;
                ElMessage.error(""+msg)
              }
            }
        );
      }
    }

    return {
      param,
      admin_login,
      registers,
      getCode
    };
  },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/register-bg.png);
    background-size: 100%;
}
.res-code{
  width: 71%;
}
.res-codebtn{
  color: #2d8cf0;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 30px;
    color: #f3f3f3;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 48%;
    top: 30%;
    width: 500px;
    margin: -190px 0 0 -175px;
    border-radius: 10px;

    background: rgba(249, 247, 247, 0.5);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;

}
.login-btn button {
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #130e0e;
}
</style>