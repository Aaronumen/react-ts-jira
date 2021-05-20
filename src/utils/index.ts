// 排除value为0的情况
import {useEffect, useState} from "react";

const isFalsy = (value: unknown) => value === 0 ? false : !value
// 改变原对象不好
export const cleanObject = (object: object) => {
    const result = {...object};
    Object.keys(object).forEach(key => {
        // @ts-ignore
        const value = result[key]
        if (isFalsy(value)) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result
}

export const useMount = ((callback: () => void) => {
    useEffect(() => {
        callback()
    }, [])
})
//防抖控制
export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedVale, setDebouncedValue] = useState(value)
    useEffect(() => {
        //设置一个新的定时器，每当value，delay改变的时候设置新的定时器，同时清除上一个定时器。
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        //每次在上一个useEffect处理完后，先清除上一个的定时器。
        return () => clearTimeout(timeout)
    }, [value, delay])
    return debouncedVale
}