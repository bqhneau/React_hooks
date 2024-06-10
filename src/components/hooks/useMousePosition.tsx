import {useState,useEffect} from 'react'

export const useMousePosition = (delay:number=500) => {
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
            }, delay)
        }
        window.addEventListener('mousemove', handleMouse)

        return () => {
            window.removeEventListener('mousemove', handleMouse)
        }
    }, [])

    return position
}