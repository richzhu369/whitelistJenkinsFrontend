<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="IP" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商户号" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.merchant_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人员" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.op_user }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ formatDate(row.created_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150px">
        <template slot-scope="{ row }">
          <span>{{ transformAct(row.act) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchLogList } from '@/api/whiteListLog'

export default {
  name: 'ComplexTable',
  data() {
    return {
      visible: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        Ip: '',
        OpTime: '',
        SiteName: '',
        OpUser: '',
        MerchantNumber: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchLogList().then(response => {
        this.list = response.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
      this.listLoading = false
    },
    transformAct(act) {
      return act === 'del' ? '删除' : act === 'add' ? '增加' : act
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
  }
}
</script>
