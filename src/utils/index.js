// 排除value为0的情况
const isFalsy =value=> value===0 ? false: !value
// 改变原对象不好
export const cleanObject=(object)=>{
    const result={...object};
    Object.keys(object).forEach(key=>{
        const value=result[key]
        if(isFalsy(value)){
            delete result[key]
        }
    })
    return result
}