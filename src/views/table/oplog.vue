<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.Ip" placeholder="IP地址" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.MerchantNumber" placeholder="商户名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.OpUser" placeholder="操作人员" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
    </div>

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
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchLogList } from '@/api/whiteListLog'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves'

export default {
  name: 'ComplexTable',
  directives: { waves },
  components: { Pagination },
  data() {
    return {
      visible: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
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
      fetchLogList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
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
    },
    handleFilter() {
      fetchLogList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  }
}
</script>
