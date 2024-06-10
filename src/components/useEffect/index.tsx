import { useEffect, useState } from "react"

// 1、基本使用 ===> 模拟更新和挂载
export const Counter = () => {
    // 在值改变时拿到页面内容

    const [count, setCount] = useState(0)
    const [flag] = useState(true)
    const update = () => {
        setCount(count => count + 1)
    }

    // 1、空数组 ===> 页面初始化时执行一次
    useEffect(() => {
        alert(document.querySelector('h3')?.innerText)
    }, [])

    // 2、非空数组 ===> 根据依赖项变化 执行
    useEffect(() => {
        alert(document.querySelector('p')?.innerText)
    }, [count])

    // 3、无依赖项 ===> 一直执行
    useEffect(() => {
        alert(document.querySelector('p')?.innerText)
    }, [flag])

    return (
        <>
            <h3>计数器</h3>
            <p>count:{count}</p>
            <button onClick={update}>变更值</button>
        </>
    )
}

// 2、基本使用 ===> 模拟发送请求
const ColorCom = () => {

    const [color, setColor] = useState('')

    // 发请求时，记得填依赖项[]
    useEffect(() => {
        const controller = new AbortController()

        // fetch 的基本使用
        fetch('https://api.liulongbin.top/v1/color', { signal: controller.signal })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setColor(res.data.color)
            })
            .catch((err) => {
                console.log(err.msg);

            })

        // 模拟清理操作
        return () => controller.abort()
    }, [])
    return (
        <>
            <p>color颜色是：{color}</p>
        </>
    )
}
export const TestColor = () => {
    const [flag, setFlag] = useState(true)

    return (
        <>
            <button onClick={() => { setFlag(!flag) }}>变更color</button>
            <hr />
            {/* 条件渲染 v-if：根据flag的值切换显隐 */}
            {flag && <ColorCom />}
        </>
    )
}

// 3、基本使用 ===> 模拟解绑事件监听
const Mouse:React.FC = () => {
    const [position, setPositon] = useState({ x: 0, y: 0 })

    useEffect(() => {
        // 添加节流操作
        let timer: null | NodeJS.Timeout = null
        
        const handleMouse = (e: MouseEvent) => {
            if (timer) return
            timer = setTimeout(() => {
                console.log(e.clientX, e.clientY);
                setPositon({ x: e.clientX, y: e.clientY })
                timer = null
            },500)
        }
        window.addEventListener('mousemove', handleMouse)

        return () => {
            window.removeEventListener('mousemove',handleMouse)
        }
    }, [])

    return (
        <>
            {/* 对象不能直接放到页面上 */}
            <h3>鼠标的位置{JSON.stringify(position)}</h3>
        </>
    )
}
export const TestMouse = () => {
    const [flag,setFlag] = useState(true)
    
    return (
        <>
            <button onClick={()=>{setFlag(!flag)}}>taggle</button>
            {flag && <Mouse />}
        </>
    )
}

// 4、自定义hooks ===> 获取鼠标位置
import {useMousePosition} from '@/components/hooks/useMousePosition';
export const OwnMouse = () => {
    // 指定延迟时间
    const position = useMousePosition(50)
    
    return (
        <>
            <h3>鼠标的位置{ JSON.stringify(position)}</h3>
        </>
    )
}

// 5、秒数倒计时
export const CountDown = () => {
    const [count, setCount] = useState(10)
    const [flag, setFlag] = useState(true)
    
    useEffect(() => {
        let timer = setInterval(() => {
            if (count > 1) {
                setCount(pre => pre-1)
            } else {
                clearInterval(timer)
                setFlag(false)
            }
        }, 1000)
        
        return () => clearInterval(timer)
    },[count])
    
    return (
        <>
            <button disabled={flag} onClick={() => {
                console.log('提交成功');
                
            }}>{flag?`请阅读此协议 ${count} 秒`:`点击提交`}</button>
        </>
    )
}

// 6、自定义hooks ===> 秒数倒计时
import { useCountDown } from '@/components/hooks/useCountDown';
export const OwnCountDown = () => {
    // 随意填数字
    const [count,flag]  = useCountDown(-3.2)

    return (
        <>
            <button disabled={flag} onClick={() => {
                console.log('提交成功');

            }}>{flag ? `请阅读此协议 ${count} 秒` : `点击提交`}</button>
        </>
    )
}