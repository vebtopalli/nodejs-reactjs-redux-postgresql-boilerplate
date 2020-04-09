const bcrypt=require('bcrypt-nodejs');
const Sequelize = require('sequelize');
const sequelize=require('./../connection').sequelize;



const UserModel = sequelize.define('user', {
    id:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
    name:{type:Sequelize.STRING(50),allowNull:false,},
    email:{type:Sequelize.STRING(50),allowNull:false,unique:true}, 
    password:{type:Sequelize.STRING},
    password_h:{
        type: Sequelize.VIRTUAL,
        set: function (val) {
           var hashSycns=bcrypt.hashSync(val,bcrypt.genSaltSync(8),null);
           this.setDataValue('password', hashSycns);
         }
    },
    address_1:{type:Sequelize.STRING(100),allowNull:false,},
    address_2:{type:Sequelize.STRING(100),allowNull:true,},
    city:{type:Sequelize.STRING(100),allowNull:false,},
    postal_code:{type:Sequelize.STRING(100),allowNull:false,},
    country:{type:Sequelize.STRING(100),allowNull:false,},
    phone:{type:Sequelize.STRING(100),allowNull:false,},
    social_register:{type:Sequelize.BOOLEAN,allowNull:false,defaultValue:false},
    role:{type:Sequelize.INTEGER,allowNull:false,defaultValue:2},
});
module.exports.UserModel=UserModel;


UserModel.findOne({
    where:{
        email:'user@gmail.com',
    }
}).then((results)=>{
    if(!results){
        
        UserModel.create({
            name:'Adm strat',
            email:'user@gmail.com',
            password_h:'password',
            address_1:'Address1',
            address_2:'Address1',
            city:'City',
            postal_code:7000,
            country:'Country',
            phone:'1111 222 333',
            role:0,
            social_register:false
        }).then((results)=>{
            console.log(results);
        }).catch((error)=>{
            console.log(error);
        })
    }
})