<script setup>
import { ref, computed, onMounted } from 'vue'
import { getJobsApi } from '../api/jobs'

const jobsList = ref([])

const fetchJobs = async () => {
    try {
        const response = await getJobsApi()
        jobsList.value = response.data
    }
    catch (error) {
        console.log('数据获取失败', error)
    }
}

onMounted(() => {
    fetchJobs()
})

const stats = computed(() => {
    return {
        total: jobsList.value.length,
        interview: jobsList.value.filter(job => job.status === 'interview').length,
        offer: jobsList.value.filter(job => job.status === 'offer').length,
        reject: jobsList.value.filter(job => job.status === 'reject').length,
    }
})

const statConfig = {
    total: { label: '总投递', color: '#409eff' },
    interview: { label: '面试中', color: '#e6a23c' },
    offer: { label: '已录取', color: '#67c23a' },
    reject: { label: '已拒绝', color: '#f56c6c' }
}

const statusMap = {
    pending: '待处理',
    interview: '面试中',
    offer: '已录取',
    reject: '已拒绝'
}
</script>

<template>
    <div class="stats-row">
        <el-card v-for="(value, key) in stats" :key="key" class="stat-card">
            <div class="stat-value" :style="{ color: statConfig[key].color }">{{ value }}</div>
            <div class="stat-label">{{ statConfig[key].label }}</div>
        </el-card>
    </div>
    <el-card class="table-card">
        <el-table :data="jobsList" stripe style="width: 100%">
            <el-table-column prop="company" label="公司" />
            <el-table-column prop="position" label="职位" />
            <el-table-column prop="location" label="地点" />
            <el-table-column prop="applyDate" label="投递日期" />
            <el-table-column label="状态">
                <template #default="scope">
                    <el-tag :type="scope.row.status === 'pending' ? 'info' : scope.row.status === 'interview' ? 'warning' : scope.row.status === 'offer' ? 'success' : 'danger'" size="small">
                        {{ statusMap[scope.row.status] }}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<style scoped>
.stats-row {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
}
.stat-card {
    flex: 1;
    text-align: center;
}
.stat-value {
    font-size: 32px;
    font-weight: bold;
}
.stat-label {
    font-size: 14px;
    color: #999;
    margin-top: 8px;
}
</style>
