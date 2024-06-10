import { useEffect, useState, useLayoutEffect } from "react"

// useEffect 页面渲染后状态改变 ===> 重新渲染 ==> 页面闪烁
export const RandomCount = () => {
    const [count, setCount] = useState(Math.random() * 10)
    
    // 页面渲染后状态改变 ===> 重新渲染 ==> 页面闪烁
    useEffect(() => {
        if (count == 0) {
            setCount(Math.random() * 10)
        }
    })
    
    return (
        <>
            <h3>num:{ count }</h3>
            <button onClick={()=>{setCount(0)}}>更改num</button>
        </>
    )
}

// useLayoutEffect 页面渲染前处理状态 ===> 页面不渲染
export const RandomCountLayout = () => {
    const [count, setCount] = useState(Math.random() * 10)

    // 页面渲染前处理状态 ===> 页面不渲染
    useLayoutEffect(() => {
        if (count == 0) {
            setCount(Math.random() * 10)
        }
    })

    return (
        <>
            <h3>num:{count}</h3>
            <button onClick={() => { setCount(0) }}>更改num</button>
        </>
    )
}