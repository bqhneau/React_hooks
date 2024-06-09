import React,{useEffect, useState} from 'react';

/*
    状态变化 ===> 函数组件重新渲染
    只有初次渲染时,useState才会执行
    当函数式组件被重新执行时，不会重复调用useState() 给数据赋初值，
    而是会复用上次的 state 值
*/
// 1、数值声明初始值
export const Count: React.FC = () => {
    const [count, setCount] = useState(0)
    
    const add = () => {
        setCount(count+1)
    }

    return (
        <>
            <h2>count：{ count }</h2>
            <button onClick={add}>点我加一</button>
        </>
    )
}

// 2、回调函数声明初始值
export const DataCom: React.FC = () => {
    const [data] = useState(() => {
        const data = new Date()
        return {
            year: data.getFullYear(),
            month: data.getMonth() + 1,
            day: data.getDate()
        }
    })

    return (
        <>
            <h3>当前时间</h3>
            <p>年份：{ data.year }年</p>
            <p>月份：{ data.month }月</p>
            <p>日期：{ data.day }日</p>
        </>
    )
}

// 3、useEffect 拿到最新的值
export const Count2: React.FC = () => {
    const [count, setCount] = useState(0)

    const add = () => {
        // 1、异步更新状态
        setCount(count + 1);
        // 所以此时拿不到新值
        console.log(count);  
    }

    // 2、借助 useEffect 拿到最新的值
    useEffect(() => {
        console.log('最新的值',count);   
    }, [count])
    
    return (
        <>
            <h2>count：{count}</h2>
            <button onClick={add}>点我加一</button>
        </>
    )
}

// 4、解决值更新不及时的 Bug
export const Count3: React.FC = () => {
    const [count, setCount] = useState(0)

    const add = () => {
        /*
            setCount(count + 1)
            setCount(count + 1)
            此时拿到的为 1 因为函数调用时是同步的，即传入的参数均为 0，
            更新是异步的，没有等到状态更新完调用
        */
        /*
            setState 更新值的两种方式
            1、setCount(新值)
            2、setCount((pre) => 基于pre计算并返回的新值)
        */ 
        setCount(count + 1)         // 1
        setCount((pre) => pre + 1)  // 2
    }

    return (
        <>
            <h2>count：{count}</h2>
            <button onClick={add}>点我加一</button>
        </>
    )
}

// 5、对象/数组值的更新
export const UserInfo: React.FC = () => {
    const [user , setUser] = useState({
        name: 'zhangsan',
        age: 18,
        gender:1
    })

    const update = () => {
        // 展开运算符 / Object.assign 解除引用
        setUser({
            ...user,
            name: 'lisi',
            age:20
        })
    }
    return (
        <>
            <h3>用户信息</h3>
            <p>姓名：{ user.name }</p>
            <p>年龄：{ user.age }</p>
            <p>性别：{user.gender}</p>
            <button onClick={update}>修改用户信息</button>
        </>
    )
}

// 6、模拟强制刷新
export const ForceUpdate: React.FC = () => {
    const [, forceUpdate] = useState({})
    const update = () => {
        forceUpdate({})
    }
    
    return (
        <>
            <h3>强制刷新</h3>
            <button onClick={update}>{ Date.now()}</button>
        </>
    )
}

