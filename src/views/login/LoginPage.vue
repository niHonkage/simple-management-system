<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const loginForm = ref({
  username: '',
  password: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 15, message: '用户名是4~15位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码是6~15位的字符', trigger: 'blur' }
  ]
}
const loading = ref(false)
const formRef = ref(null)
const store = useStore()
const onLogin = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      ElMessage.error('请检查表单信息是否正确')
      return
    }
    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading.value = false
        // todo
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
      })
  })
}
</script>
<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form-container">
       <el-form class="form" :model="loginForm" :rules="rules" ref="formRef">
        <el-form-item class="title-container">
          <h3 class="title">用户登录</h3>
        </el-form-item>
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="loginForm.username">
            <template #prefix>
              <el-icon class="el-input__icon"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" show-password type="password" v-model="loginForm.password">
            <template #prefix>
              <el-icon class="el-input__icon"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;margin-top: 30px;" @click="onLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>
<style lang="scss" scoped>
.bg{
  border-radius: 0 50px 50px 0;
  background: url('@/assets/loginBg.jpg');
  background-size: cover;
  background-position: center;
}
.title{
  text-align: center;
  margin-bottom: 28px;
  font-size: 32px;
  color: #eee;
}
.login-page{
  height: 100vh;
  width: 100vw;
  background: linear-gradient(180deg, rgba(42,85,164,1) 12%, rgba(27,81,177,1) 38%, rgba(47,103,196,1) 59%, rgba(104,159,219,1) 88%);;
}
.form-container{
  display: flex;
  justify-content: center;
  align-items: center;
  .form{
    width: 100%;
    font-size: 20px;
    .el-input__icon{
      font-size: 20px;
      margin-top: 2px;
    }
  }
}

</style>
