import actionTypes from "./actionTypes";
import { getAllCodeService, createNewUserService,
    getAllUsers, deleteUserService, editUserService,getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService,
    getAllSpecialty, getAllClinic} from "../../services/userService";
import {toast} from 'react-toastify'
import { compact } from "lodash";

//export const fetchGenderStart = () => ({
    //type: actionTypes.FETCH_GENDER_START
//})

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START})

            let res = await getAllCodeService("GENDER");
            if(res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e)
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchPositionStart = () => {
    return async(dispatch, getState) =>{
        try {
            let res = await getAllCodeService("POSITION");
            if( res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed())
            console.log('fetchPositionFailed error', e)
        }
    }
}
export const fetchRoleStart = () => {
    return async (dispath, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispath(fetchRoleSuccess(res.data));
            } else {
                dispath(fetchRoleFailed());
            }
        } catch (e) {
            dispath(fetchRoleFailed());
            console.log('fetchRoleFailed error', e)
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if(res && res.errCode === 0) {
                toast.success('Th??m ng?????i d??ng th??nh c??ng!')
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed())
            console.log('saveUserFailed Error', e)
        }
    }
}

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("All");
            if(res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
                console.log(res)
            } else {
                toast.error('Fetch all users error!');
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("Fetch all users error!");

            dispatch(fetchAllUsersFailed());
            console.log(e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if(res && res.errCode === 0) {
                toast.success('Xo?? ng?????i d??ng th??nh c??ng')
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                toast.error('X??a ng?????i d??ng th???t b???i!');
                dispatch(deleteUserFailed());
            }
        }  catch(e) {
            toast.error('X??a ng?????i d??ng th???t b???i!');
            dispatch(deleteUserFailed());
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})
export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("C???p nh???t ng?????i d??ng th??nh c??ng!");
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            } else {
                toast.success("C???p nh???t ng?????i d??ng th??nh c??ng!");
                dispatch(editUserFailed());
                dispatch(fetchAllUsersStart())
            }
        } catch (e) {
            toast.error('C???p nh???t ng?????i d??ng b??? l???i !');
            dispatch(editUserFailed());
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if(res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if(res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if(res && res.errCode === 0) {
                toast.success("L??u ng?????i d??ng th??nh c??ng!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                    dataDr: res.data
                })
            } else {
                toast.error("L??u ng?????i d??ng th???t b???i!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log('SAVE_DETAIL_DOCTOR_FAILED', e)
            toast.error("L??u ng?????i d??ng th???t b???i!");
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if(res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START})

            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if(resPrice && resPrice.errCode === 0 
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0) {
                    let data = {
                        resPrice: resPrice.data,
                        resPayment: resPayment.data,
                        resProvince: resProvince.data,
                        resSpecialty: resSpecialty.data,
                        resClinic: resClinic.data
                    }
                    dispatch(fetchRequiredDoctorInforSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log('GenderStart Error', e)
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
})