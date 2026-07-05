<template>
    <div class="login-container">
        <el-card class="login-card">
            <h2>求职管理系统</h2>
            <el-input v-model="username" placeholder="请输入用户名" />
            <el-input v-model="password" type="password" placeholder="请输入密码" show-password />
            <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-card>
    </div>
</template>

<script setup>
import { loginApi } from '../api/users';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const username = ref('')
const password = ref('')
const router = useRouter()
const handleLogin = async () => {
    const user = username.value
    const pass = password.value
    if (!user || !pass) {
        ElMessage.warning('账号和密码不能为空')
        return
    }
    try {
        const response = await loginApi(user, pass)
        const isLoginSuccess = response.data.length > 0
        if (isLoginSuccess) {
            ElMessage.success('登录成功')
            const user = response.data[0]
            localStorage.setItem('token', user.id)
            localStorage.setItem('userInfo', JSON.stringify(user))
            router.push('/dashboard')
        }
        else {
            ElMessage.error('账号或密码错误')
        }
    }
    catch (error) {
        console.error('登录失败', error)
        ElMessage.error('网络错误')
    }
}
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f5f7fa;
}
.login-card {
    width: 400px;
}
.login-card h2 {
    text-align: center;
    margin-bottom: 24px;
}
.login-card .el-input {
    margin-bottom: 16px;
}
.login-card .el-button {
    width: 100%;
}
</style>
