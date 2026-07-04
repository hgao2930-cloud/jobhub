<template>
    <div>
        <input type="text" v-model="username" placeholder="请输入用户名">
        <input type="password" v-model="password" placeholder="请输入密码">
        <button @click="handleLogin">登录</button>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()
const handleLogin = async() =>{
    const user = username.value
    const pass = password.value
    if(!user || !pass){
        alert('账号和密码不能为空')
        return
    }
    try{
        const response = await axios.get('http://localhost:3000/users',{
            params:{
                username:user,
                password:pass
            }
        })
        const isLoginSuccess = response.data.length >0
        if(isLoginSuccess){
            alert('登录成功')
            router.push('/dashboard')
        }
        else{
            alert('账号或密码错误')
        }
    }
    catch(error){
        console.error('登录失败',error)
        alert('网络错误')
    }
}
</script>

<style scoped></style>