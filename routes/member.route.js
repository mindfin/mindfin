const express = require ('express');
const router = express.Router();
var sha1 = require('sha1');
var generator = require('generate-password');
const format = require ('date-format');
const knex = require('../knex/knex.js');
 


router.post('/memberlogin',(req,res,next)=>
{
var username = req.body.mid;
const decryptedString = sha1(req.body.password);
knex.select()
.from('member_table').where({mid:username,password:decryptedString})
.then(function(result){  
  console.log(result); 
  res.json(result);
})
 
})

router.get('/getsinglemember/:id',function(req,res){
    knex.select()
    .from('member_table')
    .join('project','project.idproject','member_table.pname')
    .join('plotsize','plotsize.idplotsize','member_table.psize')
    .join('land','land.idland','member_table.idland')
    .where({selectstatus:'active',idmember:req.params.id})
    .then(function(result){  
    console.log(result);
      res.json(result);
    });
})
 
router.get('/homememberlist/:memberid',function(req,res){
console.log(req.params.memberid);

    knex.select()
    .from('member_table')
    .join('project','project.idproject','member_table.pname')
    .join('plotsize','plotsize.idplotsize','member_table.psize')
    .join('land','land.idland','member_table.idland')
    .where({selectstatus:'active',idmember:req.params.memberid})
    .then(function(result){  
    console.log(result);
      res.json(result);
    });
      })

      
      router.get('/myprojectlist/:memberid',function(req,res){
        knex.select('receipt.*')
        .from('member_table')
        .join('receipt','receipt.idbooking','member_table.idmember')
        .where({status:'active',idmember:req.params.memberid})
        .then(function(result){  
        console.log(result);
          res.json(result);
        });
          })

          router.post('/checkcurrentpwd',(req,res,next)=>
          {
            console.log(req.body);
          var memid =req.body.idvalue;
          var currentpwd = req.body.bname;
          var pwd = (sha1(currentpwd));
          console.log(pwd);
          console.log(memid);
          knex.select()
          .from('employee')
          .where({password:pwd})
          .where({idemployee:memid})
          .then(function(result){  
          console.log(result);
          if(result==undefined || result=='' || result==null){
          console.log("hi")
          res.json({status:false,});
          }
          else
          {
          console.log("bye")
          res.json({
          result:result,  
          status:true, 
          });
          }
          });
          })
          
          router.post('/changepwd',function(req,res){  
            console.log(req.body);
              const pwd = (sha1(req.body.cpwd));
              console.log(pwd);

              knex('employee')
              .where({idemployee:req.body.idvalue})
              .update({
                password: pwd,orgpassword:req.body.cpwd
              })
              .then(function(result){  
                if(result==undefined || result==''|| result==null ){
                    res.json({message:"Not Update",status:false});
                    }
                    else
                        {
                        res.json({
                        result:result,  
                        status:true, 
                        }
                        );
                        }
              });
            })

    //           Memberlist.updateOne({_id:req.body.bid},{$set:{
    //               password:pwd
    //       //      }
    //       //      });
    //       // })
    //   }}
    // ,function(err,res1){
    //       res.json({message:'Password is Updated'});
    //   })
    //   })
      



module.exports = router;