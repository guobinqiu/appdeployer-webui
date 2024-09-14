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
          <el-tooltip effect="dark" content="是否从Git上拉取代码来进行部署" placement="top">
            <el-checkbox v-model="form.git.enabled">Git</el-checkbox>
          </el-tooltip>
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
          <el-tooltip effect="dark" content="代码编译成镜像后上传Docker" placement="top">
            <span>Docker</span>
          </el-tooltip>
        </div>
        <el-form-item>
          <el-radio-group v-model="dockerMode">
            <el-radio :label="1">Password mode</el-radio>
            <el-radio :label="2">Config file mode</el-radio>
          </el-radio-group>
        </el-form-item>
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
          <el-tooltip effect="dark" content="从Docker上拉取代码部署到Kubernetes集群" placement="top">
            <span>Kube</span>
          </el-tooltip>
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
            <el-tooltip effect="dark" content="设置入口域名,每个应用对应一个入口域名" placement="top">
              <span>Ingress</span>
            </el-tooltip>
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
            <el-tooltip effect="dark" content="设置服务端口" placement="top">
              <span>Service</span>
            </el-tooltip>
          </div>
          <el-form-item label="port" prop="kube.service.port">
            <el-input-number v-model="form.kube.service.port" :min="0" :max="65535"></el-input-number>
          </el-form-item>
        </el-card>

        <!-- Deployment Settings -->
        <el-card>
          <div slot="header">
            <el-tooltip effect="dark" content="管理一组Pod" placement="top">
              <span>Deployment</span>
            </el-tooltip>
          </div>
          <el-form-item label="replicas" prop="kube.deployment.replicas">
            <el-input-number v-model="form.kube.deployment.replicas" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="port" prop="kube.deployment.port">
            <el-input-number v-model="form.kube.deployment.port" :min="0" :max="65535"></el-input-number>
          </el-form-item>

          <!-- Rolling Update Settings -->
          <el-card>
            <div slot="header">
              <el-tooltip effect="dark" content="设置Pod更新策略保证服务不中断" placement="top">
                <span>Rolling Update</span>
              </el-tooltip>
            </div>
            <el-form-item label="maxsurge" prop="kube.deployment.rollingupdate.maxsurge">
              <el-input v-model="form.kube.deployment.rollingupdate.maxsurge"></el-input>
            </el-form-item>
            <el-form-item label="maxunavailable" prop="kube.deployment.rollingupdate.maxunavailable">
              <el-input v-model="form.kube.deployment.rollingupdate.maxunavailable"></el-input>
            </el-form-item>
          </el-card>

          <!-- Quota Settings -->
          <el-card>
            <div slot="header">
              <el-tooltip effect="dark" content="控制容器的cpu和内存占用" placement="top">
                <span>Quota</span>
              </el-tooltip>
            </div>
            <el-form-item label="cpulimit" prop="kube.deployment.quota.cpulimit">
              <el-input-number v-model="form.kube.deployment.quota.cpulimit" :min="0"></el-input-number>
              <span style="margin-left: 15px">(m) = {{ form.kube.deployment.quota.cpulimit ? form.kube.deployment.quota.cpulimit /  1000 : 0 }} cpu cores</span>
            </el-form-item>
            <el-form-item label="memlimit" prop="kube.deployment.quota.memlimit.value">
              <el-input-number v-model="form.kube.deployment.quota.memlimit.value" :min="0"></el-input-number>
              <el-select v-model="form.kube.deployment.quota.memlimit.unit" style="margin-left: 15px; width: 70px;">
                <el-option v-for="item in ['Ki', 'Mi', 'Gi']" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="cpurequest" prop="kube.deployment.quota.cpurequest">
              <el-input-number v-model="form.kube.deployment.quota.cpurequest" :min="0"></el-input-number>
              <span style="margin-left: 15px">(m) = {{ form.kube.deployment.quota.cpurequest ? form.kube.deployment.quota.cpurequest /  1000 : 0 }} cpu cores</span>
            </el-form-item>
            <el-form-item label="memrequest" prop="kube.deployment.quota.memrequest.value">
              <el-input-number v-model="form.kube.deployment.quota.memrequest.value" :min="0"></el-input-number>
              <el-select v-model="form.kube.deployment.quota.memrequest.unit" style="margin-left: 15px; width: 70px;">
                <el-option v-for="item in ['Ki', 'Mi', 'Gi']" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-card>

          <!-- Livenessprobe Settings -->
          <el-card>
            <div slot="header">
              <el-tooltip effect="dark" content="是否监测Pod内容器的健康状况" placement="top">
                <el-checkbox v-model="form.kube.deployment.livenessprobe.enabled">Liveness Probe</el-checkbox>
              </el-tooltip>
            </div>
            <template v-if="form.kube.deployment.livenessprobe.enabled">
              <el-form-item label="type" prop="kube.deployment.livenessprobe.type">
                <el-select v-model="form.kube.deployment.livenessprobe.type">
                  <el-option v-for="item in ['httpGet', 'exec', 'tcpSocket']" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <template v-if="form.kube.deployment.livenessprobe.type === 'httpGet'">
                <el-form-item label="path" prop="kube.deployment.livenessprobe.path">
                  <el-input v-model="form.kube.deployment.livenessprobe.path"></el-input>
                </el-form-item>
                <el-form-item label="scheme" prop="kube.deployment.livenessprobe.scheme">
                  <el-select v-model="form.kube.deployment.livenessprobe.scheme">
                  <el-option v-for="item in ['http', 'https']" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                </el-form-item>
                </template>
              <template v-if="form.kube.deployment.livenessprobe.type === 'exec'">
                <el-form-item label="command" prop="kube.deployment.livenessprobe.command">
                  <el-input v-model="form.kube.deployment.livenessprobe.command"></el-input>
                </el-form-item>
              </template>
              <el-form-item label="initialdelayseconds" prop="kube.deployment.livenessprobe.initialdelayseconds">
                <el-input-number v-model="form.kube.deployment.livenessprobe.initialdelayseconds" :min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="timeoutseconds" prop="kube.deployment.livenessprobe.timeoutseconds">
                <el-input-number v-model="form.kube.deployment.livenessprobe.timeoutseconds" :min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="periodseconds" prop="kube.deployment.livenessprobe.periodseconds">
                <el-input-number v-model="form.kube.deployment.livenessprobe.periodseconds" :min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="successthreshold" prop="kube.deployment.livenessprobe.successthreshold">
                <el-input-number v-model="form.kube.deployment.livenessprobe.successthreshold" :min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="failurethreshold" prop="kube.deployment.livenessprobe.failurethreshold">
                <el-input-number v-model="form.kube.deployment.livenessprobe.failurethreshold" :min="0"></el-input-number>
              </el-form-item>
            </template>
          </el-card>

          <!-- Readinessprobe Settings -->
          <el-card>
            <div slot="header">
              <el-tooltip effect="dark" content="是否监测容器内应用的健康状况" placement="top">
                <el-checkbox v-model="form.kube.deployment.readinessprobe.enabled">Readiness Probe</el-checkbox>
              </el-tooltip>
            </div>
            <template v-if="form.kube.deployment.readinessprobe.enabled">
              <el-form-item label="type" prop="kube.deployment.readinessprobe.type">
                <el-select v-model="form.kube.deployment.readinessprobe.type">
                  <el-option v-for="item in ['httpGet', 'exec', 'tcpSocket']" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <template v-if="form.kube.deployment.readinessprobe.type === 'httpGet'">
                <el-form-item label="path" prop="kube.deployment.readinessprobe.path">
                  <el-input v-model="form.kube.deployment.readinessprobe.path"></el-input>
                </el-form-item>
                <el-form-item label="scheme" prop="kube.deployment.readinessprobe.scheme">
                  <el-select v-model="form.kube.deployment.readinessprobe.scheme">
                  <el-option v-for="item in ['http', 'https']" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                </el-form-item>
                </template>
              <template v-if="form.kube.deployment.readinessprobe.type === 'exec'">
                <el-form-item label="command" prop="kube.deployment.readinessprobe.command">
                  <el-input v-model="form.kube.deployment.readinessprobe.command"></el-input>
                </el-form-item>
              </template>
              <el-form-item label="initialdelayseconds" prop="kube.deployment.readinessprobe.initialdelayseconds">
                <el-input-number v-model="form.kube.deployment.readinessprobe.initialdelayseconds" :min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="timeoutseconds" prop="kube.deployment.readinessprobe.timeoutseconds">
                <el-input-number v-model="form.kube.deployment.readinessprobe.timeoutseconds" :min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="periodseconds" prop="kube.deployment.readinessprobe.periodseconds">
                <el-input-number v-model="form.kube.deployment.readinessprobe.periodseconds" :min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="successthreshold" prop="kube.deployment.readinessprobe.successthreshold">
                <el-input-number v-model="form.kube.deployment.readinessprobe.successthreshold" :min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="failurethreshold" prop="kube.deployment.readinessprobe.failurethreshold">
                <el-input-number v-model="form.kube.deployment.readinessprobe.failurethreshold" :min="0"></el-input-number>
              </el-form-item>
            </template>
          </el-card>

          <!-- Volumemount Settings -->
          <el-card>
            <div slot="header">
              <el-tooltip effect="dark" content="是否挂载一个持久化卷到容器上(如你的应用依赖于sqlite)" placement="top">
                <el-checkbox v-model="form.kube.deployment.volumemount.enabled">Volume Mount</el-checkbox>
              </el-tooltip>
            </div>
            <template v-if="form.kube.deployment.volumemount.enabled">
              <el-form-item label="mountpath" prop="kube.deployment.volumemount.mountpath">
                <el-input v-model="form.kube.deployment.volumemount.mountpath"></el-input>
              </el-form-item>

              <!-- PVC Settings -->
              <el-form-item label="accessmode">
                <el-select v-model="form.kube.deployment.pvc.accessmode" prop="kube.deployment.pvc.accessmode">
                  <el-option v-for="item in ['ReadWriteOnce', 'ReadOnlyMany', 'ReadWriteMany']" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="storageclassname" prop="kube.deployment.pvc.storageclassname">
                <el-input v-model="form.kube.deployment.pvc.storageclassname"></el-input>
              </el-form-item>
              <el-form-item label="storagesize" prop="kube.deployment.pvc.storagesize.value">
                <el-input-number v-model="form.kube.deployment.pvc.storagesize.value" :min="0"></el-input-number>
                <el-select v-model="form.kube.deployment.pvc.storagesize.unit" style="margin-left: 15px; width: 70px;">
                  <el-option v-for="item in ['Ki', 'Mi', 'Gi']" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-card>

          <!-- envs -->
          <el-card>
            <div slot="header">
              <el-tooltip effect="dark" content="设置容器的环境变量" placement="top">
                <span>Envs</span>
              </el-tooltip>
            </div>
            <el-form-item>
              <el-button type="primary" @click="addEnv" size="mini">+</el-button>
            </el-form-item>
            <el-row :gutter="20" v-for="(_, index) in form.kube.deployment.envs" :key = index>
              <el-col :span="4">
                <el-form-item>
                  <el-button type="danger" size="mini" @click="removeEnv(index)">-</el-button>
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
        </el-card>

        <!-- HPA Settings -->
        <el-card>
          <div slot="header">
            <el-tooltip effect="dark" content="配置Pod的水平扩缩容" placement="top">
              <el-checkbox v-model="form.kube.hpa.enabled">HPA</el-checkbox>
            </el-tooltip>
          </div>
          <template v-if="form.kube.hpa.enabled">
            <el-form-item label="minreplicas" prop="kube.hpa.minreplicas">
              <el-input-number v-model="form.kube.hpa.minreplicas" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="maxreplicas" prop="kube.hpa.maxreplicas">
              <el-input-number v-model="form.kube.hpa.maxreplicas" :min="form.kube.hpa.minreplicas"></el-input-number>
            </el-form-item>
            <el-form-item label="cpurate" prop="kube.hpa.cpurate">
              <el-input-number v-model="form.kube.hpa.cpurate" :min="0"></el-input-number>
            </el-form-item>
          </template>
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
            quota: {
              cpulimit: 1000,
              cpurequest: 500,
              memlimit: {
                value: 512,
                unit: 'Mi'
              },
              memrequest: {
                value: 256,
                unit: 'Mi'
              }
            },
            livenessprobe: {
              enabled: false,
              type: 'httpGet',
              path: '/',
              scheme: 'http',
              command: '',
              initialdelayseconds: 0,
              timeoutseconds: 1,
              periodseconds: 10,
              successthreshold: 1,
              failurethreshold: 3
            },
            readinessprobe: {
              enabled: false,
              type: 'httpGet',
              path: '/',
              scheme: 'http',
              command: '',
              initialdelayseconds: 0,
              timeoutseconds: 1,
              periodseconds: 10,
              successthreshold: 1,
              failurethreshold: 3
            },
            volumemount: {
              enabled: false,
              mountpath: '/app/data'
            },
            pvc: {
              accessmode: 'ReadWriteOnce',
              storageclassname: 'openebs-hostpath',
              storagesize: {
                value: 1,
                unit: 'G'
              }
            },
            envs: []
          },
          hpa: {
            enabled: false,
            minreplicas: 1,
            maxreplicas: 10,
            cpurate: 50
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
              { required: true, message: '请输入pod副本数', trigger: 'blur' }
            ],
            port: [
              { required: true, message: '请输入pod端口号', trigger: 'blur' }
            ],
            rollingupdate: {
              maxsurge: [
                { required: true, message: '请输入maxsurge的pod个数或百分比', trigger: 'blur' },
                { validator: this.checkMaxSurge, trigger: 'blur' }
              ],
              maxunavailable: [
                { required: true, message: '请输入maxunavailable的pod个数或百分比', trigger: 'blur' },
                { validator: this.checkMaxUnavailable, trigger: 'blur' }
              ]
            },
            quota: {
              cpulimit: [
                { required: true, message: '请输入pod的cpu上限', trigger: 'blur' }
              ],
              memlimit: {
                value: [
                  { required: true, message: '请输入pod的内存上限', trigger: 'blur' }
                ],
                unit: []
              },
              cpurequest: [
                { required: true, message: '请输入pod的cpu下限', trigger: 'blur' }
              ],
              memrequest: {
                value: [
                  { required: true, message: '请输入pod的内存下限', trigger: 'blur' }
                ],
                unit: []
              }
            },
            livenessprobe: {
              enabled: [],
              type: [],
              scheme: [],
              path: [
                { required: this.form.kube.deployment.livenessprobe.type === 'httpGet', message: '请输入健康检查路径', trigger: 'blur' }
              ],
              command: [
                { required: this.form.kube.deployment.livenessprobe.type === 'exec', message: '请输入健康检查命令', trigger: 'blur' }
              ],
              initialdelayseconds: [],
              timeoutseconds: [],
              periodseconds: [],
              successthreshold: [],
              failurethreshold: []
            },
            readinessprobe: {
              enable: [],
              type: [],
              scheme: [],
              path: [
                { required: this.form.kube.deployment.readinessprobe.type === 'httpGet', message: '请输入健康检查路径', trigger: 'blur' }
              ],
              command: [
                { required: this.form.kube.deployment.readinessprobe.type === 'exec', message: '请输入健康检查命令', trigger: 'blur' }
              ],
              initialdelayseconds: [],
              timeoutseconds: [],
              periodseconds: [],
              successthreshold: [],
              failurethreshold: []
            },
            volumemount: {
              enabled: [],
              mountpath: [
                { required: true, message: '请输入挂载路径', trigger: 'blur' }
              ]
            },
            pvc: {
              accessmode: [],
              storageclassname: [
                { required: true, message: '请输入三方存储类的名称', trigger: 'blur' }
              ],
              storagesize: {
                value: [
                  { required: true, message: '请输入pod的内存上限', trigger: 'blur' }
                ],
                unit: []
              }
            },
            envs: [] // 动态插入规则
          },
          hpa: {
            enabled: [],
            minreplicas: [
              { required: true, message: '请输入最少pod总数', trigger: 'blur' }
            ],
            maxreplicas: [
              { required: true, message: '请输入最大pod总数', trigger: 'blur' }
            ],
            cpurate: [
              { required: true, message: '请输入目标CPU使用率', trigger: 'blur' }
            ]
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
          const cloneForm = JSON.parse(JSON.stringify(this.form))
          this.processForm(cloneForm)
          console.log('提交成功', cloneForm)
        } else {
          console.log('表单验证失败')
        }
      })
    },
    processForm(form) {
      form.kube.deployment.envs.forEach((env, index) => {
        form.kube.deployment.envs[index] = env.key.trim() + '=' + env.value.trim()
      })
      form.kube.deployment.quota.cpulimit = form.kube.deployment.quota.cpulimit + 'm'
      form.kube.deployment.quota.cpurequest = form.kube.deployment.quota.cpurequest + 'm'
      form.kube.deployment.quota.memlimit = form.kube.deployment.quota.memlimit.value + form.kube.deployment.quota.memlimit.unit
      form.kube.deployment.quota.memrequest = form.kube.deployment.quota.memrequest.value + form.kube.deployment.quota.memrequest.unit
      form.kube.deployment.pvc.storagesize = form.kube.deployment.pvc.storagesize.value + form.kube.deployment.pvc.storagesize.unit
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
