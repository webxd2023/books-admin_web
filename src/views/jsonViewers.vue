<template class="content">
<div >
  <div style="width:45%; float:left;">
    <br><br><br>
    <el-input type="textarea" rows="30" v-model="rawjson.data"></el-input>
  </div>

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <div style="width:50%; height:1200px; float:left;">
    <br>
    <el-button type="primary" style="left:60%;" @click="jsonfmt">格式化</el-button>
    <el-button type="danger" @click="clear">清空</el-button>
    <json-viewer
        style="width: 100%;height: 650px; overflow-y:scroll; "
        :value="jsonformat"
        expand-depth=5
        copyable="true"
        show-array-index="true"
        :copy="{copyText: 'copy', copiedText: 'uuuuuuuuu'}"
    >
    </json-viewer>
  </div>

</div>


</template>

<script>
import { reactive, ref } from "vue";

export default {
  name: "jsonViewers",
  setup() {
    const rawjson= reactive({
          data: '',
        }
    )
    const jsonformat=ref({}
    )


    var amapinfo=reactive({

      key:'311510dc71c226d04b1837c69c4516b9',

    });
    var weatherinfo=reactive({
      province:'',
      city:'',
    })


    // 格式化
    const jsonfmt =() =>{
      jsonformat.value=JSON.parse(rawjson.data)
    }

    // 清空
    const clear =() =>{
      jsonformat.value={}
      rawjson.data=''
    }

    return {rawjson,jsonformat,jsonfmt,clear};
  },
};
</script>

<style scoped>
.content {
  width: auto;
  height: 100%;
  padding: 10px;
  /*overflow-y: scroll;*/
  box-sizing: border-box;
}

</style>



