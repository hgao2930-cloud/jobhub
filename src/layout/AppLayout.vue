<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <div class="header-left">
        <span class="logo">求职管理系统</span>
      </div>
      <div class="header-right">
        <el-dropdown @command="handleCommand">
          <span class="user-info">
            <el-avatar :size="32">{{ userName }}</el-avatar>
            <span class="username">{{ userName }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="layout-aside">
        <el-menu :router="true" :default-active="route.path" class="menu">
          <el-menu-item index="/dashboard">
            <el-icon><HomeFilled /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/jobs">
            <el-icon><Briefcase /></el-icon>
            <span>岗位管理</span>
          </el-menu-item>
          <el-menu-item index="/profile">
            <el-icon><User /></el-icon>
            <span>个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { HomeFilled, Briefcase, User } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
const userName = computed(() => userInfo.name || userInfo.username || '用户')

function handleCommand(command) {
  if (command === 'profile') {
    router.push('/profile')
  } else if (command === 'logout') {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    router.push('/login')
  }
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 20px;
}
.header-left .logo {
  font-size: 20px;
  font-weight: 700;
  color: #409eff;
}
.header-right .user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.header-right .username {
  font-size: 14px;
  color: #333;
}
.layout-aside {
  background: #fff;
  border-right: 1px solid #e4e7ed;
}
.menu {
  border-right: none;
}
.layout-main {
  background: #f5f7fa;
  padding: 20px;
}
</style>
