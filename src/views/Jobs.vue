<template>
    <h3>岗位管理</h3>
    <div class="toolbar">
        <el-button type="primary" @click="handleAdd">新增岗位</el-button>
        <el-input v-model="searchKeyword" placeholder="搜索公司或职位" clearable style="width: 200px" />
        <el-select v-model="selectedStatus" placeholder="筛选状态" clearable style="width: 140px">
            <el-option label="待处理" value="pending" />
            <el-option label="面试中" value="interview" />
            <el-option label="已录取" value="offer" />
            <el-option label="已拒绝" value="reject" />
        </el-select>
    </div>
    <el-table :data="jobs" stripe style="width: 100%">
        <el-table-column prop="company" label="公司" />
        <el-table-column prop="position" label="职位" />
        <el-table-column prop="location" label="地点" />
        <el-table-column prop="salary" label="薪资" />
        <el-table-column prop="applyDate" label="投递日期" />
        <el-table-column label="状态">
            <template #default="scope">
                <el-tag
                    :type="scope.row.status === 'pending' ? 'info' : scope.row.status === 'interview' ? 'warning' : scope.row.status === 'offer' ? 'success' : 'danger'"
                    size="small">
                    {{ statusMap[scope.row.status] }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="page" :page-size="pageSize" :total="total" layout="total, prev, pager, next"
        @current-change="fetchJobs" background style="margin-top: 20px; justify-content: center;" />

    <JobDialog :visible="dialogVisible" :job="currentJob" @update:visible="dialogVisible = $event"
        @submit="handleSubmit" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getJobsApi, createJobApi, updateJobApi, deleteJobApi } from '@/api/jobs'
import JobDialog from '../components/JobDialog.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const jobs = ref([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const searchKeyword = ref('')
const selectedStatus = ref('')

watch(searchKeyword, () => { page.value = 1; fetchJobs() })
watch(selectedStatus, () => { page.value = 1; fetchJobs() })
const fetchJobs = async () => {
    try {
        const params = { _page: page.value, _limit: pageSize.value }
        if (searchKeyword.value) {
            params.q = searchKeyword.value
        }
        if (selectedStatus.value) {
            params.status = selectedStatus.value
        }
        const response = await getJobsApi(params)
        jobs.value = response.data
        total.value = Number(response.headers['x-total-count'])
    }
    catch (error) {
        console.error('网络错误', error)
    }
}

onMounted(() => {
    fetchJobs()
})
const statusMap = {
    pending: '待处理',
    interview: '面试中',
    offer: '已录取',
    reject: '已拒绝'
}

const currentJob = ref(null)
const dialogVisible = ref(false)

function handleAdd() {
    currentJob.value = null,
        dialogVisible.value = true
}
function handleEdit(job) {
    currentJob.value = job,
        dialogVisible.value = true
}
async function handleSubmit(formData) {
    if (formData.id) {
        await updateJobApi(formData.id, formData)
    }
    else {
        await createJobApi(formData)
    }
    dialogVisible.value = false
    fetchJobs()
}
async function handleDelete(job) {
    try {
        await ElMessageBox.confirm(`确定删除${job.company}岗位吗？`, '提示')
        await deleteJobApi(job.id)
        ElMessage.success('删除成功')
        fetchJobs()
    }
    catch {
        // cancelled
    }
}
</script>

<style scoped>
.toolbar {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    align-items: center;
}

h3 {
    margin-bottom: 16px;
}
</style>
