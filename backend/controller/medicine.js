const Medicine = require("../models/medicine");
const User = require("../models/user");
const { use } = require("../routers/bmi");


// add medicine 
exports.addMedicine = (req,res) => {
    const userId = req.body.userId;
    var medicines = {
        medicine_name:req.body.medicine_name,
        times:req.body.times,
        no_pills: req.body.no_pills
    }
    var med = new Medicine(medicines);

    // all 2 calls nested inside med call
    med.save((err, med) => {
        if (err) {
          return res.status(400).json({
            error: "NOT able to save category in DB"
          });
        }

        // finding if the med already exists
          User.findById(userId)
      .populate("medicines" , "medicine_name")
      .exec((err,user)=>{
          if(err || !user){
              return res.status(400).json({
                  error: "NOT able to save medicine in DB"});
          }
  
          for(var i =0 ; i < user.medicines.length ; i++){
              if(user.medicines[i].medicine_name == req.body.medicine_name){
                  return res.json({status:"med already exists"});     
              }
          }

          // if not found adding to db 
          User.findOneAndUpdate(
            { _id: userId },
            { $push: {  medicines : med } },
            { new: true },
            (err, medicine) => {
              if (err || !medicine) {
                 // console.log(err);
                return res.status(400).json({
                  error: "NOT able to save medicine in DB"
                });
              }
              else{
                res.send(medicine);
              } 
            }
          );
        
      });

      });    
}


// update medicine values 

exports.updateMedicine =  (req,res)=>{
    const userId = req.body.userId;
    User.findById(userId)
    .populate("medicines" , "medicine_name")
    .exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "NOT able to save medicine in DB"});
        }

        var state = 0;
        for(var i =0 ; i < user.medicines.length ; i++){
            if(user.medicines[i].medicine_name == req.body.current_medicine_name ){
               state =1;
               break;
            }
        }

        if(state){
            Medicine.findOneAndUpdate({_id : user.medicines[i]._id},
                {medicine_name:req.body.new_medicine_name,
            times:req.body.times,
            no_pills: req.body.no_pills}
            ,(err,med)=>{
                if(err || !med){
                    return res.status(400).json({
                        error: "NOT able to save medicine in DB"});
                }
                state = 0;
               return res.send(med);
            }); 
        }
        else{return res.json({status:"no changes"})}

    });

    
}


// delete medicine values 

exports.deleteMedicine =  (req,res)=>{
    const userId = req.body.userId;
    User.findById(userId)
    .populate("medicines" , "medicine_name")
    .exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "no such medicine in DB"});
        }

        var state =0;
        for(var i =0 ; i < user.medicines.length ; i++){
            if(user.medicines[i].medicine_name == req.body.current_medicine_name ){
                state =1;
                break;    
            }
        }
        
        if(state){
            Medicine.findOneAndDelete({_id : user.medicines[i]._id}
                ,(err,med)=>{
                    if(err || !med){
                        return res.status(400).json({
                            error: "NOT able delete medicine in DB"});
                    }
                    User.findByIdAndUpdate({_id:userId},{$pull:{medicines :user.medicines[i]._id }}).exec();
                   return  res.send(med);
                });
        }
        else{return  res.json({status:"no such med"});}
       
    });
}


exports.allMedicine = (req,res)=>{
    var userId = req.body.userId;
    User.findById(userId)
    .populate("medicines")
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "NO order found in DB"
        });
      }
      res.json({medicines:user.medicines});
    });

}


exports.oneMedicine = (req,res)=>{
    var medId = req.body.medId;
    Medicine.findById(medId,(err,med)=>{
        if(err || !med){
           return res.status(400).json({status:"could not find"});
        }
        res.json(med);
    });

}



