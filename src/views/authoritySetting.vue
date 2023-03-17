<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 权限设置
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container"  >
      <div class="handle-box" >

        <el-input v-model="query.id" placeholder="图书编号" clearable class="handle-input mr10"></el-input>

        <el-input v-model="query.books_name" placeholder="图书名称" clearable class="handle-input mr10"></el-input>
        <el-input v-model="query.author" placeholder="图书作者" clearable class="handle-input mr10"></el-input>
        <el-input v-model="query.press" placeholder="出版社" clearable class="handle-input mr10"></el-input>
        <el-select v-model="query.classify" placeholder="图书分类" clearable class="handle-select mr10">
          <el-option key="1" label="马列思想" value="马列思想"></el-option>
          <el-option key="2" label="哲学" value="哲学"></el-option>
          <el-option key="3" label="社会科学" value="社会科学"></el-option>
          <el-option key="4" label="自然科学" value="自然科学"></el-option>
          <el-option key="4" label="综合性图书" value="综合性图书"></el-option>
        </el-select>
        <el-select v-model="query.book_status" placeholder="状态" clearable class="handle-select mr10">
          <el-option key="正常" label="正常" value="正常"></el-option>
          <el-option key="下架" label="下架" value="下架"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="msg">批量删除</el-button>
      </div>
      <el-table :data="tableData" v-loading="loadingswith"  element-loading-text="拼命加载中..." element-loading-background="rgba(250,250,250,0.97)" border class="table" height="570" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="id" label="图书编号"></el-table-column>
        <el-table-column label="图书名称">
          <template #default="scope">{{ scope.row.book_name }}</template>
        </el-table-column>
        <el-table-column prop="press" label="出版社"></el-table-column>
        <el-table-column prop="author" label="图书作者"></el-table-column>

        <el-table-column label="图书封面" align="center">
          <template #default="scope">
            <el-image class="table-td-thumb" style="height: 100px; width: 80px" :src="scope.row.book_image_url" :preview-src-list="[scope.row.book_image_url] "></el-image>
          </template>
        </el-table-column>

        <el-table-column prop="classify" label="图书分类"></el-table-column>

        <el-table-column prop="price" label="图书价格"></el-table-column>

        <el-table-column label="图书状态" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.book_status===1" type="success" effect="dark">正常</el-tag>
            <el-tag v-else-if="scope.row.book_status===2" type="danger" effect="dark">下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="借阅状态" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.borrowing_status===1" type="" effect="dark">空闲</el-tag>
            <el-tag v-else-if="scope.row.borrowing_status===2" type="warning" effect="dark">借阅中</el-tag>
          </template>
        </el-table-column>




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
        <el-form-item label="图书编号" width="50%">
          <el-input v-model="form.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="图书名称">
          <el-input v-model="form.book_name"></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="form.press"></el-input>
        </el-form-item>
        <el-form-item label="图书作者">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="图书状态">
          <el-select v-model="form.book_status" placeholder="状态" class="handle-select mr10">
            <el-option key="status" label="正常" value="正常"></el-option>
            <el-option key="status" label="下架" value="下架"></el-option>
          </el-select>
          <el-tag v-if="form.book_status==='正常'" type="success" effect="dark">正常</el-tag>
          <el-tag v-else-if="form.book_status==='下架'" type="danger" effect="dark">下架</el-tag>

        </el-form-item>
        <el-form-item label="图书价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="图书分类">
          <el-input v-model="form.classify"></el-input>
        </el-form-item>
        <el-form-item label="图书封面">
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
        <el-form-item label="图书名称">
          <el-input v-model="addForm.book_name"></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="addForm.press"></el-input>
        </el-form-item>

        <el-form-item label="图书作者">
          <el-input v-model="addForm.author"></el-input>
        </el-form-item>
        <el-form-item label="图书价格">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="图书分类">
          <el-input v-model="addForm.classify"></el-input>
        </el-form-item>
        <el-form-item label="图书封面">
          <el-upload
              :action="SERVER_HOST+'/fileInfo'"
              list-type="picture-card"

              :on-success="handleAvatarSuccess"
              :on-change="editstart">

            <i class="el-icon-plus"></i>
          </el-upload>
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
import {get_books_info, edit_books_info, delete_books_info, add_books_info} from "../api/index";
import {useRouter} from "vue-router";
import { SERVER_HOST } from "../config";

export default {
  name: "authoritySetting",
  setup() {
    const router = useRouter();
    const query = reactive({
      page: 0,
      rows: 5,
      id:'',
      books_name:'',
      author:'',
      classify:'',
      press:'',
      book_status:''
    });
    const tableData = ref([]);
    const pageTotal = ref(0);
    const loadingswith=ref(true)
    // 获取表格数据
    const getData = () => {
      var startTime= new Date().getTime();
      loadingswith.value=true;
      if (query.book_status==="正常"){
        query.book_status=1
      }else if(query.book_status==="下架"){
        query.book_status=2
      }
      get_books_info(query).then((res) => {

            var code = res.code;
            if (code===200){
              tableData.value = res.data;
              pageTotal.value = res.datazise || 0;
              var endTime= new Date().getTime();
              ElMessage.success('请求耗时'+(endTime-startTime)+"ms");
              loadingswith.value=false;
              if (query.book_status===1){
                query.book_status="正常"
              }else if(query.book_status===2){
                query.book_status="下架"
              }
            }else if(code===401){
              get_books_info(query).then((res) => {
                var code = res.code;
                if (code===200){
                  tableData.value = res.data;
                  pageTotal.value = res.datazise || 0;
                  var endTime= new Date().getTime();
                  ElMessage.success('请求耗时'+(endTime-startTime)+"ms");
                }else if(code===401){
                  ElMessageBox.alert("未授权或登录过期，请重新登录", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {
                      sessionStorage.clear()
                      localStorage.removeItem("user_name");
                      localStorage.removeItem("token");
                      console.log('用户信息已清除')
                      router.push('/login')
                    }
                  });
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
    // 删除操作
    const delete_books = (index,row) => {
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      }).then(() => {
        Object.keys(form).forEach((item) => {
          form[item] = row[item];
        });
        delete_books_info(form).then((res) => {
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
      id:0,
      book_name:"",
      press:"",
      author:"",
      price:"",
      classify:"",
      book_image_url:"",
      book_status:"",
      book_add_time:""
    });

    let addForm = reactive({
      book_name:"",
      press:"",
      author:"",
      price:"",
      classify:"",
      book_image_url:""
    });
    let idx = -1;
    let fileList= ref([]);
    let imgobj=ref({
      url:""
    })
    const handleEdit = (index, row) => {



      imgobj.url=row.book_image_url;
      fileList.value=[]
      fileList.value.push((imgobj))
      // fileList.push(imgobj)
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      if (form.book_status===1){
        form.book_status="正常"
      }else if (form.book_status===2){
        form.book_status="下架"
      }
      console.log(form.book_status)
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


      if (form.book_name===""){
        ElMessage.warning("图书名称不能为空！");
      }else if (form.press===""){
        ElMessage.warning("出版社不能为空！");
      }else if (form.author===""){
        ElMessage.warning("图书作者不能为空！");
      }else if (form.price===""){
        ElMessage.warning("图书价格不能为空！");
      }else if (form.classify===""){
        ElMessage.warning("分类不能为空！");
      }else if (form.book_image_url===""){
        ElMessage.warning("图书封面不能为空！");
      }else {
        if (form.book_status==="正常"){
          form.book_status=1
        }else if (form.book_status==="下架"){
          form.book_status=2
        }
        edit_books_info(form).then((res) => {
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
      if (addForm.book_name===""){
        ElMessage.warning("图书名称不能为空！");
      }else if (addForm.press===""){
        ElMessage.warning("出版社不能为空！");
      }else if (addForm.author===""){
        ElMessage.warning("图书作者不能为空！");
      }else if (addForm.price===""){
        ElMessage.warning("图书价格不能为空！");
      }else if (addForm.classify===""){
        ElMessage.warning("分类不能为空！");
      }else if (addForm.book_image_url===""){
        ElMessage.warning("图书封面不能为空！");
      }
      else{
        add_books_info(addForm).then((res) => {
          var code=res.code
          if (code===200){
            ElMessage.success(''+res.msg);
            addVisible.value = false;
            addForm.book_name=""
            addForm.press=""
            addForm.author=""
            addForm.price=""
            addForm.classify=""
            addForm.book_image_url=""

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



    const msg = () => {
      ElMessage.warning("功能未完善，敬请期待！");
    };
    const handleRemove=() =>{

    };
    const handlePictureCardPreview=(file)=> {
      form.book_image_url=file.response.data.file_url;
    };

    const handleAvatarSuccess=(resource) =>{
      fileList.value=[]
      imgobj.url=resource.data.file_url;
      fileList.value.push((imgobj))
      console.log(imgobj.url)
      form.book_image_url=imgobj.url;
      addForm.book_image_url=imgobj.url;
      console.log(addForm.book_image_url)
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
      SERVER_HOST
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
  width: 240px;
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
  margin-right: 5px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
