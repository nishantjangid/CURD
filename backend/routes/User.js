const con = require("../db").promise();

const router = require("express").Router();

router.get("/",async(req,res)=>{
    return res.status(200).send({message:"Hello"});
})

// CREATE 
router.post("/create",async(req,res,next)=>{
    let {email,address,name} = req.body;
    if(!email) return res.status(400).json({error:"Please provide email"});
    if(!address) return res.status(400).json({error:"Please provide address"});
    if(!name) return res.status(400).json({error:"Please provide name"});
    try{
        let [check] = await con.execute("SELECT * FROM `users` WHERE email=?",[email]);
        console.log(check);
        if(check.length > 0) return res.status(400).json({error:"User already Exists"});

        let [row] = await con.execute("INSERT INTO `users` (`name`,`email`,`address`) VALUES (?,?,?)",[name,email,address]);
        if(row.affectedRows){
            return res.status(201).json({message:"User Inserted Successfully"});
        }else{
            return res.status(400).json({error:"Internel Server Error"});
        }
    }catch(err){
        next(err);
    }
})

// UPDATE
router.post("/update/:id",async(req,res,next)=>{
    const {id} = req.params;
    const {email,name,address} = req.body;
    if(!id) return res.status(400).json({error:"Please provide user id"});
    if(!email) return res.status(400).json({error:"Please provide email"});
    if(!address) return res.status(400).json({error:"Please provide address"});
    if(!name) return res.status(400).json({error:"Please provide name"});
    try{
        // CHECK USER EXISTS
        let [check] = await con.execute("SELECT * FROM `users` WHERE id=?",[id]);        
        if(check.length == 0) return res.status(400).json({error:"User not found"});

        // SAME EMAIL EXISTS
        let [checkEmail] = await con.execute("SELECT * FROM `users` WHERE email=?",[email]);        
        if(checkEmail.length > 0) return res.status(400).json({error:"Email already in use please use different email"});

        // UPDATE USER
        let [updateData] = await con.execute("UPDATE `users` SET email=?,name=?,address=? WHERE id=?",[email,name,address,id]);
        if(updateData.affectedRows > 0){
            return res.status(200).json({message:"User Updated Successfully"});
        }else{
            return res.status(400).json({error:"Internel Server Error"});
        }
    }catch(err){
        next(err);
    }
})

// DELETE
router.post("/delete/:id",async(req,res,next)=>{
    const {id} = req.params;
    if(!id) return res.status(400).json({error:"Please provide user id"});
    try{
        let [check] = await con.execute("SELECT * FROM `users` WHERE id=?",[id]);        
        if(check.length == 0) return res.status(400).json({error:"User not found"});
        let [deleteData] = await con.execute("DELETE FROM `users` Where id=?",[id]);
        if(deleteData.affectedRows > 0){
            return res.status(200).json({message:"User Deleted Successfully"});
        }else{
            return res.status(400).json({error:"Internel Server Error"});
        }
    }catch(err){
        next(err);
    }
})

// READ
router.get("/users",async(req,res,next)=>{
    try{
        let [row] = await con.execute("SELECT * FROM `users` ORDER BY id DESC");
        if(row.length > 0){
            return res.status(200).json({result:row});
        }else{
            return res.status(400).json({error:"Users not found"});
        }
    }catch(err){
        next(err);
    }
})

// GET USER DETAILS
router.get("/user/:id",async(req,res,next)=>{
    try{
        let {id} = req.params;
        if(!id) return res.status(400).json({error:"Please provide user id"});

        let [row] = await con.execute("SELECT * FROM `users` WHERE id=?",[id]);
        if(row.length > 0){
            return res.status(200).json({result:row});
        }else{
            return res.status(400).json({error:"User not found"});
        }
    }catch(err){
        next(err);
    }
})

module.exports = router;