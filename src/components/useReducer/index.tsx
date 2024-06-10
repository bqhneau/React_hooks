import React from 'react';
import {useImmerReducer} from 'use-immer';

// 0、声明type ！！！
type userInfo = typeof init
type actionType = { type: 'update', pyload: string } | { type: 'INCREMENT', pyload: number } | { type: 'DECREMENT', pyload: number } | { type: 'RESET'}

// 1、初始状态 init
const init = { name: 'zhangsan', age: 18 }

// 2、方法函数 reducer
// 参数1 初始值 
// 参数2 dispatch 传递的信息对象
const reducer = (pre: userInfo, action: actionType) => {
    // console.log('触发了reducer');
    // console.log('传递的信息对象', action);
    
    switch (action.type) {
        case "update":
            // 新对象 解除引用
            // return { ...pre, name: action.pyload }

            // 使用 immer
            pre.name = action.pyload
            break;
        case 'INCREMENT':
            // return { ...pre, age: pre.age + action.pyload }
            pre.age += action.pyload
            break;
        case 'DECREMENT':
            // return { ...pre, age: pre.age - action.pyload }
            pre.age -= action.pyload
            break;
        case 'RESET':
            return initAction(init)
        default:
            return pre
    }
}

// 3、处理初始状态 initAction
// 用来对初始状态进行【非法处理】
const initAction = (init:userInfo) => {
    return {
        ...init,
        age: Math.round(Math.abs(init.age)) || 18
    }
}


const Son1: React.FC<userInfo & { dispatch: React.Dispatch<actionType> }> = (props) => {
    const { dispatch } = props
    const add = () => {
        dispatch({type:'INCREMENT',pyload:1})
    }
    return (
        <div className="son1">
            <button onClick={add}>年龄+1</button>
            {JSON.stringify(props)}
        </div>
    )
}

const Son2: React.FC<userInfo & { dispatch: React.Dispatch<actionType> }> = (props) => {
    const {dispatch} = props
    
    const dec = () => {
        dispatch({type:'DECREMENT',pyload:2})
    }

    return (
        <div className="son2">
            <button onClick={dec}>年龄-2</button>
            {JSON.stringify(props)}
            <hr />
            <GrandSon dispatch={ dispatch } />
        </div>
    )
}

const GrandSon: React.FC<{ dispatch: React.Dispatch<actionType> }> = (props) => {
    const {dispatch} = props

    const reSet = () => {
        dispatch({type:'RESET'})
    }
    
    return (
        <>
            <h3>GrandSon</h3>
            <button onClick={reSet}>重置</button>
        </>
    )
}

export const Father: React.FC = () => {
    const [state, dispatch] = useImmerReducer(reducer, init, initAction)
    
    const change = () => {
        // 通过 dispatch 触发状态修改
        dispatch({type: 'update',pyload:'柏庆辉'})
    }
    
    
    return (
        <>
            <button onClick={change}>修改用户名</button>
            <p> { JSON.stringify(state) } </p>
            <div className="father">
                <Son1 {...state} dispatch={ dispatch} />
                <Son2 {...state} dispatch={ dispatch}/>
            </div>
        </>
    )
}