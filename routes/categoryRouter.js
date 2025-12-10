var express = require('express');
var router = express.Router();
var categoryRouter = require('../models/category');

//POST: Thêm     PUT: Cập Nhật   DELETE: Xóa    GET: Lấy dữ liệu
// thêm danh mục 
// localhost:3000/category/add-category
router.post("/add-category",async function(req,res){
    try{
        //Nhận dữ liệu từ req.body
    const{name,ParentID} =req.body;
    //Tạo project lưu db
    const newCate ={name,ParentID};
    //Lưu project vào db
    await categoryRouter.create(newCate);
    res.status(200).json({status:true,message:"Thêm danh mục thành công"});
    }catch(err){
        res.status(400).json({status:false,message:"Thêm danh mục thất bại"});
    }
});

//localhost:3000/category/update-category
//cap nhat
router.put("/update-category/",async function(req,res){
    const {id,name,ParentID} =req.body;
    const item =await categoryRouter.findById(id)
    
    if(item){
        //update
        item.name =name ? name :item.name;
        item.ParentID =ParentID ? ParentID :item.ParentID;
        item.save();
        res.status(200).json({status:true,message:"Cập nhật danh mục thành công"});
    }else{
        res.status(200).json({status:false,message:"không tìm thấy danh mục"});
    }
});
    //localhost:3000/category/delete-category?id=abc
    //xoa
        router.delete("/delete-category/",async function(req,res){
            const{id} =req.query;
            const item =await categoryRouter.findById(id)
            if(item){
                await categoryRouter.findByIdAndDelete(id)
                res.status(200).json({status:true,message:"Xóa danh mục thành công"});
            }else{
                res.status(200).json({status:false,message:"không tìm thấy danh mục"});
            }
        });

           //localhost:3000/category/delete-category-2/:id
    //xoa
        router.delete("/delete-category-2/:id",async function(req,res){
            const{id} =req.params;
            const item =await categoryRouter.findById(id)
            if(item){
                await categoryRouter.findByIdAndDelete(id)
                res.status(200).json({status:true,message:"Xóa danh mục thành công"});
            }else{
                res.status(200).json({status:false,message:"không tìm thấy danh mục"});
            }
        });
module.exports = router;