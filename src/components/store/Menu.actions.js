import { createAsyncThunk } from '@reduxjs/toolkit'

export const getAllMenuItems = createAsyncThunk(
    'menuList/getAllMenuItems',
    async () => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/Menu/getAllMenuItems`
            )
            const result = await res.json()
            return result
        } catch (err) {
            console.log(err)
        }
    }
)

export const getAllCoupons = createAsyncThunk(
    'menuList/getAllCoupons',
    async () => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/Coupon/getAllCouponItems`
            )

            const result = await res.json()
            return result
        } catch (err) {
            console.log(err)
        }
    }
)

export const getDiscountForJumbo = createAsyncThunk(
    'menuList/getDiscountForJumbo',
    async (data) => {
        const fetchData = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    success: true,
                    couponCode: data.code,
                    data: data.menu_items,
                }),
            }
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/Coupon/getCouponDiscount`,
                    requestOptions
                )
                const finalRes = res.json()
                return finalRes
            } catch (err) {
                console.debug(err, 'EEEEEERRRR')
            }
        }
        try {
            const res = await fetchData()
            return res
        } catch (error) {
            console.log(error.response)
            return error
        }
    }
)

export const SaveOrderDetails = createAsyncThunk(
    'menuList/SaveOrderDetails',

    async (data) => {
        const PostData = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    success: true,
                    data:data,
                }),
            }
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/Order/Save`,
                    requestOptions
                )
                const finalRes = res.json()
                if (finalRes.success) {
                    return 'Order placed successfully'
                } else {
                    return 'Please try after some time'
                }
            } catch (err) {
                console.debug(err, 'EEEEEERRRR')
            }
        }
        try {
            const res = await PostData()
            return res
        } catch (error) {
            console.log(error.response)
            return error
        }
    }
)
