<template>
    <h3>个人中心</h3>
    <el-card>
        <template #header>
            <div class="profile-header">
                <span>{{ form.username }}</span>
                <el-button @click="handleLogout" type="danger" size="small">退出登录</el-button>
            </div>
        </template>
        <el-form :model="form" :rules="rules" ref="formRef" label-width="60px">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="form.phone" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSave">保存修改</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup>
import { updateUserApi } from '@/api/users'
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'

const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')))
const form = reactive({
    username: userInfo.value.username,
    name: userInfo.value.name,
    email: userInfo.value.email,
    phone: userInfo.value.phone
})

const rules = {
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入电话', trigger: 'blur' }]
}

const formRef = ref(null)

async function handleSave() {
    if (!formRef.value) return
    try {
        await formRef.value.validate()
        const res = await updateUserApi(userInfo.value.id, form)
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        ElMessage.success('保存成功')
    }
    catch (error) {
        if (error?.message) return
        ElMessage.error('保存失败')
        console.error('网络错误', error)
    }
}

const router = useRouter()
function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    router.push('/login')
}
</script>

<style scoped>
h3 {
    margin-bottom: 16px;
}
.profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
