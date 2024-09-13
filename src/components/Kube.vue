<template>
  <div>
    <el-form :model="form" ref="formRef" :rules="formRules" label-width="150px">
      <!-- Default Settings -->
      <el-card>
        <div slot="header">
          <span>Default</span>
        </div>
        <el-form-item label="appdir" prop="default.appdir">
          <el-input v-model="form.default.appdir"></el-input>
        </el-form-item>
        <el-form-item label="appname" prop="default.appname">
          <el-input v-model="form.default.appname"></el-input>
        </el-form-item>
      </el-card>

      <!-- Git Settings -->
      <el-card>
        <div slot="header">
          <el-checkbox v-model="form.git.enabled"></el-checkbox><span style="margin-left: 10px;">Git</span>
        </div>
        <template v-if="form.git.enabled">
          <el-form-item label="repo" prop="git.repo">
            <el-input v-model="form.git.repo"></el-input>
          </el-form-item>
          <el-form-item label="username" prop="git.username">
            <el-input v-model="form.git.username"></el-input>
          </el-form-item>
          <el-form-item label="password" prop="git.password">
            <el-input v-model="form.git.password"></el-input>
          </el-form-item>
        </template>
      </el-card>

      <!-- Docker Settings -->
      <el-card>
        <div slot="header">
          <span>Docker</span>
          <div style="margin-top: 10px">
            <el-radio-group v-model="dockerMode">
              <el-radio :label="1">Password mode</el-radio>
              <el-radio :label="2">Config file mode</el-radio>
            </el-radio-group>
          </div>
        </div>
        <template v-if="dockerMode === 1">
          <el-form-item label="dockerconfig" prop="docker.dockerconfig">
            <el-input v-model="form.docker.dockerconfig"></el-input>
          </el-form-item>
          <el-form-item label="dockerfile" prop="docker.dockerfile">
            <el-input v-model="form.docker.dockerfile"></el-input>
          </el-form-item>
          <el-form-item label="repository" prop="docker.repository">
            <el-input v-model="form.docker.repository"></el-input>
          </el-form-item>
          <el-form-item label="tag" prop="docker.tag">
            <el-input v-model="form.docker.tag"></el-input>
          </el-form-item>
        </template>
        <template v-else-if="dockerMode === 2">
          <el-form-item label="registry" prop="docker.registry">
            <el-input v-model="form.docker.registry"></el-input>
          </el-form-item>
          <el-form-item label="username" prop="docker.username">
            <el-input v-model="form.docker.username"></el-input>
          </el-form-item>
          <el-form-item label="password" prop="docker.password">
            <el-input v-model="form.docker.password"></el-input>
          </el-form-item>
          <el-form-item label="dockerfile" prop="docker.dockerfile">
            <el-input v-model="form.docker.dockerfile"></el-input>
          </el-form-item>
          <el-form-item label="repository" prop="docker.repository">
            <el-input v-model="form.docker.repository"></el-input>
          </el-form-item>
          <el-form-item label="tag" prop="docker.tag">
            <el-input v-model="form.docker.tag"></el-input>
          </el-form-item>
        </template>
      </el-card>

      <!-- Kube Settings -->
      <el-card>
        <div slot="header">
          <span>Kube</span>
        </div>
        <el-form-item label="kubeconfig" prop="kube.kubeconfig">
          <el-input v-model="form.kube.kubeconfig"></el-input>
        </el-form-item>
        <el-form-item label="namespace" prop="kube.namespace">
          <el-input v-model="form.kube.namespace"></el-input>
        </el-form-item>

        <!-- Ingress Settings -->
        <el-card>
          <div slot="header">
            <span>Ingress</span>
          </div>
          <el-form-item label="host" prop="kube.ingress.host">
            <el-input v-model="form.kube.ingress.host"></el-input>
          </el-form-item>
          <el-form-item label="tls" prop="kube.ingress.tls">
            <el-checkbox v-model="form.kube.ingress.tls"></el-checkbox>
          </el-form-item>
          <template v-if="form.kube.ingress.tls">
            <el-form-item label="selfsigned" prop="kube.ingress.selfsigned">
              <el-checkbox v-model="form.kube.ingress.selfsigned"></el-checkbox>
            </el-form-item>
            <template v-if="form.kube.ingress.selfsigned">
              <el-form-item label="selfsignedyears" prop="kube.ingress.selfsignedyears">
                <el-input-number v-model="form.kube.ingress.selfsignedyears" :min="1" :max="10"></el-input-number>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item label="keypath" prop="kube.ingress.keypath">
                <el-input v-model="form.kube.ingress.keypath"></el-input>
              </el-form-item>
              <el-form-item label="crtpath" prop="kube.ingress.crtpath">
                <el-input v-model="form.kube.ingress.crtpath"></el-input>
              </el-form-item>
            </template>
          </template>
        </el-card>

        <!-- Service Settings -->
        <el-card>
          <div slot="header">
            <span>Service</span>
          </div>
          <el-form-item label="port" prop="kube.service.port">
            <el-input-number v-model="form.kube.service.port" :min="0" :max="65535"></el-input-number>
          </el-form-item>
        </el-card>

        <!-- Deployment Settings -->
        <el-card>
          <div slot="header">
            <span>Deployment</span>
          </div>
          <el-form-item label="replicas" prop="kube.deployment.replicas">
            <el-input-number v-model="form.kube.deployment.replicas" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="port" prop="kube.deployment.port">
            <el-input-number v-model="form.kube.deployment.port" :min="0" :max="65535"></el-input-number>
          </el-form-item>

          <!-- rollingupdate -->
          <el-card>
            <div slot="header">
              <span>Rolling Update</span>
            </div>
            <el-form-item label="maxsurge" prop="kube.deployment.rollingupdate.maxsurge">
              <el-input v-model="form.kube.deployment.rollingupdate.maxsurge"></el-input>
            </el-form-item>
            <el-form-item label="maxunavailable" prop="kube.deployment.rollingupdate.maxunavailable">
              <el-input v-model="form.kube.deployment.rollingupdate.maxunavailable"></el-input>
            </el-form-item>
          </el-card>
          ...

          <!-- envs -->
          <el-card>
            <div slot="header">
              <span>Envs</span>
            </div>
            <el-form-item>
              <el-button type="primary" @click="addEnv">增加</el-button>
            </el-form-item>
            <el-row :gutter="20" v-for="(_, index) in form.kube.deployment.envs" :key = index>
              <el-col :span="4">
                <el-form-item label="">
                  <el-button type="danger" icon="el-icon-delete" circle @click="removeEnv(index)"></el-button>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="key" :prop="`kube.deployment.envs.${index}.key`">
                  <el-input v-model="form.kube.deployment.envs[index].key"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="value" :prop="`kube.deployment.envs.${index}.value`">
                  <el-input v-model="form.kube.deployment.envs[index].value"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          ...
        </el-card>
      </el-card>

      <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button type="danger" @click="resetForm">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // [kube]
      // ; deployment.rollingupdate.maxsurge=1
      // ; deployment.rollingUpdate.maxunavailable=0

      // ; deployment.quota.cpulimit=1000m
      // ; deployment.quota.memlimit=512Mi
      // ; deployment.quota.cpurequst=500m
      // ; deployment.quota.memrequest=256Mi

      // ; deployment.livenessprobe.enabled=false
      // ; deployment.livenessprobe.type=httpget
      // ; deployment.livenessprobe.path=/
      // ; deployment.livenessprobe.scheme=http
      // ; deployment.livenessprobe.command=
      // ; deployment.livenessprobe.initialdelayseconds=0
      // ; deployment.livenessprobe.timeoutseconds=1
      // ; deployment.livenessprobe.periodseconds=10
      // ; deployment.livenessprobe.successthreshold=1
      // ; deployment.livenessprobe.failurethreshold=3

      // ; deployment.readinessprobe.enabled=false
      // ; deployment.readinessprobe.type=httpget
      // ; deployment.readinessprobe.path=/
      // ; deployment.readinessprobe.scheme=http
      // ; deployment.readinessprobe.command=
      // ; deployment.readinessprobe.initialdelayseconds=0
      // ; deployment.readinessprobe.timeoutseconds=1
      // ; deployment.readinessprobe.periodseconds=10
      // ; deployment.readinessprobe.successthreshold=1
      // ; deployment.readinessprobe.failurethreshold=3

      // ; deployment.volumemount.enabled=false
      // ; deployment.volumemount.mountpath=/app/data

      // ; hpa.enabled=false
      // ; hpa.minreplicas=1
      // ; hpa.maxreplicas=10
      // ; hpa.cpurate=50

      // ; pvc.accessmode=readwriteonce
      // ; pvc.storageclassname=openebs-hostpath
      // ; pvc.storagesize=1G
      dockerMode: 1,
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
        docker: {
          dockerconfig: '~/.docker/config.json',
          registry: 'https://index.docker.io/v1/',
          username: 'qiuguobin',
          password: '111111111',
          dockerfile: './Dockerfile',
          repository: '',
          tag: 'latest'
        },
        kube: {
          kubeconfig: '~/.kube/config',
          namespace: '',
          ingress: {
            host: '',
            tls: false,
            selfsigned: false,
            selfsignedyears: 1,
            crtpath: '',
            keypath: ''
          },
          service: {
            port: 8000
          },
          deployment: {
            replicas: 1,
            port: 8000,
            rollingupdate: {
              maxsurge: '1',
              maxunavailable: '0'
            },
            envs: []
          }
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
        docker: {
          dockerconfig: [
            { required: this.dockerMode === 1, message: '请输入docker配置文件路径', trigger: 'blur' }
          ],
          registry: [
            { required: this.dockerMode === 2, message: '请输入docker仓库地址', trigger: 'blur' }
          ],
          username: [
            { required: this.dockerMode === 2, message: '请输入docker用户名', trigger: 'blur' }
          ],
          password: [
            { required: this.dockerMode === 2, message: '请输入docker密码', trigger: 'blur' }
          ],
          dockerfile: [
            { required: true, message: '请输入dockerfile路径', trigger: 'blur' }
          ],
          repository: [
            { required: true, message: '请输入docker镜像仓库地址', trigger: 'blur' }
          ]
        },
        kube: {
          kubeconfig: [
            { required: true, message: '请输入kubeconfig文件路径', trigger: 'blur' }
          ],
          namespace: [
            { required: true, message: '请输入namespace', trigger: 'blur' }
          ],
          ingress: {
            host: [
              { required: true, message: '请输入域名', trigger: 'blur' }
            ],
            crtpath: [
              { required: true, message: '请输入.crt结尾的证书文件路径', trigger: 'blur' }
            ],
            keypath: [
              { required: true, message: '请输入.key结尾的证书文件路径', trigger: 'blur' }
            ]
          },
          service: {
            port: [
              { required: true, message: '请输入service端口号', trigger: 'blur' }
            ]
          },
          deployment: {
            replicas: [
              { required: true, message: '请输入副本数', trigger: 'blur' }
            ],
            port: [
              { required: true, message: '请输入container端口号', trigger: 'blur' }
            ],
            rollingupdate: {
              maxsurge: [
                { required: true, message: '请输入maxsurge的个数或百分比', trigger: 'blur' },
                { validator: this.checkMaxSurge, trigger: 'blur' }
              ],
              maxunavailable: [
                { required: true, message: '请输入maxunavailable的个数或百分比', trigger: 'blur' },
                { validator: this.checkMaxUnavailable, trigger: 'blur' }
              ]
            },
            envs: []
          }
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
    },
    'form.default.appname': {
      handler: function(val) {
        if (this.form.docker.registry === 'https://index.docker.io/v1/') {
          this.form.docker.repository = this.form.docker.username + '/' + val
        }
        this.form.kube.namespace = val
        this.form.kube.ingress.host = val + '.com'
      },
      immediate: true
    },
    'form.docker.username': {
      handler: function(val) {
        if (this.form.docker.registry === 'https://index.docker.io/v1/') {
          this.form.docker.repository = val + '/' + this.form.default.appname
        }
      },
      immediate: true
    }
  },
  methods: {
    addEnv() {
      this.form.kube.deployment.envs.push({ key: '', value: '' })
      this.formRules.kube.deployment.envs.push(
        {
          key: [
            { required: true, message: '请输入Key值', trigger: 'blur' }
          ],
          value: [
            { required: true, message: '请输入Value值', trigger: 'blur' }
          ]
        }
      )
    },
    removeEnv(index) {
      this.form.kube.deployment.envs.splice(index, 1)
      this.formRules.kube.deployment.envs.splice(index, 1)
    },
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          console.log('提交成功', this.form)
          this.form.kube.deployment.envs.forEach((env, index) => {
            this.form.kube.deployment.envs[index] = env.key.trim() + '=' + env.value.trim()
          })
        } else {
          console.log('表单验证失败')
        }
      })
    },
    resetForm() {
      this.$refs.formRef.resetFields()
    },
    checkMaxSurge(rule, value, cb) {
      const strValue = String(value)
      if (strValue.endsWith('%')) {
        value = strValue.slice(0, -1)
      }
      const numValue = Number(value)
      if (isNaN(numValue) || numValue < 1) {
        return cb(new Error('请输入合法的maxsurge值'))
      }
      cb()
    },
    checkMaxUnavailable(rule, value, cb) {
      const strValue = String(value)
      if (strValue.endsWith('%')) {
        value = strValue.slice(0, -1)
      }
      const numValue = Number(value)
      if (isNaN(numValue) || numValue < 0 || numValue >= this.form.kube.deployment.replicas) {
        return cb(new Error('请输入合法的maxunavailable值'))
      }
      cb()
    }
  }
}
</script>
