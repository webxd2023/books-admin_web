<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 用户列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container"  >
      <div class="handle-box">
        <el-input v-model="query.id" placeholder="用户ID" clearable class="handle-input mr10"></el-input>
        <el-input v-model="query.user_name" placeholder="用户姓名" clearable class="handle-input mr10"></el-input>
        <el-input v-model="query.user_phone" placeholder="手机号" clearable class="handle-input mr10"></el-input>
        <el-select v-model="query.status" placeholder="性别" clearable class="handle-select mr10">
          <el-option key="男" label="男" value="男"></el-option>
          <el-option key="女" label="女" value="女"></el-option>
        </el-select>
        <el-select v-model="query.status" placeholder="用户状态" clearable class="handle-select mr10">
          <el-option key="正常" label="正常" value="正常"></el-option>
          <el-option key="注销" label="注销" value="注销"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="batch_deleteon">批量删除</el-button>
      </div>

      <el-table
          :data="tableData"
          row-key="id"
          v-loading="loadingswith"
          element-loading-text="拼命加载中..."
          element-loading-background="rgba(250,250,250,0.97)"
          border class="table"
          height="570"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="SelectionChange"
      >
<!--        :selectable="msg"-->
        <el-table-column type="selection"  width="55" :reserve-selection="true"></el-table-column>
        <el-table-column prop="id"   label="用户ID"></el-table-column>
        <el-table-column label="用户头像" align="center">
          <template #default="scope">
            <el-image class="table-td-thumb" style="height: 80px; width: 80px" :src="scope.row.avatar" :preview-src-list="[scope.row.avatar] "></el-image>
          </template>
        </el-table-column>
        <el-table-column label="用户姓名">
          <template #default="scope">{{ scope.row.user_name }}</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.sex===0" type="danger" effect="dark">女</el-tag>
            <el-tag v-else-if="scope.row.sex===1"  effect="dark">男</el-tag>
            <el-tag v-else-if="scope.row.sex===2" type="warning" effect="dark">保密</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="user_phone" label="手机号"></el-table-column>
        <el-table-column prop="user_address" label="用户地址"></el-table-column>

        <el-table-column label="用户状态" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.status===1" type="success" effect="dark">正常</el-tag>
            <el-tag v-else-if="scope.row.status===2" type="warning" effect="dark">注销</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="register_date" label="注册时间"></el-table-column>
        <el-table-column prop="expiration_date" label="到期时间"></el-table-column>


        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑 </el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="delete_books(scope.$index, scope.row)">删除</el-button>
            <el-button type="text" icon="el-icon-document-checked" v-if="scope.row.borrowing_status===1" class="blue" @click="delcom(scope.$index, scope.row)">借阅</el-button>
            <el-button type="text" icon="el-icon-document-checked" v-if="scope.row.borrowing_status===2" class="red" @click="delcom(scope.$index, scope.row)">归还</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, sizes, pager, next,jumper"
                       :current-page="query.page+1"
                       :page-size="query.rows"

                       :total="pageTotal"
                       :page-sizes="[5, 10, 20, 50, 100]"
                       @current-change="handlePageChange"
                       @size-change="handleSizeChange"></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="35%">
      <el-form label-width="70px">
        <el-form-item label="用户ID" width="50%">
          <el-input v-model="form.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="form.user_name"></el-input>
        </el-form-item>
        <el-form-item label="用户头像">
          <el-upload
              :action="SERVER_HOST+'/fileInfo'"
              list-type="picture-card"
              :on-success="handleAvatarSuccess"
              :file-list="fileList"
              :on-change="editstart"
              :on-remove="handleRemove">

            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="状态" class="handle-select mr10">
            <el-option key="sex" label="男" value="男"></el-option>
            <el-option key="女" label="女" value="女"></el-option>
            <el-option key="保密" label="保密" value="保密"></el-option>
          </el-select>
          <el-tag v-if="form.sex==='男'" effect="dark">男</el-tag>
          <el-tag v-else-if="form.sex==='女'" type="danger" effect="dark">女</el-tag>
          <el-tag v-else-if="form.sex==='保密'" type="warning" effect="dark">保密</el-tag>
        </el-form-item>
        <el-form-item label="用户手机">
          <el-input v-model="form.user_phone"></el-input>
        </el-form-item>
        <el-form-item label="用户地址">
          <el-input v-model="form.user_address"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="form.status" placeholder="状态" class="handle-select mr10">
            <el-option key="status" label="正常" value="正常"></el-option>
            <el-option key="status" label="注销" value="注销"></el-option>
          </el-select>
          <el-tag v-if="form.status==='正常'" type="success" effect="dark">正常</el-tag>
          <el-tag v-else-if="form.status==='注销'" type="danger" effect="dark">注销</el-tag>
        </el-form-item>

      </el-form>
      <template #footer >
                <span class="dialog-footer" >
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">保存</el-button>
                </span>
      </template>
    </el-dialog>

    <!-- 添加弹出框 -->
    <el-dialog title="添加" v-model="addVisible" width="35%">
      <el-form label-width="70px">
        <el-form-item label="用户姓名">
          <el-input v-model="addForm.user_name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="addForm.sex" placeholder="状态" class="handle-select mr10">
            <el-option key="sex" label="男" value="男"></el-option>
            <el-option key="女" label="女" value="女"></el-option>
            <el-option key="保密" label="保密" value="保密"></el-option>
          </el-select>
          <el-tag v-if="addForm.sex==='男'" effect="dark">男</el-tag>
          <el-tag v-else-if="addForm.sex==='女'" type="danger" effect="dark">女</el-tag>
          <el-tag v-else-if="addForm.sex==='保密'" type="warning" effect="dark">保密</el-tag>
        </el-form-item>
        <el-form-item label="用户头像">
          <el-upload
              :action="SERVER_HOST+'/fileInfo'"
              list-type="picture-card"

              :on-success="handleAvatarSuccess"
              :on-change="editstart">

            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="用户手机">
          <el-input v-model="addForm.user_phone"></el-input>
        </el-form-item>

        <el-form-item label="用户住址">
          <el-input v-model="addForm.user_address"></el-input>
        </el-form-item>

      </el-form>
      <template #footer >
                <span class="dialog-footer" >
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addBooks">添加</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox ,ElLoading  } from "element-plus";
import {
  delete_books_info,
  add_user_info,
  get_user_info,
  edit_user_info, delete_user_info
} from "../api/index";
import {useRouter} from "vue-router";
import { SERVER_HOST } from "../config";
import {DefaultProps as multipleTableRef} from "element-plus/packages/cascader-panel/src/config";

export default {
  name: "userTable",
  setup() {
    const router = useRouter();
    const query = reactive({
      page: 0,
      rows: 5,
      id:'',
      user_name:'',
      user_phone:'',
      status:''
    });
    const tableData = ref([]);
    const pageTotal = ref(0);
    const loadingswith=ref(true)
    // 获取表格数据
    const getData = () => {
      var startTime= new Date().getTime();
      loadingswith.value=true;
      if (query.status==="正常"){
        query.status=1
      }else if(query.status==="注销"){
        query.status=2
      }
      get_user_info(query).then((res) => {
            var code = res.code;
            if (code===200){
              tableData.value = res.data;
              pageTotal.value = res.datazise || 0;
              var endTime= new Date().getTime();
              ElMessage.success('请求耗时'+(endTime-startTime)+"ms");
              loadingswith.value=false;
              if (query.status===1){
                query.status="正常"
              }else if(query.status===2){
                query.status="注销"
              }
            }else if(code===401){
              ElMessageBox.alert("未授权或登录过期，请重新登录", "提示", {
                confirmButtonText: "确定",
                callback: action => {
                  router.push('/login')
                }
              });
            }

          }

      );

    };
    getData()
    // 查询操作
    const handleSearch = () => {
      query.pageIndex = 1;
      getData();
    };
    // 分页导航
    const handlePageChange = (val) => {
      query.page = val-1;
      getData();
    };

    // 每页显示条数
    const handleSizeChange = (val) => {
      query.rows = val;
      getData();

    };

    // 批量删除操作
    const batch_deleteon = (index,row) => {
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      }).then(() => {
        delete_user_info(delete_info).then((res) => {
          var code = res.code;
          var msg = res.msg;
          if (code===200){
            ElMessage.success(""+msg);
          }else if(code===401){
            ElMessageBox.alert("未授权或登录过期，请重新登录", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                router.push('/login')
              }
            });
            delete_info.id = []
            delete_info.id.value.clearSelection()
            console.log(delete_info.id)

          }else {
            ElMessage.error(''+msg);
          }
        });
        //停留200毫秒后刷新页面数据
        setTimeout(() => {
          getData()
        }, 200);
      }).catch(() => {
        ElMessage.warning("删除取消");
      });
    };

    // 删除操作
    const delete_books = (index,row) => {


      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      }).then(() => {
        Object.keys(form).forEach((item) => {
          form[item] = row[item];
        });
        delete_user_info(form).then((res) => {
          var code = res.code;
          var msg = res.msg;
          if (code===200){
            ElMessage.success(""+msg);
          }else if(code===401){
            ElMessageBox.alert("未授权或登录过期，请重新登录", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                router.push('/login')
              }
            });
          }else {
            ElMessage.error(''+msg);
          }
        });
        //停留200毫秒后刷新页面数据
        setTimeout(() => {
          getData()
        }, 200);
      }).catch(() => {
        ElMessage.warning("删除取消");
      });
    };


    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    const addVisible = ref(false);
    let form = reactive({
      id:[],
      user_name:"",
      sex:"",
      user_phone:"",
      avatar:"",
      user_address:"",
      status:"",
    });

    let addForm = reactive({
      user_name:"",
      user_phone:"",
      user_address:"",
      sex:"",
      avatar:"",
    });
    let idx = -1;
    let fileList= ref([]);
    let imgobj=ref({
      url:""
    })
    const handleEdit = (index, row) => {
      imgobj.url=row.avatar;
      fileList.value=[]
      fileList.value.push((imgobj))
      // fileList.push(imgobj)
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      if (form.status===1){
        form.status="正常"
      }else if (form.status===2){
        form.status="注销"
      }
      if (form.sex===0){
        form.sex="女"
      }else if (form.sex===1){
        form.sex="男"
      }else if (form.sex===2){
        form.sex="保密"
      }
      console.log(form.status)
      editVisible.value = true;
    };
    const handleAdd = () => {
      form.img=''
      form.commodity_name=''
      form.color=''
      form.sku=''
      form.status=''
      form.commodity_code=''
      form.description=''
      form.price=''
      addVisible.value = true;

      console.log(fileList)
    };
    const saveEdit = () => {
      if (form.user_name===""){
        ElMessage.warning("用户姓名不能为空！");
      }else if (form.user_phone===""){
        ElMessage.warning("用户手机号不能为空！");
      }else if (form.user_address===""){
        ElMessage.warning("用户地址不能为空！");
      }else if (form.book_image_url===""){
        ElMessage.warning("图书封面不能为空！");
      }else {
        if (form.status==="正常"){
          form.status = 1
        }else if (form.status==="注销"){
          form.status = 2
        }
        if (form.sex==="女"){
          form.sex = 0
        }else if (form.sex==="男"){
          form.sex = 1
        }else if (form.sex === "保密"){
          form.sex = 2
        }
        edit_user_info(form).then((res) => {
          var code=res.code
          if (code===200){
            editVisible.value = false;
            ElMessage.success(''+res.msg);
          }else if(code===401){
            ElMessageBox.alert("未授权或登录过期，请重新登录", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                router.push('/login')
              }
            });
          }else {
            ElMessage.error(''+res.msg)
          }
          getData()
        });
      }

    };

    // 添加图书
    const addBooks = () => {
      if (addForm.user_name===""){
        ElMessage.warning("图书名称不能为空！");
      }else if (addForm.user_phone===""){
        ElMessage.warning("出版社不能为空！");
      }else if (addForm.user_address===""){
        ElMessage.warning("图书作者不能为空！");
      }else if (addForm.sex===""){
        ElMessage.warning("图书价格不能为空！");
      }else if (addForm.avatar===""){
        ElMessage.warning("分类不能为空！");
      }
      else{
        if (addForm.sex === "女"){
          addForm.sex = 0
        }else if(addForm.sex === "男"){
          addForm.sex = 1
        }else if (addForm.sex === "保密"){
          addForm.sex = 2
        }

        add_user_info(addForm).then((res) => {
          var code=res.code
          if (code===200){
            ElMessage.success(''+res.msg);
            addVisible.value = false;
            addForm.user_name=""
            addForm.user_phone=""
            addForm.user_address=""
            addForm.sex=""

          }else if(code===401){
            ElMessageBox.alert("未授权或登录过期，请重新登录", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                router.push('/login')
              }
            });
          }else {
            ElMessage.error(''+res.msg)
          }
          getData()


        });
      }

    };


    let delete_info = reactive({
        id:[]
    });
    let idlists=ref([]);
    const SelectionChange = (row) => {
      delete_info.id=[]
      Object.keys(row).forEach((item) => {
        delete_info.id.push(row[item].id)
      });
      console.log(delete_info.id)
    };
    const handleRemove=() =>{

    };
    const msg=() =>{
      ElMessage.warning("功能未完善，敬请期待！");
    };

    const handlePictureCardPreview=(file)=> {
      form.book_image_url=file.response.data.file_url;
    };

    const handleAvatarSuccess=(resource) =>{
      fileList.value=[]
      imgobj.url=resource.data.file_url;
      fileList.value.push((imgobj))
      console.log(imgobj.url)
      form.avatar=imgobj.url;
      addForm.avatar=imgobj.url;
      console.log(addForm.avatar)
    };
    const editstart=(file)=>{
      handleRemove()
    }

    return {
      query,
      tableData,
      pageTotal,
      editVisible,
      form,
      fileList,
      addVisible,
      loadingswith,
      getData,
      handleAdd,
      handleRemove,
      editstart,
      handleAvatarSuccess,
      handlePictureCardPreview,
      handleSearch,
      handlePageChange,
      handleSizeChange,
      handleEdit,
      saveEdit,
      msg,
      delete_books,
      addBooks,
      addForm,
      SERVER_HOST,
      SelectionChange,
      batch_deleteon,
      multipleTableRef
    };
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 3px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
