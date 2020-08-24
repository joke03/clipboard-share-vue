<template>
    <div class="app-container">
        <div class="handle-box" style="margin-left: 20px;">
            <el-button type="primary" icon="el-icon-plus" @click="beforeAdd">新增</el-button>
        </div>
        <el-table
                :data="clips"
                border
                stripe
                class="table"
                v-loading="isShowloading"
        >
            <el-table-column  type="index" :index="indexMethod" label="序号" sortable width="50" align="center"></el-table-column>
            <el-table-column prop="item_content" label="剪切内容" align="center"></el-table-column>
            <el-table-column label="创建时间" width="150" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.create_time | datefilter}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="50px" align="center">
                <template slot-scope="scope">
<!--                    <el-button-->
<!--                            type="text"-->
<!--                            icon="el-icon-view"-->
<!--                            @click="handleView(scope.$index, scope.row)"-->
<!--                    ></el-button>-->
<!--                    <el-button-->
<!--                            type="text"-->
<!--                            icon="el-icon-edit"-->
<!--                            @click="handleEdit(scope.$index, scope.row)"-->
<!--                    ></el-button>-->
                    <el-button
                            type="text"
                            icon="el-icon-delete"
                            style="color: red"
                            @click="handleDelete(scope.$index, scope.row)"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增 -->
        <el-dialog title="新增" :visible.sync="addVisible">
            <el-form :model="addClipItems" label-position="left">

                <el-form-item label="剪切内容：">
                    <el-input type="textarea" v-model="addClipItems.content" clearable></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="addVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="addClip">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getClipList,delClipById,postClip} from "../api/api";

    export default {
        name: "ClipTable",
        data(){
            return{
                clips:[],
                isShowloading:false,
                addVisible:false,
                addClipItems:{
                    content:''
                },
            }
        },
        methods:{
            //序号自增
            indexMethod(index) {
                return index * 1+1;
            },
            //获取数据
            getClipRecord(){
                this.isShowloading=true
                getClipList().then(res=>{
                    // console.log(res)
                    this.clips = res.data;
                    this.isShowloading=false;
                }).catch(err=>{
                    this.$message.error('获取失败')
                }).finally(()=>{
                    this.isShowloading=false;
                })

            },
            beforeAdd(){
                this.addClipItems.content='';
                this.addVisible=true;
            },
            //新增
            addClip(){
                let params = {
                    item_content:this.addClipItems.content
                }
                postClip(params).then(res=>{
                    this.getClipRecord();
                    if (res.data===true){
                        this.$message.success('提交成功')
                        this.addVisible = false;
                    }
                }).catch(err=>{
                    this.$message.error('提交失败')
                }).finally(()=>{
                    this.addVisible = false;
                })

            },
            //删除
            handleDelete(index, row) {
                delClipById(row.id).then(res=>{
                    this.getClipRecord();
                    if (res.data === true){
                        this.$message.success('删除成功')
                    }
                })
            },
        },
        filters: {
            datefilter: function (date){
                let time = new Date(date);
                let y = time.getFullYear();
                let M = time.getMonth()+1;
                let d = time.getDate();
                let h = time.getHours();
                let m = time.getMinutes();
                let s = time.getSeconds();
                return y+'-'+M+'-'+d+' '+h+':'+m+':'+s
            }

        },
        mounted() {
            this.getClipRecord();
        }
    }
</script>

<style>
    .app-container {
        padding: 20px;
    }
    .handle-box {
        margin-bottom: 20px;
    }

    @media screen and (max-width: 500px) {
        .el-message {
            min-width: 300px !important;
        }
    }
    @media screen and (max-width: 500px) {
        .el-dialog__wrapper .el-dialog {
            width: 300px !important;
        }
        .el-dialog__body{
            padding: 10px 20px!important;
        }
        .el-form-item__label{
            width: 68px!important;
        }
        .el-select,.el-input{
            width: 180px!important;
        }
    }
</style>
