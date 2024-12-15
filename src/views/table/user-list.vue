<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        创建用户
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="用户名" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.CreatedAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后登陆时间" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.LastLoginTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="info" @click="handleReset(row.username)">
            修改密码
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row.username)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新建用户" :visible.sync="dialogFormVisible">
      <el-form ref="createUserRef" :model="temp" :rules="loginRules">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="temp.username" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="temp.password" placeholder="请输入密码" show-password />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="userCreate">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="dialogResetVisible">
      <el-form ref="resetUserPass" :model="temp" :rules="loginRules">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="temp.username" autocomplete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="temp.password" placeholder="请输入密码" show-password />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogResetVisible = false">取 消</el-button>
        <el-button type="primary" @click="userReset">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="确定要删除用户" :visible.sync="dialogDeleteVisible">
      <el-form :model="temp">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="temp.username" autocomplete="off" :disabled="true" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUserDelete">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { createUser, deleteUser, fetchUserList, resetUser } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import { validUsername } from '@/utils/validate'

export default {
  name: 'ComplexTable',
  directives: { waves },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('账户名只允许小写字母+数字'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码要求6位以上'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        username: '',
        password: '',
        CreatedAt: '',
        LastLoginTime: ''
      },
      dialogFormVisible: false,
      dialogResetVisible: false,
      dialogDeleteVisible: false,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      temp: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchUserList(this.listQuery).then(response => {
        this.list = response.data.items

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
      this.listLoading = false
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        username: '',
        password: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
    },
    handleReset(data) {
      this.resetTemp()
      this.dialogResetVisible = true
      this.temp.username = data
    },
    handleDelete(data) {
      this.resetTemp()
      this.dialogDeleteVisible = true
      this.temp.username = data
    },
    userCreate() {
      this.dialogFormVisible = true
      this.$refs.createUserRef.validate(valid => {
        if (valid) {
          const formData = new FormData()
          formData.append('username', this.temp.username)
          formData.append('password', this.temp.password)

          createUser(formData).then(() => {
            // 当 Promise 解决时，调用 getList
            this.getList()
            // 并设置 listLoading 为 false
            this.listLoading = false
            this.dialogFormVisible = false

            this.resetTemp()
          }).catch((error) => {
            // 如果有错误，同样需要设置 listLoading 为 false
            this.listLoading = false
            console.error('添加用户发生错误:', error)
          })
        } else {
          console.log('添加用户发生错误!!')
          return false
        }
      })
    },
    handleUserDelete() {
      this.listLoading = true
      const formData = new FormData()
      formData.append('username', this.temp.username)

      deleteUser(formData).then(() => {
        // 当 Promise 解决时，调用 getList
        this.getList()
        // 并设置 listLoading 为 false
        this.dialogDeleteVisible = false
      }).catch((error) => {
        // 如果有错误，同样需要设置 listLoading 为 false
        this.dialogDeleteVisible = true
        console.error('删除用户发生错误:', error)
      })
    },
    userReset() {
      this.$refs.resetUserPass.validate(valid => {
        if (valid) {
          this.dialogResetVisible = true // Move this line out of the Promise
          const formData = new FormData()
          formData.append('username', this.temp.username)
          formData.append('password', this.temp.password)

          resetUser(formData).then(() => {
            // 当 Promise 解决时，调用 getList
            this.getList()
            // 并设置 listLoading 为 false
            this.listLoading = false
          }).catch((error) => {
            // 如果有错误，同样需要设置 listLoading 为 false
            this.listLoading = false
            console.error('修改密码失败:', error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
