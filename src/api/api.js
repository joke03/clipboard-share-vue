import service from './api_req';

//获取剪贴板信息
export const getClipList = () =>{
    return service.get('/clip/getAll')
}
//删除剪贴板信息byId
export const delClipById = id =>{
    return service.delete('/clip/delete/'+id)
}
//新增剪贴板信息
export const postClip = params =>{
    return service.post('/clip/save',{
        "item_content":params.item_content
    })
}
