<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const jobsList = ref([])

const fetchJobs = async()=> {
    try{
        const response = await axios.get('http://localhost:3000/jobs')
        jobsList.value = response.data
    }
    catch(error){
        console.log('数据获取失败',error)
    }
}

onMounted(()=>{
    fetchJobs()
})

const statusMap = {
    pending: '待处理',
    interview: '面试中',
}
const stats = computed(() => {
    return {
        total: jobsList.value.length,
        interview: jobsList.value.filter(job => job.status === 'interview').length,
        offer: jobsList.value.filter(job => job.status === 'offer').length,
        reject: jobsList.value.filter(job => job.status === 'reject').length,
    }
})
const getLabel = (key) => {
    const map = {
        total: '总投递',
        interview: '面试中',
        offer: '已录取',
        reject: '已拒绝'
    }
    return map[key]
}
</script>

<template>
    <div class="stats-row">
        <div class="stat-card" v-for="(value, key) in stats" :key="key">
            <p>{{ value }}</p>
            <h4>{{ getLabel(key) }}</h4>
        </div>
    </div>
    <div class="table-container">
        <div class="table-header">
            <span>公司</span>
            <span>职位</span>
            <span>地点</span>
            <span>投递日期</span>
            <span>状态</span>
        </div>

        <ul class="job-list">
            <li v-for="job in jobsList" :key="job.id" class="job-item">
                <span>{{ job.company }}</span>
                <span>{{ job.position }}</span>
                <span>{{ job.location }}</span>
                <span>{{ job.applyDate }}</span>

                <span class="status-tag" :class="{
                    'bg-pending': job.status === 'pending',
                    'bg-interview': job.status === 'interview'
                }">
                    {{ statusMap[job.status] }}
                </span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.stats-row {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
}

.stat-card {
    flex: 1;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.table-container {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 20px;
}

.table-header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    color: #999;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.job-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.job-item {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #f5f5f5;
}

.status-tag {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
}

.bg-pending {
    background-color: #f5f5f5;
    color: #999;
}

.bg-interview {
    background-color: #fff7e6;
    color: #faad14;
}
</style>