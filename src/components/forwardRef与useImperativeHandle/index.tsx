import React, { useImperativeHandle, useRef, useState } from 'react'


const Child = React.forwardRef((_props,ref) => {
    // 1、通过 React.forwardRef 包裹 使得可以拿到组件实例
    const [count, setCount] = useState(0)

    // 2、向外暴露指定的ref
    useImperativeHandle(ref, () => {
        console.log('useImperativeHandle重新执行');
        return {
            // 按需暴露
            count,
            setCount: (a: number) => {
                setCount(count + a)
            },
            // 在组件内部封装一个重置为 0 的函数，API 的粒度更小
            reset: () => setCount(0) 
        }
    },[])

    return(
        <h3> 子组件：{ count } </h3 >
    )
})

export const Father = () => {
    const ref = useRef<{ count: number, setCount:(value:number)=>void,reset:()=>void}>()
    
    return (
        <>
            <Child ref={ref} />
            <button onClick={() => {
                // 此时获取的为undefined 因为子组件中没有对ref处理
                console.log(ref.current); 
            }}>获取子组件</button>
            <button onClick={() => { ref.current?.setCount(2) }}>
                按需暴露
            </button>
            <button onClick={()=>{ref.current?.reset()}}>更小的粒度</button>
        </>
    )
}

