<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="dataForm" :model="listQuery" :rules="rules">
        <el-row>
          <el-col :span="24">
            <el-form-item label="商户号" prop="merchantName">
              <el-input v-model="listQuery.merchantName" placeholder="商户号" style="width: 300px;" class="filter-item" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="IP地址" prop="IP">
              <el-input v-model="listQuery.IP" placeholder="多个IP地址,使用英文逗号分割" style="width: 300px;" class="filter-item" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="48">
            <el-button v-waves :loading="listLoading" class="filter-item" style="margin-left: 100px;" type="primary" icon="el-icon-plus" @click="addIP">
              添加
            </el-button>
            <el-button v-waves :loading="listLoading" class="filter-item" type="danger" icon="el-icon-close" @click="deleteIP">
              删除
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh; /* Full viewport height */
}

.filter-container {
  width: 100%;
  max-width: 600px; /* Adjust as needed */
  padding: 20px;
  background-color: #fff; /* Optional: for better visibility */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* Optional: for better visibility */
}
</style>
<script>
import waves from '@/directive/waves'
import { fetchAddIP, fetchDeleteIP } from '@/api/whiteList'

export default {
  name: 'ComplexTable',
  directives: { waves },
  data() {
    const validateIP = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('IP地址不能为空'))
      }
      const ips = value.split(',')
      const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      const ipv6Pattern = /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|(([0-9a-fA-F]{1,4}:){1,6}|:):(([0-9a-fA-F]{1,4}:){1,5}|:):(([0-9a-fA-F]{1,4}:){1,4}|:):(([0-9a-fA-F]{1,4}:){1,3}|:):(([0-9a-fA-F]{1,4}:){1,2}|:):(([0-9a-fA-F]{1,4}:){1}|:):(([0-9a-fA-F]{1,4})|:)|::([0-9a-fA-F]{1,4}:){0,5}(([0-9a-fA-F]{1,4}:){1,4}|:):(([0-9a-fA-F]{1,4}:){1,3}|:):(([0-9a-fA-F]{1,4}:){1,2}|:):(([0-9a-fA-F]{1,4}:){1}|:):(([0-9a-fA-F]{1,4})|:)|::([0-9a-fA-F]{1,4}:){0,4}(([0-9a-fA-F]{1,4}:){1,3}|:):(([0-9a-fA-F]{1,4}:){1,2}|:):(([0-9a-fA-F]{1,4}:){1}|:):(([0-9a-fA-F]{1,4})|:)|::([0-9a-fA-F]{1,4}:){0,3}(([0-9a-fA-F]{1,4}:){1,2}|:):(([0-9a-fA-F]{1,4}:){1}|:):(([0-9a-fA-F]{1,4})|:)|::([0-9a-fA-F]{1,4}:){0,2}(([0-9a-fA-F]{1,4}:){1}|:):(([0-9a-fA-F]{1,4})|:)|::([0-9a-fA-F]{1,4}:){0,1}(([0-9a-fA-F]{1,4})|:)|::)$/

      for (let i = 0; i < ips.length; i++) {
        const ip = ips[i].trim()
        if (!ipv4Pattern.test(ip) && !ipv6Pattern.test(ip)) {
          return callback(new Error('Invalid IP address format'))
        }
      }
      callback()
    }
    const validateMerchantName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Merchant name cannot be empty'))
      }
      const merchants = value.split(',')
      const merchantPattern = /^[a-zA-Z0-9]{3}$/
      for (let i = 0; i < merchants.length; i++) {
        const merchant = merchants[i].trim()
        if (!merchantPattern.test(merchant)) {
          return callback(new Error('Invalid merchant name format'))
        }
      }
      callback()
    }
    return {
      listLoading: false,
      listQuery: {
        merchantName: undefined,
        IP: undefined,
        OpUser: undefined,
        country: this.$route.path.substring(1)
      },
      rules: {
        merchantName: [{ required: true, validator: validateMerchantName, trigger: 'blur' }],
        IP: [{ required: true, validator: validateIP, trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getCurrentUser()
  },
  methods: {
    getCurrentUser() {
      this.listQuery.OpUser = this.$store.getters.name
    },
    addIP() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          const data = {
            merchantName: this.listQuery.merchantName,
            IP: this.listQuery.IP,
            OpUser: this.listQuery.OpUser,
            country: this.listQuery.country
          }
          fetchAddIP(data).then(() => {
            this.$notify({
              title: 'Success',
              message: 'IP地址添加成功',
              type: 'success',
              duration: 2000
            })
          }).finally(() => {
            this.listLoading = false
          })
        }
      })
    },
    deleteIP() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          const data = {
            merchantName: this.listQuery.merchantName,
            IP: this.listQuery.IP,
            OpUser: this.listQuery.OpUser,
            country: this.listQuery.country
          }
          fetchDeleteIP(data).then(() => {
            this.$notify({
              title: 'Success',
              message: 'IP地址删除成功',
              type: 'success',
              duration: 2000
            })
          }).finally(() => {
            this.listLoading = false
          })
        }
      })
    }
  }
}
</script>
