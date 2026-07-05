<template>
    <el-dialog :model-value="visible" @update:model-value="$emit('update:visible', $event)" :title="isEdit ? '编辑岗位' : '新增岗位'" width="500px">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
            <el-form-item label="公司名称" prop="company">
                <el-input v-model="form.company" />
            </el-form-item>
            <el-form-item label="职位名称" prop="position">
                <el-input v-model="form.position" />
            </el-form-item>
            <el-form-item label="工作地点" prop="location">
                <el-input v-model="form.location" />
            </el-form-item>
            <el-form-item label="薪资范围">
                <el-input v-model="form.salary" />
            </el-form-item>
            <el-form-item label="投递日期">
                <el-date-picker v-model="form.applyDate" type="date" placeholder="选择日期" style="width: 100%" value-format="YYYY-MM-DD" />
            </el-form-item>
            <el-form-item label="当前状态">
                <el-select v-model="form.status" style="width: 100%">
                    <el-option label="待处理" value="pending" />
                    <el-option label="面试中" value="interview" />
                    <el-option label="已录取" value="offer" />
                    <el-option label="已拒绝" value="reject" />
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.note" type="textarea" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="$emit('update:visible', false)">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
    visible: Boolean,
    job: {
        type: Object,
        default: null
    }
})
const emit = defineEmits(['update:visible', 'submit'])

const isEdit = ref(false)
const form = reactive({
    company: '',
    position: '',
    location: '',
    salary: '',
    applyDate: '',
    status: 'pending',
    note: ''
})

const rules = {
    company: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
    position: [{ required: true, message: '请输入职位名称', trigger: 'blur' }],
    location: [{ required: true, message: '请输入工作地点', trigger: 'blur' }]
}

const formRef = ref(null)

watch(() => props.job, (val) => {
    if (val) {
        isEdit.value = true
        form.company = val.company
        form.position = val.position
        form.location = val.location
        form.salary = val.salary
        form.applyDate = val.applyDate
        form.status = val.status
        form.note = val.note
    }
    else {
        isEdit.value = false
        form.company = ''
        form.position = ''
        form.location = ''
        form.salary = ''
        form.applyDate = ''
        form.status = 'pending'
        form.note = ''
    }
}, { immediate: true })

async function handleSubmit() {
    if (!formRef.value) return
    try {
        await formRef.value.validate()
        emit('submit', { ...form, id: props.job?.id })
    }
    catch {
        ElMessage.warning('请填写必填项')
    }
}
</script>
