import React, { useContext } from 'react';
import { useImmerReducer } from 'use-immer';


// 0、声明type ！！！
type userInfo = typeof init
type actionType = { type: 'update', pyload: string } | { type: 'INCREMENT', pyload: number } | { type: 'DECREMENT', pyload: number } | { type: 'RESET' }
type UserInfoContextType = { user: userInfo; dispatch: React.Dispatch<actionType> } 

const init = { name: 'zhangsan', age: 18 }


const reducer = (pre: userInfo, action: actionType) => {

    switch (action.type) {
        case "update":
            pre.name = action.pyload
            break;
        case 'INCREMENT':
            pre.age += action.pyload
            break;
        case 'DECREMENT':
            pre.age -= action.pyload
            break;
        case 'RESET':
            return initAction(init)
        default:
            return pre
    }
}

const initAction = (init: userInfo) => {
    return {
        ...init,
        age: Math.round(Math.abs(init.age)) || 18
    }
}

const ReduceContext = React.createContext<UserInfoContextType>({} as UserInfoContextType)
export const ReduceContextWrapper:React.FC<React.PropsWithChildren> = (props) => {
    const [state, dispatch] = useImmerReducer(reducer, init, initAction)

    return <ReduceContext.Provider value={{ user:state, dispatch }}>{ props.children}</ReduceContext.Provider>
}

const Son1: React.FC = () => {
    const { user,dispatch } = useContext(ReduceContext)
    const add = () => {
        dispatch({ type: 'INCREMENT', pyload: 1 })
    }
    return (
        <div className="son1">
            <button onClick={add}>年龄+1</button>
            {JSON.stringify(user)}
        </div>
    )
}

const Son2: React.FC = () => {
    const { user,dispatch } = useContext(ReduceContext)

    const dec = () => {
        dispatch({ type: 'DECREMENT', pyload: 2 })
    }

    return (
        <div className="son2">
            <button onClick={dec}>年龄-2</button>
            {JSON.stringify(user)}
            <hr />
            <GrandSon  />
        </div>
    )
}

const GrandSon: React.FC = () => {
    const { dispatch } = useContext(ReduceContext)

    const reSet = () => {
        dispatch({ type: 'RESET' })
    }

    return (
        <>
            <h3>GrandSon</h3>
            <button onClick={reSet}>重置</button>
        </>
    )
}

export const Father: React.FC = () => {
   
    const ctx = useContext(ReduceContext)

    const {user,dispatch} = ctx

    const change = () => {
        // 通过 dispatch 触发状态修改
        dispatch({ type: 'update', pyload: '柏庆辉' })
    }


    return (
        <>
            <button onClick={change}>修改用户名</button>
            <p> {JSON.stringify(user)} </p>
            <div className="father">
                <Son1 />
                <Son2 />
            </div>
        </>
    )
}