import {useState,useEffect} from 'react'

// 自定义 hooks 指定返回值类型
type useCountDown = (num?: number) => [number, boolean]

export const useCountDown:useCountDown = (num: number = 10) => {
    let seconds = Math.round(Math.abs(num)) || 10

    const [count, setCount] = useState(seconds)
    const [flag, setFlag] = useState(true)

    useEffect(() => {
        let timer = setInterval(() => {
            if (count > 1) {
                // 这里需要用【函数写法】 因为新值依赖旧值
                setCount(pre => pre - 1)
            } else {
                clearInterval(timer)
                setFlag(false)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [count])

    return [count,flag]
}