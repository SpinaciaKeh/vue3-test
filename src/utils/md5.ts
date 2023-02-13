import { Md5 } from 'ts-md5'

export const requestMd5 = (arr: any[]): string => {
    let str = ''
    for (let i = 0, length = arr.length; i < length; i++) {
        str += JSON.stringify(arr[i])
    }
    let newStr = Md5.hashStr(str)
    return newStr
}