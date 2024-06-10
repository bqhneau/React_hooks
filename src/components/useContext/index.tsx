import React, { useContext, useState } from 'react'

// 声明 TS 类型
type ContextType = { count: number; setCount: React.Dispatch<React.SetStateAction<number>> }

// 1、全局借助 createContext 创建 context 对象
const MyContext = React.createContext<ContextType>({} as ContextType)

export const LevelA: React.FC = () => {
    // 定义状态
    const [count, setCount] = useState(0)

    return (
        <div style={{ padding: 30, backgroundColor: 'lightblue', width: '50vw' }}>
            <h3>父组件</h3>
            <p>count值是：{count}</p>
            <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
            {/* 2、顶层组件注入 provider value */}
            <MyContext.Provider value={{ count, setCount }}>
                <LevelB />
            </MyContext.Provider>
        </div>
    )
}

export const LevelB: React.FC = () => {
    return (
        <div style={{ padding: 30, backgroundColor: 'lightgreen' }}>
            {/* 使用子组件 */}
            <h3>子组件</h3>
            <LevelC />
        </div>
    )
}

export const LevelC: React.FC = () => {
    // 3、接受组件使用 useContext 取值使用
    const ctx = useContext(MyContext)
    return (
        <div style={{ padding: 30, backgroundColor: 'lightsalmon' }}>
            <h3>孙子组件</h3>
            <p>count {ctx.count}</p>
            <button onClick={()=>ctx.setCount(ctx.count + 1)}>+1</button>
            <button onClick={()=>ctx.setCount(0)}>重置</button>
        </div>
    )
}