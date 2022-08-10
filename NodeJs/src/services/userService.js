import db from "../models/index";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
        } catch (e) {
            reject(e);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist) {
                //Tồn tại user
                let user = await db.User.findOne({
                    where: {email: email},
                    attributes: ['id','email','roleId','password','firstName','lastName'],
                    raw: true
                });
                if(user) {
                    let check = await bcrypt.compareSync(password, user.password)
                
                    if(check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Sai mật khẩu!';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'Không tìm thấy người dùng'
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = 'Email của bạn không tồn tại. Vui lòng nhập email khác'
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            
            let user = await db.User.findOne({ 
               where: {email: userEmail}
            
            })
            if(user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if(userId === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    }
                })
            } 
            if(userId && userId !== 'All') {
                users = await db.User.findOne({
                    where: {id: userId},
                    attributes: {
                        exclude: ['password'],
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Kiểm tra email có tồn tại không
            let check = await checkUserEmail(data.email);
            if(check === true) {
                resolve({
                    errCode: 1,
                    errMessage:'Email của bạn đã được sử dụng, vui lòng thử email khác'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
    
                resolve({
                    errCode: 0,
                    message:'Ok'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: {id: userId},
        })
        if(!foundUser) {
            resolve({
                errCode: 2,
                errMessage:'Người dùng không tồn tại'
            })
        }
        // if(foundUser) {
        //     await foundUser.destroy();
        // }
        await db.User.destroy({
            where: {id: userId},
        });
        resolve({
            errCode: 0,
            message: 'Người dùng đã bị xóa',
        })
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage:"Nhập chưa đủ các trường"
                })
            }
            let user = await db.User.findOne({
                where: {id: data.id},
                raw: false,
            })
            if(user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phonenumber = data.phonenumber;
                if(data.avatar){
                    user.image = data.avatar;
                }
                await user.save();
               
                resolve({
                    errCode: 0,
                    message:' Cập nhật người dùng thành công'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage:'Không tìm thấy người dùng!'
                });
            }
        } catch (err) {
            reject(err)
        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput}
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
}