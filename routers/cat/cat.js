// 引入express
var express = require('express');
var router = express.Router();
var address = require('../../models/S_address');
var user = require('../../models/User1');
var order = require('../../models/order');
var orderdetail = require('../../models/orderdetail');


var newStudents = '';
// 接收ajax的信息
router.post('/localStorage',function (req,res){

	newStudents= req.body.Students;
	res.json(newStudents);
	return;

})

// 创建路由访问规则
router.get('/index',function (req,res,next){
	// 判断是否存在cookie的值
	if(newStudents){
		// 渲染页面
		res.render('cat/L_cat.html',{
			newStudents:newStudents,
			title : req.userInfo
		});
	}else{
		// 渲染页面
		res.render('cat/L_cat.html',{
			title : req.userInfo
		});
	}
	return;
})
// 添加详情页模块
router.get('/goods/detail', function(req, res, next) {
	res.render('detail/details');
	// res.send('hello')
	next();
})

router.post('/sendorder', function(req, res, next) {
	newStudents = req.body;
	if(newStudents != '') {
		res.json(newStudents);
	}
	next();

})


var sendOrder = {};
// 添加下订单模块
router.get('/jiesuan',function (req,res,next){
if(req.userInfo){
	address.find({
		uid : req.userInfo._id,
		moren : '是'
	}).then(function(ee) {
		// console.log(ee)
		if(ee.length !== 0) {
			// console.log(111111)
			sendOrder.address = ee[0].add;
			sendOrder.username = ee[0].username;
			sendOrder.tellphone = ee[0].tel;
			
		}else{
			// console.log(2222)
			sendOrder.newUser = true;
		}
		return res.render('cat/L_jeisuan',{
				title : req.userInfo,
				sendorder : sendOrder
			});
		// console.log(3333333)
	});
}else{
	res.render('login/W_login',{})
	return;
}
	
})


// 将订单信息导入数据库
router.post('/realorder', function(req,res,next) {

	var success = '';
	// 订单信息和本地存储
	orders = req.body.orders;
	newstudent = req.body.newStudents;
	var time = new Date();
	var y = time.getFullYear();
	var m = time.getMonth();
	var d = time.getDate();
	var h = time.getHours();
	var Mm = time.getMinutes();
	var s = time.getSeconds();
	var subnum = y + "" + m+ "" +d+ ""+h+ ""+Mm+ ""+s+ "" + parseInt(Math.random()*10000000001);
	var addTime = y + '年'+ m + '月' + d + '日' + h + '时' + Mm + '分' + s + '秒';
	if(orders.sumprice) {

		address.find({
			
			uid : req.userInfo._id,
			moren : '是'

		}).then(function(ress) {

			// console.log(ress)
			// if(ress.)
			new order({
				subnum : subnum,
				uid : ress.uid,
				sendAdd : res.add,
				spDate : addTime,
				spPrice : orders.sumprice,
				sendDate : '待定',
				spphone : ress.tel,
				spname : ress.username,
				spStatus : 0
			}).save().then(function(resData) {
				if(resData) {
					oid = resData._id;
					new orderdetail({
						gid: newstudent[0].gid,
						oid: oid,
						name: newstudent[0].describe,
						price: newstudent[0].pirce,
						count: newstudent[0].count,
						color: newstudent[0].color
					}).save().then(function(resData) {
						// message = 1;
						res.json(oid)
						return;
					})
					
				}
			});
		})
		
		
		
		
	}else{
		message = '订单提交错误!!';
		res.json(messsage)
		return;
	}
	
})


// 支付页面
router.get('/payorder', function(req, res, next) {
	// console.log(req.query)
	var oid = req.query.oid;
	order.findOne({
		_id : oid
	}).then(function(orderinfo) {
		console.log(orderinfo)
		// 订单号
		subnum = orderinfo.subnum;
		// 总价
		spprice = orderinfo.spPrice;

	})
	orderdetail.findOne({
		oid : oid
	}).then(function(orderdetial) {
		return res.render('cat/sub_order.html', {
			title : req.userInfo
		});
	})
	// next();

})
// 导出到核心模块
module.exports = router;