var express = require("express");
var router = express.Router();
var productModel = require("../models/product");
const product = require("../models/product");
var upload = require("../util/upload");
var sendmail = require("../util/mail");
// Thêm sản phẩm
// POST: localhost:3000/products/add-product
router.post("/add-product", async function (req, res) {
    try {
        const { name, description, price, quantity, status, cateID } = req.body;
        const newProduct = {
            name,
            description,
            price,
            quantity,
            status,
            createAt: new Date(),
            updateAt: new Date(),
            cateID
        };
        await productModel.create(newProduct);
        res.status(201).json({
            status: true,
            message: "Thêm sản phẩm thành công"
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({ status: false, message: "Thêm sản phẩm thất bại" });
    }
});

// Cập nhật sản phẩm
// PUT: localhost:3000/products/update-product
router.put("/update-product", async function (req, res) {
    try {
        const { id, name, description, price, quantity, status, cateID } = req.body;
        const item = await productModel.findById(id);
        if (!item) {
            return res.status(404).json({ status: false, message: "Không tìm thấy sản phẩm" });
        }
        // Update nếu có truyền vào
        item.name = name ?? item.name;
        item.description = description ?? item.description;
        item.price = price ?? item.price;
        item.quantity = quantity ?? item.quantity;
        item.status = status ?? item.status;
        item.cateID = cateID ?? item.cateID;
        item.updateAt = new Date();
        await item.save();
        res.status(200).json({ status: true, message: "Cập nhật thành công" });
    } catch (e) {
        console.log(e);
        res.status(400).json({ status: false, message: "Cập nhật thất bại" });
    }
});

// Xóa sản phẩm theo query ?id=...
// DELETE: localhost:3000/products/delete-product?id=123
router.delete("/delete-product", async function (req, res) {
    try {
        const { id } = req.query;
        const item = await productModel.findById(id);
        if (!item) {
            return res.status(404).json({ status: false, message: "Không tìm thấy sản phẩm" });
        }
        await productModel.findByIdAndDelete(id);
        res.status(200).json({ status: true, message: "Xóa thành công" });
    } catch (e) {
        console.log(e);
        res.status(400).json({ status: false, message: "Xóa thất bại" });
    }
});

// Xóa sản phẩm theo params localhost:3000/delete-product-2/:id
router.delete("/delete-products-2/:id", async function (req, res) {
    try {
        const { id } = req.params;
        const item = await productModel.findById(id);
        if (!item) {
            return res.status(404).json({ status: false, message: "Không tìm thấy sản phẩm" });
        }
        await productModel.findByIdAndDelete(id);
        res.status(200).json({ status: true, message: "Xóa thành công" });
    } catch (e) {
        console.log(e);
        res.status(400).json({ status: false, message: "Xóa thất bại" });
    }
});
    
// Lọc danh sách sản phẩm có giá lớn hơn 50,000.
// 1. Lọc danh sách sản phẩm có giá lớn hơn 50,000
// GET : localhost:3000/products/price-gt-50000
router.get("/price-gt-50000", async function (req, res) {
    const list = await productModel.find({ price: { $gt: 50000 } });
    res.status(200).json({status: true, message: "thanh cong", data: list});
});
// 2.Lọc danh sách sản phẩm có số lượng nhỏ hơn 10.
// GET: localhost:3000/products/locspnho10
router.get("/locspnho10", async (req, res) => {
    const list = await productModel.find({ quantity: { $lt: 10 } });
    res.status(200).json({status:true, message:"thanh cong", data:list});
});
// 3.Tìm sản phẩm có name chứa từ khóa “socola”.
// GET: localhost:3000/products/timsp
router.get("/timsp", async (req, res) => {
    const list = await productModel.find({ name: { $regex: "socola", $options: "i" } });
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});
// 4.Sắp xếp sản phẩm theo giá tăng dần.
// GET: localhost:3000/products/tangdan
router.get("/tangdan", async (req, res) => {
    const list = await productModel.find().sort({ price: 1 });
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});
// 5.Lấy 3 sản phẩm có giá cao nhất.
// GET: localhost:3000/products/top3
router.get("/top3", async (req, res) => {
    const list = await productModel.find().sort({ price: -1 }).limit(3);
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});
// 6.Lấy 5 sản phẩm có số lượng nhiều nhất.
// GET: localhost:3000/products/top5
router.get("/top5", async (req, res) => {
    const list = await productModel.find().sort({ quantity: -1 }).limit(5);
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});
// 7.Lấy danh sách sản phẩm được tạo trong ngày hôm nay (dựa vào createAt).
// GET: localhost:3000/products/today
router.get("/today", async (req, res) => {
    const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999)
        const list = await productModel.find({createAt: {$gte: start, $lte: end}})
        res.status(200).json({status:true,message:"thanh cong",data:list})
});
// 8.Lọc sản phẩm có giá nằm trong khoảng từ 20,000 đến 100,000..
// GET: localhost:3000/products/locsp1
router.get("/locsp1", async (req, res) => {
    const list = await productModel.find({ price: { $gte: 20000, $lte: 100000 }});
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});
// 9.Lấy danh sách sản phẩm có tên bắt đầu bằng chữ “Bánh”.
// GET: localhost:3000/products/banh
router.get("/banh", async (req, res) => {
    const list = await productModel.find({ name: { $regex: "^Bánh", $options: "i" } });
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});
// 10.Tìm sản phẩm theo nhiều điều kiện: giá < 100,000 và quantity > 20.
// GET: localhost:3000/products/search-multi
router.get("/search-multi", async (req, res) => {
    const list = await productModel.find({ price: { $lt: 100000 }, quantity: { $gt: 20 } });
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});
// 11.Lấy danh sách sản phẩm có giá < 100,000 và status = true, đồng thời sắp xếp theo giá giảm dần.
// GET: localhost:3000/products/filter-sort
router.get("/filter-sort", async (req, res) => {
    const list = await productModel.find({ price: { $lt: 100000 }, status: true }).sort({ price: -1 });
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});
// 12.Lấy sản phẩm có quantity nằm trong khoảng từ 10 đến 30 và name chứa từ “bánh”.
// GET: localhost:3000/products/filter-adv
router.get("/filter-adv", async (req, res) => {
    const list = await productModel.find({ quantity: { $gte: 10, $lte: 30 }, name: { $regex: "bánh", $options: "i" } });
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});
// 13.Tìm sản phẩm theo nhiều điều kiện: name chứa “kem” hoặc “socola”, và giá > 200,000.
// GET: localhost:3000/products/search-complex
router.get("/search-complex", async (req, res) => {
    const list = await productModel.find({
        $and: [
            { price: { $gt: 200000 } },
            {$or: [
                    {name:{ $regex: "kem", $options: "i" }},
                    {name:{ $regex: "socola", $options: "i" }}
            ]}
        ]
    });
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});
// 14.Lấy danh sách sản phẩm có quantity > 20, sắp xếp theo quantity giảm dần, sau đó theo price tăng dần.
// GET: localhost:3000/products/sort-multi
router.get("/sort-multi", async (req, res) => {
    const list = await productModel.find({ quantity: { $gt: 20 } }).sort({ quantity: -1, price: 1 });
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});
// 15.Lấy danh sách sản phẩm theo cateID nhưng loại bỏ các sản phẩm có status = false
router.get("/by-cateid", async (req, res) => {
    const { cateID } = req.query;
    const list = await productModel.find({ cateID: cateID, status: true });
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});
// 16.Tìm sản phẩm có price thấp nhất trong toàn bộ danh sách.
router.get("/price-min", async (req, res) => {
    const item = await productModel.findOne().sort({ price: 1 });
    res.status(200).json({ status: true, message: "thanh cong", data: item });
});
// 17.Tìm 5 sản phẩm có price cao nhất nhưng quantity phải lớn hơn 10.
router.get("/top5-price-gt-10", async (req, res) => {
    const list = await productModel.find({ quantity: { $gt: 10 } }).sort({ price: -1 }).limit(5);
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});
// 18.Tìm tất cả sản phẩm có name bắt đầu bằng chữ “Bánh” và description chứa từ “vani”.
router.get("/banh-vani", async (req, res) => {
    const list = await productModel.find({
        name: { $regex: "^Bánh", $options: "i" },
        description: { $regex: "vani", $options: "i" }
    });
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});
// 19.Lọc danh sách sản phẩm tạo trong vòng 7 ngày trở lại đây dựa vào createAt.
router.get("/created-last-7-days", async (req, res) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const list = await productModel.find({ createAt: { $gte: sevenDaysAgo } });
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});
// 20.Lấy danh sách sản phẩm theo cateID, và chỉ trả về các field: name, price, quantity.
router.get("/by-cateid-select", async (req, res) => {
    const { cateID } = req.query;
    const list = await productModel.find({ cateID: cateID }, "name price quantity");
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});
// 21.Tìm sản phẩm có price từ 20,000 đến 200,000 và name KHÔNG chứa chữ “socola”.
router.get("/price-20k-200k-no-socola", async (req, res) => {
    const list = await productModel.find({
        price: { $gte: 20000, $lte: 200000 },
        name: { $not: { $regex: "socola", $options: "i" } }
    });
    res.status(200).json({ status: true, message: "thanh cong", data: list });
});

    router.post('/upload', [upload.single('hinhAnh')],
    async (req, res, next) => {
        try {
            const { file } = req;
            if (!file) {
               return res.json({ status: 0, link : "" }); 
            } else {
                const url = `http://localhost:3000/images/${file.filename}`;
                return res.json({ status: 1, url : url });
            }
        } catch (error) {
            console.log('Upload image error: ', error);
            return res.json({status: 0, link : "" });
        }
    });


router.post("/send-mail", async function(req, res, next){
    try{
        const {to, subject, content} = req.body;
        
        // 2. Tạo nội dung HTML (Template email)
        const htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #e82727ff; padding: 40px 0; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #1a0202ff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            
            <div style="background-color: #aa2727ff; padding: 20px; text-align: center;">
                 <h1 style="color: #e5d6d6ff; margin: 0; font-size: 24px;">THÔNG BÁO </h1>
            </div>

            <div style="padding: 30px; color: #f2e9e9;">
              <h2 style="margin-top: 0;">Xin chào,</h2>
              
              <p style="font-size: 16px; line-height: 1.6; color: #ffffff;">
                Đây là email của phat ne.
              </p>
              
              <div style="background-color: #2b2b2b; padding: 15px; border-left: 4px solid #aa2727ff; margin: 20px 0;">
                 <p style="margin: 0; font-style: italic; color: #ffffff;">
                    "${content || 'Chúc mừng! Giao diện email HTML hiển thị thành công.'}"
                 </p>
              </div>

              <p style="font-size: 16px; line-height: 1.6; color: #ffffff;">
                Vui lòng chọn một trong các tùy chọn bên dưới để tiếp tục:
              </p>

              <div style="text-align: center; margin-top: 30px;">
                <a href="https://yourhomepage.com" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold; margin: 5px;">
                  Trang Chủ
                </a>
                <a href="https://yourproducts.com" style="display: inline-block; background-color: #ffc107; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold; margin: 5px;">
                  Sản Phẩm
                </a>
                <a href="https://google.com" style="display: inline-block; background-color: #5eb071ff; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 5px; font-weight: bold; margin: 5px;">
                  Xem Chi Tiết
                </a>
              </div>
            </div>

            <div style="background-color: #aa2727ff; padding: 15px; text-align: center; color: #f2e9e9; font-size: 12px;">
              <p style="margin: 0;"> Huy phat </p>
            </div>
          </div>
        </div>
        `;


        const mailOptions = {
            from: "Admin Sys <halon@gmail.com>",
            to: to,
            subject: subject,
            html: htmlContent
        };
        // 4. Thực hiện gửi
        await sendMail.transporter.sendMail(mailOptions);
// 5. Trả về kết quả
        res.json({ status: 1, message: "Gửi mail thành công" });

    } catch(err) {
        console.log("Lỗi gửi mail:", err);
        res.json({ status: 0, message: "Gửi mail thất bại" });
    }
});


module.exports = router;