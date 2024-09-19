<template>
  <div>
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="150px">
      <!-- Default Settings -->
      <el-card>
        <div slot="header">
          <el-tooltip effect="dark" content="设置全局属性" placement="top">
            <span>Default</span>
          </el-tooltip>
        </div>
        <el-form-item label="Appdir" prop="default.appdir">
          <el-input v-model="form.default.appdir"></el-input>
        </el-form-item>
        <el-form-item label="Appname" prop="default.appname">
          <el-input v-model="form.default.appname"></el-input>
        </el-form-item>
      </el-card>

      <!-- Git Settings -->
      <el-card>
        <div slot="header">
          <el-tooltip effect="dark" content="是否从Git上拉取代码来进行部署" placement="top">
            <el-checkbox v-model="form.git.enabled">Git</el-checkbox>
          </el-tooltip>
        </div>
        <template v-if="form.git.enabled">
          <el-form-item label="Repo" prop="git.repo">
            <el-input v-model="form.git.repo"></el-input>
          </el-form-item>
          <el-form-item label="Username" prop="git.username">
            <el-input v-model="form.git.username"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="git.password">
            <el-input v-model="form.git.password"></el-input>
          </el-form-item>
        </template>
      </el-card>

      <!-- ssh -->
      <el-card>
        <el-form-item label="Username" prop="ssh.username">
          <el-input v-model="form.ssh.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="ssh.password">
          <el-input v-model="form.ssh.password"></el-input>
        </el-form-item>
        <el-form-item label="Port" prop="ssh.port">
          <el-input-number v-model="form.ssh.port" :min=0 :max="65535"></el-input-number>
        </el-form-item>
        <el-form-item label="Authorized_keys Path" prop="ssh.authorized_keys_path">
          <el-input v-model="form.ssh.authorized_keys_path"></el-input>
        </el-form-item>
        <el-form-item label="Privatekey Path" prop="ssh.privatekey_path">
          <el-input v-model="form.ssh.privatekey_path"></el-input>
        </el-form-item>
        <el-form-item label="Publickey Path" prop="ssh.publickey_path">
          <el-input v-model="form.ssh.publickey_path"></el-input>
        </el-form-item>
        <el-form-item label="Knownhosts Path" prop="ssh.knownhosts_path">
          <el-input v-model="form.ssh.knownhosts_path"></el-input>
        </el-form-item>
        <el-form-item label="StrictHostKeyChecking" prop="ssh.stricthostkeychecking">
          <el-checkbox v-model="form.ssh.stricthostkeychecking"></el-checkbox>
        </el-form-item>
      </el-card>

      <!-- ansible -->
      <el-card>
        <el-form-item label="Hosts">
          <el-button type="primary" @click="addHost" size="mini">+</el-button>
        </el-form-item>
        <el-row :gutter="20" v-for="(_, index) in form.ansible.hosts" :key=index>
          <el-col :span="4">
            <el-form-item>
              <el-button type="danger" size="mini" @click="removeHost(index)">-</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="Host" :prop="`ansible.hosts.${index}.value`">
              <el-input v-model="form.ansible.hosts[index].value"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Role" prop="ansible.role">
          <el-select v-model="form.ansible.role">
            <el-option v-for="item in ['go', 'java', 'nodejs']" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Sudo password" prop="ansible.become_password">
          <el-input v-model="form.ansible.become_password"></el-input>
        </el-form-item>
        <el-form-item label="Install Dir" prop="ansible.installdir">
          <el-input v-model="form.ansible.installdir"></el-input>
        </el-form-item>
      </el-card>
      <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button type="danger" @click="resetForm">重置</el-button>
          <el-button type="warning" @click="streamData = ''">清空</el-button>
      </el-form-item>
    </el-form>
    <textarea v-model="streamData"></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      streamData: '',
      eventSource: null,
      form: {
        default: {
          appdir: '~/workspace/hellogo',
          appname: ''
        },
        git: {
          enabled: false,
          repo: '',
          username: '',
          password: ''
        },
        ssh: {
          username: '',
          password: '',
          port: 22,
          authorized_keys_path: '~/.ssh/authorized_keys',
          privatekey_path: '~/.ssh/appdeployer',
          publickey_path: '~/.ssh/appdeployer.pub',
          knownhosts_path: '~/.ssh/known_hosts',
          stricthostkeychecking: false
        },
        ansible: {
          hosts: [{ value: '' }],
          role: '',
          become_password: '',
          installdir: '~/workspace'
        }
      }
    }
  },
  computed: {
    formRules() {
      return {
        default: {
          appdir: [
            { required: true, message: '请输入应用路径', trigger: 'blur' }
          ],
          appname: [
            { required: true, message: '请输入应用名称', trigger: 'blur' }
          ]
        },
        git: {
          enabled: [],
          repo: [
            { required: this.form.git.enabled, message: '请输入应用路径', trigger: 'blur' }
          ],
          username: [
            { required: this.form.git.enabled, message: '请输入应用路径', trigger: 'blur' }
          ],
          password: [
            { required: this.form.git.enabled, message: '请输入应用路径', trigger: 'blur' }
          ]
        },
        ssh: {
          username: [
            { required: true, message: '请输入ssh用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入ssh密码', trigger: 'blur' }
          ],
          port: [
            { required: true, message: '请输入ssh端口', trigger: 'blur' }
          ],
          authorized_keys_path: [
            { required: true, message: '请输入用来生成ssh服务端authorized_keys文件的路径(用来存储ssh客户端公钥)', trigger: 'blur' }
          ],
          privatekey_path: [
            { required: true, message: '请输入用来生成ssh客户端私钥文件的路径', trigger: 'blur' }
          ],
          publickey_path: [
            { required: true, message: '请输入用来生成ssh客户公钥文件的路径', trigger: 'blur' }
          ],
          knownhosts_path: [
            { required: true, message: '请输入用来生成ssh客户端knownhosts文件的路径(用来存储ssh服务端公钥)', trigger: 'blur' }
          ],
          stricthostkeychecking: []
        },
        ansible: {
          hosts: [
            {
              value: [
                { required: true, message: '请输入ansible受控机列表(多主机用逗号分隔,支持通配符)', trigger: 'blur' }
              ]
            }
          ],
          role: [
            { required: true, message: '请输入发布的应用类型', trigger: 'change' }
          ],
          become_password: [
            { required: true, message: '请输入受控机sudo密码', trigger: 'blur' }
          ],
          installdir: [
            { required: true, message: '请输入应用在受控机上的安装路径', trigger: 'blur' }
          ]
        }
      }
    }
  },
  watch: {
    'form.default.appdir': {
      handler: function(val) {
        this.form.default.appname = val.split('/').pop()
      },
      immediate: true
    }
  },
  methods: {
    submitForm() {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          try {
            const cloneForm = JSON.parse(JSON.stringify(this.form))
            this.processForm(cloneForm)
            // console.log(cloneForm)
            const { data: res } = await this.$http.post('http://localhost:8888/vm/submit', cloneForm)
            this.startStream(res.requestID)
          } catch (err) {
            this.streamData += err + '\n'
          }
        }
      })
    },
    processForm(form) {
      form.ansible.hosts = form.ansible.hosts.map(host => host.value.trim()).join(',')
    },
    resetForm() {
      this.$refs.formRef.resetFields()
    },
    startStream(requestID) {
      this.eventSource = new EventSource('http://localhost:8888/vm/deploy?requestID=' + requestID)

      this.eventSource.onmessage = (event) => {
        this.streamData += event.data + '\n'
      }
      this.eventSource.onerror = (error) => {
        console.log('EventSource failed: ', error)
        this.streamData += 'EventSource failed\n'
        if (this.eventSource) {
          this.eventSource.close()
          this.eventSource = null
        }
      }
    },
    addHost() {
      this.form.ansible.hosts.push({ value: '' })
      this.formRules.ansible.hosts.push({
        value: [
          { required: true, message: '请输入ansible受控机列表(多主机用逗号分隔,支持通配符)', trigger: 'blur' }
        ]
      })
    },
    removeHost(index) {
      if (this.form.ansible.hosts.length > 1) {
        this.form.ansible.hosts.splice(index, 1)
        this.formRules.ansible.hosts.splice(index, 1)
      }
    }
  },
  beforeDestroy() {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
  }
}
</script>
