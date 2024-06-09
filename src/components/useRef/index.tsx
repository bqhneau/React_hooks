import React, { useEffect, useRef, useState } from 'react'

// 1、获取 DOM 节点
export const InputFous:React.FC = () => {
    
    // 1、声明标识符
    const inputRef = useRef<HTMLInputElement>(null);
    // 2、使用标识获取节点
    const getFocus = () => {
        // 可选链操作符
        inputRef.current?.focus()
    }

    return (
        <>
            {/* 2、打标识 */}
            <input type="text" ref={ inputRef } />
            <button onClick={getFocus}>获取焦点</button>
        </>
    )
}

// 2、获取生命周期内的值[不使用ref]

// 【缺点】 变量全局污染
let pre:number
export const Counter: React.FC = () => {
    const [count, setCount] = useState(0)

    const update = () => {
        setCount(count + 1)
        pre = count
    }
    return (
        <>
            <h3>ref拿到旧值</h3>
            <p>新值：{ count }</p>
            <p>旧值：{ pre }</p>
            <button onClick={update}>加1</button>
        </>
    )
}

// 3、获取生命周期内的值
export const CounterRef: React.FC = () => {
    const [count, setCount] = useState(0)
    // 1、声明【只有在首次渲染时初始化】
    const pre = useRef<number>()

    const update = () => {
        setCount(count + 1)
        // 2、使用ref保存之前的数据
        pre.current = count
    }
    return (
        <>
            <h3>ref拿到旧值</h3>
            <p>新值：{count}</p>
            {/* 3、获取 */}
            <p>旧值：{pre.current }</p>
            <button onClick={update}>加1</button>
        </>
    )
}

/*
    4、注意事项
      (1) 组件 rerender 时 useRef 不会被重复初始化
      (2) ref.current 变化时不会造成组件的 rerender
      (3) ref.current 不能作为其它 Hooks 的依赖项
*/
export const Timer: React.FC = () => {
    const [count, setCount] = useState(0)
    const time = useRef(Date.now())

    /*
        useEffect 的执行时机
        1、初次渲染执行
        2、有依赖项，依赖项变化执行
        3、无依赖项，每次更新都执行
    */
    useEffect(() => {
        // 4、ref.current 不能作为其它 Hooks 的依赖项
        console.log('重新渲染');
    },[time.current])
    
    return (
        <>
            <p>count:{count}</p>
            {/* 2、useRef 不会重新初始化 */}
            <p>useRef：{time.current}</p>
            {/* 1、修改状态触发页面 rerender */}
            <button onClick={() => setCount(count + 1)}>reRender</button>
            {/* 3、ref.current 变化时不会造成组件的 rerender */}
            <button onClick={() => {
                time.current = Date.now()
                console.log(time.current);
            }}>修改ref</button>
        </>
    )
}

