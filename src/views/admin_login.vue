<template>
    <div class="login-wrap">
        <div class="ms-login">
            <h1 class="ms-title">欢迎登录</h1>

            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.user" tabindex="1" placeholder="用户名/手机号">
                        <template #prepend>
                            <el-button  icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
              <el-form-item prop="phoneCode">
                <el-input v-model="param.phoneCode" tabindex="2" class="login-code" placeholder="请输入验证码">
                  <template #prepend>
                    <el-button icon="el-icon-collection-tag"></el-button>
                  </template>
                </el-input>
                &nbsp;
                <el-button  class="login-codebtn" @click="getCode()">获取验证码</el-button>
              </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" tabindex="3" placeholder="密码" v-model="param.pwd" @keyup.enter="admin_login()">
                        <template #prepend>
                            <el-button  icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
              <div >
                <el-checkbox style="width: 60%" v-model="param.radio" label="记住密码" size="large" />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-button style="width: 32%; color: #3399CC" @click="register()" type="text">忘记密码？</el-button>
              </div>

                <div class="login-btn">
                    <el-button type="primary" @click="admin_login()">登录</el-button>
                </div>
              <div style="text-align:center">
                <el-button @click="register()" style="color: #3399CC" type="text">没有账号？去注册</el-button>
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
import {getCodes, login} from "../api/index";




export default {
  name: "admin_login",
  setup() {

    const router = useRouter();
    const param = reactive({
      user: "",
      pwd: "",
      phone:'',
      phoneCode:'',
    });
    // 登录接口
    const admin_login = () => {
      if (param.user.length===0){
        ElMessage.error("用户名不能为空！")
      }else if(param.pwd.length===0){
        ElMessage.error("密码不能为空！")
      }else{
        login(param).then((res) => {
          let msg;
          const code = res.code;

          console.log(code)
              if (code===200){
                msg = res.msg;
                console.log(msg)
                ElMessage.success(""+msg)
                sessionStorage.clear()
                localStorage.removeItem("user_name");
                localStorage.removeItem("token");
                sessionStorage['user_name']=JSON.stringify(res.user_info.user_name)
                sessionStorage['token']=JSON.stringify(res.jwt_token)
                localStorage.setItem("user_name",res.user_info.user_name);
                localStorage.setItem("token",res.jwt_token);
                router.push("/");
              }
              else{
                msg = res.msg;
                ElMessage.error(""+msg)
              }
            }
        );
      }

    };
    const register= () => {
      console.log('register')
      router.push("/register");
    }
    const getCode=()=>{
      getCodes().then((res)=>{
        param.phoneCode=res.verCode;
      }).catch({

      })

    }

    return {
      param,
      admin_login,
      register,
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
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}
.login-code{
  width: 71%;
}
.login-codebtn{
  color: #2d8cf0;
}
.ms-title {
    width: 100%;
    line-height: 55px;
    text-align: center;
    font-size: 25px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 46%;
    top: 30%;
    width: 500px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
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
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>