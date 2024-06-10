# 准备工作

## **步骤1：**

​	基于 Vite 创建 React + TypeScript 的项目，具体创建项目的步骤，请参考 Vite 官方文档。  

```shell
// 1、创建项目
npm create vite@latest

// 2、运行项目
cd react-hooks
  npm install
  npm run dev
```

## **步骤2：**

​	在 Vite 项目中配置 @ 路径提示：

### 2.1 安装 node 的类型声明：

```shell
npm i -D @types/node
```

### 2.2 配置 `vite.config.ts` 文件：

借助 `join` 函数和 `alias` 配置项，让项目认识 `@`

```ts
// 1. 以 ES6 模块化的方式，从 Node 的 path 模块中，导入 join 函数
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 2. 在 resolve.alias 对象下，配置 @ 的指向路径
  resolve: {
    alias: {
      '@': join(__dirname, './src/')
    }
  }
}) 
```

## **步骤3：**

配置 `tsconfig.json` 文件，在 `compilerOptions`  节点下，新增 `"baseUrl": "."` 和 `"paths": { "@/*": [ "src/*" ] }` 两项：

```ts
{
  "compilerOptions": {
    /* 新增以下两个配置项，分别是 baseUrl 和 paths */
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": [
      "ES2020",
      "DOM",
      "DOM.Iterable"
    ],
    "module": "ESNext",
    "skipLibCheck": true,
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": [
    "src"
  ],
  "references": [
    {
      "path": "./tsconfig.node.json"
    }
  ]
}
```


# useState

## 1. 基本用法  

**useState**，能让函数组件拥有自己的**状态**，因此，它是一个管理状态的 `hooks API`。通过 useState 可以实现状态的初始化、读取、更新。

**基本语法格式**如下：

```javascript
const [状态名, set函数] = useState(初始值)
```

**其中**：状态名所代表的数据，可以被函数组件使用；如果要修改状态名所代表的数据，需要调用 **set 函数** 进行修改。例如：

```ts
import { useState } from 'react' 
export function Count() { 
    // 定义状态 count，其初始值为 0 
    // 如果要修改 count 的值，需要调用 setCount(新值) 函数 
    const [count, setCount] = useState(0) 
    
    return ( 
        <> 
            <!-- 在函数组件内，使用名为 count 的状态 --> 
            <h1>当前的 count 值为：{count}</h1> 
            <!-- 点击按钮时，调用 setCount() 函数，为 count 赋新值 --> 
            <button onClick={() => setCount(count + 1)}>点我+1</button> 
		</> 
	) 
}
```

![](https://i0.hdslb.com/bfs/article/4adb9255ada5b97061e610b682b8636764fe50ed.png@progressive.webp)

## 2. 状态变化时，会触发函数组件的重新执行

在函数组件中使用 setState 定义状态之后，**每当状态发生变化，都会触发函数组件的重新执行**，从而根据最新的数据更新渲染 DOM 结构。

**例如：**

```ts
import { useState } from 'react' 
export function Count() { 
    // 定义状态 count，其初始值为 0 
    // 如果要修改 count 的值，需要调用 setCount(新值) 函数 
    const [count, setCount] = useState(0) 
    // 每次 count 值发生变化，都会打印下面的这句话： 
    console.log('组件被重新渲染了') 
    const add = () => { setCount(count + 1) } 
    return ( 
        <> 
            <!-- 在函数组件内，使用名为 count 的状态 --> 
            <h1>当前的 count 值为：{count}</h1> 
            <!-- 点击按钮时，在 add 处理函数中，调用 setCount() 函数，为 count 赋新值 --> 
            <button onClick={add}>+1</button> 
		</> 
	) 
}
```

> 注意：当函数式组件被重新执行时，**不会重复调用** `useState()` 给数据赋初值，而是会**复用**上次的 `state` 值。

![](https://i0.hdslb.com/bfs/article/4adb9255ada5b97061e610b682b8636764fe50ed.png@progressive.webp)

## 3. 以【函数】形式为状态赋初始值

在使用 useState 定义状态时，除了可以**直接给定初始值**，还可以通过**函数返回值**的形式，为状态赋初始值，语法格式如下：

```ts
const [value, setValue] = useState(() => 初始值)
```

**例如：**

```ts
export const DateCom: React.FC = () => { 
    // const [date] = useState({ year: 2023, month: 9, day: 11 }) 
    const [date, setDate] = useState(() => { 
        const dt = new Date() 
        return { 
            year: dt.getFullYear(), 
            month: dt.getMonth() + 1, 
            day: dt.getDate() 
        } 
    }) 
    
    return ( 
        <> 
        	<h1>今日信息：</h1> 
        	<p>年份：{date.year}年</p> 
			<p>月份：{date.month}月</p> 
			<p>日期：{date.day}日</p> 
		</> 
	) 
}
```

> 注意：以函数的形式为状态赋初始值时，只有组件首次被渲染才会执行 fn 函数；当组件被更新时，会以更新前的值作为状态的初始值，赋初始值的函数不会执行。

![](https://i0.hdslb.com/bfs/article/4adb9255ada5b97061e610b682b8636764fe50ed.png@progressive.webp)

## 4. useState 是异步变更状态的

调用 useState() 会返回一个**变更状态的函数**，这个函数内部是以**异步的形式**修改状态的，所以修改状态后**无法立即拿到最新的状态**，例如：

```ts
export const Count: React.FC = () => { 
    const [count, setCount] = useState(() => 0) 
    const add = () => { 
        // 1. 让数值自增+1 setCount(count + 1) 
        // 2. 打印 count 的值 console.log(count) } 
        return ( 
            <> 
            	<h1>当前的 count 值为：{count}</h1> 
    			<button onClick={add}>+1</button> 
    		</> 
    ) 
}
```

在上述代码的第8行，打印出来的 count 值是更新前的旧值，而非更新后的新值。证明 **useState** 是异步变更状态的。

![](https://i0.hdslb.com/bfs/article/4adb9255ada5b97061e610b682b8636764fe50ed.png@progressive.webp)

## 5. 结合 useEffect 监听状态的变化

为了能够监听到状态的变化，react 提供了 **useEffect** 函数。**它能够监听依赖项状态的变化，并执行对应的回调函数**。基本语法格式如下：

```ts
useEffect(() => { /* 依赖项变化时，要触发的回调函数 */ }, [依赖项])
```

例如：

```ts
export const Count: React.FC = () => { 
    const [count, setCount] = useState(() => 0) 
    const add = () => { setCount(count + 1) } 
    // 当 count 变化后，会触发 useEffect 指定的回调函数 
    useEffect(() => { 
        console.log(count) 
    }, [count]) 
    return ( 
        <> 
        	<h1>当前的 count 值为：{count}</h1> 
			<button onClick={add}>+1</button> 
		</> 
	) 
}
```

> 注意：useEffect 也是 React 提供的 Hooks API，后面的课程中会对它进行详细的介绍。

![](https://i0.hdslb.com/bfs/article/4adb9255ada5b97061e610b682b8636764fe50ed.png@progressive.webp)

## 6\. 注意事项  

### **6.1 更新对象/数组类型的值**

**知识回顾**：判断对象的值是否改变，看的是**地址**是否改变 

如果要更新对象类型的值，并触发组件的重新渲染，则必须使用**展开运算符**或 `Object.assign()` **生成一个新对象**，用新对象覆盖旧对象，才能正常触发组件的重新渲染。

**示例代码如下：**

```ts
export const UserInfo: React.FC = () => { 
    const [user, setUser] = useState({ 
        name: 'zs', 
        age: 12, 
        gender: '男' 
    }) 
    
    const updateUserInfo = () => { 
        user.name = 'Jesse Pinkman' 
        // 下面的写法是错误的，因为 set 函数内部，会对更新前后的值进行对比； 
        // 由于更新前后的 user，原值的引用和新值的引用相同， 
        // 所以 react 认为值没有发生变化，不会触发组件的重新渲染。 
        // setUser(user) 
        
        // 【解决方案】：用新对象的引用替换旧对象的引用，即可正常触发组件的重新渲染。 
        // 1、setUser({ ...user }) 
        // 2、setUser(Object.assign({}, user)) 
        
        // 通常在实际开发中，经常结合【展开运算符 + 属性值覆盖】的形式更新对象的属性值： 
        setUser({...user, name: 'Jesse Pinkman'}) } 
    return ( 
        <> 
        	<h1>用户信息：</h1> 
        	<p>姓名：{user.name}</p> 
			<p>年龄：{user.age}</p> 
			<p>性别：{user.gender}</p> 
			<button onClick={updateUserInfo}>更新用户信息</button> 
		</> 
	) 
}
```

### **6.2 解决值更新不及时的 Bug**

当连续多次以相同的操作更新状态值时，React 内部会对传递过来的新值进行比较，如果值相同，则会屏蔽后续的更新行为，从而防止组件频繁渲染的问题。这虽然提高了性能，但也带来了一个使用误区，例如：

```ts
export const Count: React.FC = () => { 
    const [count, setCount] = useState(() => 0) 
    const add = () => { 
        // 1. 希望让 count 值从 0 自增到 1 
        setCount(count + 1) 
        // 2. 希望让 count 值从 1 自增到 2 
        setCount(count + 1) 
    } 
    return ( 
        <> 
        	<h1>当前的 count 值为：{count}</h1> 
			<button onClick={add}>+1</button> 
		</> 
	) 
}
```

经过测试，我们发现上述代码执行的结果，只是让 count 从 0 变成了 1，最终的 count 值并不是 2。Why？  

因为 `setCount` 是异步地更新状态值的，所以前后两次调用 `setCount` 传递进去的新值都是 `1` 。React 内部如果遇到两次相同的状态，则会默认阻止组件再次更新。

为了解决上述的问题，我们可以使用**函数的方式**给状态赋新值。当函数执行时才通过函数的形参，拿到当前的状态值，并基于它返回新的状态值。

示例代码如下：

```ts
export const Count: React.FC = () => { 
    const [count, setCount] = useState(() => 0) 
    const add = () => { 
        // 传递了更新状态的函数进去 
        setCount((c) => c + 1) 
        setCount((c) => c + 1) } 
    return ( 
        <> 
        	<h1>当前的 count 值为：{count}</h1> 
			<button onClick={add}>+1</button> 
		</> 
	) 
}
```

> **【总结】setState 更新值的两种方式**
>
> ​    1、setCount(新值)
>
> ​    2、setCount((pre) => 基于pre计算并返回的新值)
>
> `小题tips`：当我们修改 state 时，如果新值依赖旧值，应选择第二种方式更新状态

### 6.3 使用 setState 模拟组件的强制刷新

在函数组件中，我们可以通过 `useState` 来**模拟 `forceUpdate` 的强制刷新操作**。因为只要 useState 的状态发生了变化，就会触发函数组件的重新渲染，从而达到强制刷新的目的。具体的代码示例如下：

```ts
export const FUpdate: React.FC = () => { 
    const [, forceUpdate] = useState({}) 
    // 每次调用 onRefresh 函数，都会给 forceUpdate 传递一个新对象 
    // 从而触发组件的重新渲染 
    const onRefresh = () => forceUpdate({}) 
    return ( 
        <> 
        	<button onClick={onRefresh}>点击强制刷新 --- {Date.now()}</button> 
		</> 
	) 
}
```

> 注意：因为每次传入的`对象的地址`不同，所以一定会使组件刷新。


# useRef

## 1\. useRef 的两个主要作用 

**useRef** 函数返回一个可变的 `ref` 对象，该对象只有一个 **`current`** 属性。可以在调用 useRef 函数时为其指定初始值。并且这个返回的 ref 对象在组件的整个生命周期内保持不变。

**语法格式**如下：

```ts
// 1. 导入 useRef
import { useRef } from 'react'
// 2. 调用 useRef 创建 ref 对象
const refObj = useRef(初始值)
// 3. 通过 ref.current 访问 ref 中存储的值
console.log(refObj.current)
```

useRef 函数用来解决以下两个问题：

> 1\. 获取 **DOM 元素**或**子组件**的实例对象；
> 
> 2\. 存储渲染周期之间**共享的数据**；

## 2. 获取 DOM 元素的实例

下面的代码演示了如何获取 Input 元素的实例，并调用其 DOM API：

```ts
import React, { useRef } from 'react'

export const InputFocus: React.FC = () => {
  // 1. 创建 ref 引用
  const iptRef = useRef<HTMLInputElement>(null)

  const getFocus = () => {
    // 3. 调用 focus API，让文本框获取焦点
    iptRef.current?.focus()
  }

  return (
    <>
      {/* 2. 绑定 ref 引用 */}
      <input type="text" ref={iptRef} />
      <button onClick={getFocus}>点击获取焦点</button>
    </>
  )
}
```

## 3. 存储渲染周期之间的共享数据

基于 **useRef** 创建名为 **prevCountRef** 的数据对象，用来存储上一次的旧 count 值。

每当点击按钮触发 count 自增时，都把最新的旧值赋值给 `prevCountRef.current` 即可：

```ts
export const Counter: React.FC = () => {
  // 默认值为 0
  const [count, setCount] = useState(0)

  // 默认值为 undefined
  const prevCountRef = useRef<number>()

  const add = () => {
    // 点击按钮时，让 count 值异步 +1
    setCount((c) => c + 1)
    // 同时，把 count 所代表的旧值记录到 prevCountRef 中
    prevCountRef.current = count
  }

  return (
    <>
      <h1>
        新值是：{count}，旧值是：{prevCountRef.current}
      </h1>
      <button onClick={add}>+1</button>
    </>
  )
}
```

## 4\. 注意事项  

> **【概述】**`useRef` 在使用时有以下**注意事项**
>
> ​	1、**`useRef`** 只有在初始化时会被渲染到页面，因 **`state`** 等情况导致页面再次刷新， **`useRef`** **不会重新初始化**
>
> ​	2、更改 **`useRef.current`** 的值，**不会使页面刷新**
>
> ​	3、**`react`** 不监听 **`useRef.current`** 的变化，所以不可将 **`useRef.current`** 作为其他 **`hooks`** 的**依赖数组**

### **4.1 组件 rerender 时 useRef 不会被重复初始化**

在 RefTimer 组件中，点击 +1 按钮，会让 count 值自增，从而触发 RefTimer 组件的 rerender。

但是，我们发现 RefTimer 组件中的时间戳保持不变，这说明**组件每次渲染，不会重复调用 useRef 函数进行初始化**。

示例代码如下：

```ts
export const RefTimer: React.FC = () => {
  const [count, setCount] = useState(0)
  const time = useRef(Date.now())

  console.log('组件被渲染了')

  return (
    <>
      <h3>
        count值是：{count}, 时间戳是：{time.current}
      </h3>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
    </>
  )
}
```

### **4.2 ref.current 变化时不会造成组件的 rerender**

点击给 ref 赋新值的按钮时，为 time.current 赋新值，执行的结果是：

> 1. 终端中输出了最新的 time.current 的值
> 
> 2. 没有触发 RefTimer 组件的 rerender

这证明了 ref.current 变化时不会造成组件的 rerender，示例代码如下：

```ts
export const RefTimer: React.FC = () => {
  const [count, setCount] = useState(0)
  const time = useRef(Date.now())

  const updateTime = () => {
    time.current = Date.now()
    console.log(time.current)
  }

  console.log('组件被渲染了')

  return (
    <>
      <h3>
        count值是：{count}, 时间戳是：{time.current}
      </h3>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={updateTime}>给ref赋新值</button>
    </>
  )
}
```

### **4.3 ref.current 不能作为其它 Hooks 的依赖项**  

由于 **`ref.current`** 值的变化不会造成组件的 **`rerender`**，而且 **React 也不会跟踪 `ref.current` 的变化**，因此 **`ref.current`** 不可以作为其它 **`hooks（useMemo、useCallback、useEffect 等）`** 的依赖项。

```ts
export const RefTimer: React.FC = () => {
  const [count, setCount] = useState(0)
  const time = useRef(Date.now())

  const updateTime = () => {
    time.current = Date.now()
    console.log(time.current)
  }

  console.log('组件被渲染了')

  useEffect(() => {
    console.log('time 的值发生了变化：' + time.current)
  }, [time.current])

  return (
    <>
      <h3>
        count值是：{count}, 时间戳是：{time.current}
      </h3>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={updateTime}>给ref赋新值</button>
    </>
  )
}
```

> 【总结】
>
> ​	1、在上面的代码中，组件首次渲染完成后，必然会触发一次 **`useEffect`** 的执行。
>
> ​	2、但是，当 **`time.current`** 发生变化时，并不会触发 useEffect 的重新执行。因此，不能把 **`ref.current`** 作为其它 **`hooks`** 的依赖项。


# useEffect

## 1. 什么是函数的副作用

函数的副作用就是函数**除了返回值外**对**外界环境**造成的**其它影响**，即与组件渲染无关的操作。例如**获取数据**、**修改全局变量**、**更新 DOM** 等。

> 1、**获取数据**
>
> 2、**修改全局变量**
>
> 3、**更新 DOM**

useEffect 是 React 中的 hooks API。通过 useEffect 可以执行一些副作用操作，例如：请求数据、事件监听等。它的语法格式如下：

```ts
useEffect(fn, deps?)
```

其中：

1\. 第一个参数 **fn** 是一个副作用函数，该函数会在**每次渲染完成之后**被调用；

2\. 第二个参数是**可选的依赖项数组**，这个数组中的每一项内容都会被用来进行**渲染前后的对比**

        a. 当依赖项发生变化时，会重新执行 fn 副作用函数

        b. 当依赖项没有任何变化时，则不会执行 fn 副作用函数

## 2. useEffect 的执行时机

> useEffect(fn)
>
>   \1. 初次渲染时执行
>
>   \2. 如果省略了依赖项的数组，则 useEffect 中的副作用函数，会在组件每次更新渲染完毕都执行
>
>   \3. 如果为 useEffect 指定了依赖项的数组，则 useEffect 中的副作用函数，会在组件每次渲染完毕之后，判断依赖项是否变化，再决定是否执行副作用函数
>
>   \4. 如果为 useEffect 指定了空的依赖项数组，则 useEffect 中的副作用函数，仅在组件首次渲染完毕之后，执行唯一的一次

### 2.1 没有依赖项

如果没有为 useEffect 指定依赖项数组，则 Effect 中的副作用函数，会在函数组件**每次**渲染**完成后**执行。例如，我们在下面的代码中，基于 useEffect 获取 h1 元素最新的 innerText：

```ts
import React, { useEffect, useState } from 'react'

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0)

  // 注意：这里每次输出的都是上一次的【旧值】
  // console.log(document.querySelector('h1')?.innerHTML)

  const add = () => {
    setCount((prev) => prev + 1)
  }

  // 在组件每次渲染完成之后，都会重新执行 effect 中的回调函数
  useEffect(() => {
      // 在此处拿到最新 state
    console.log(document.querySelector('h1')?.innerHTML)
  })

  return (
    <>
      <h1>count 值为：{count}</h1>
      <button onClick={add}>+1</button>
    </>
  )
}
```

### 2.2 deps 为空数组（componentDidMount）

如果为 useEffect 指定了一个**空数组 \[\]** 作为 deps 依赖项，则副作用函数只会在组件**首次渲染**完成后执行**仅此一次**。

当组件 rerender 的时候不会触发副作用函数的重新执行。例如下面的代码中，useEffect 中的 console.log() 只会执行1次：

```ts
import React, { useEffect, useState } from 'react'

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0)

  const add = () => {
    setCount((prev) => prev + 1)
  }

  // 仅在组件首次渲染完成后，会执行 effect 中的回调函数
  useEffect(() => {
    console.log(document.querySelector('h1')?.innerHTML)
  }, [])

  return (
    <>
      <h1>count 值为：{count}</h1>
      <button onClick={add}>+1</button>
    </>
  )
}
```

### 2.3 deps 为依赖项数组（componentDidUpdate）

如果想**有条件地**触发副作用函数的**重新执行**，则需要通过 deps 数组指定**依赖项列表**。

React 会在组件每次渲染完成后，对比渲染前后的每一个依赖项是否发生了变化，只要任何一个依赖项发生了变化，都会触发副作用函数的重新执行。否则，如果所有依赖项在渲染前后都没有发生变化，则不会触发副作用函数的重新执行。

下面的例子演示了依赖项的使用：只有当 **count** 值发生变化时，才会触发 **effect** 回调函数的重新执行，**flag** 值的变化不会触发：

```ts
import React, { useEffect, useState } from 'react'

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  const add = () => {
    setCount((prev) => prev + 1)
  }

  // 在组件每次渲染完成后，如果 count 值发生了变化，则执行 effect 中的回调
  // 其它状态的变化，不会导致此回调函数的重新执行
  useEffect(() => {
    console.log(document.querySelector('h1')?.innerHTML)
  }, [count])

  return (
    <>
      <h1>count 值为：{count}</h1>
      <p>flag 的值为：{String(flag)}</p>
      <button onClick={add}>+1</button>
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
    </>
  )
}
```

> 注意：**不建议**把**对象**作为 useEffect 的**依赖项**，因为 React 使用 **`Object.is()`** 来判断依赖项是否发生变化。

## 3. 如何清理副作用（componentBeforeDestory）

useEffect 可以返回一个函数，用于清除副作用的回调。语法格式如下：

```ts
useEffect(() => {
  // 1. 执行副作用操作
  // 2. 返回一个清理副作用的函数
  return () => { /* 在这里执行自己的清理操作 */ }
}, [依赖项])

// 简写方式
useEffect(() => () => { 
    /* 在这里执行自己的清理操作 */ 
}, [依赖项])
```

> 实际应用场景：如果当前组件中使用了**定时器**或绑定了**事件监听程序**，可以在返回的函数中清除定时器或解绑监听程序。  
>
> ​	1、清理 **Ajax** 请求或者 **定时器**
>
> ​	2、解绑**事件监听**

### 3.1 组件卸载时终止未完成的 Ajax 请求

在**父组件 `TestRandomColor`** 中，使用布尔值 **flag** 控制子组件 **RandomColor** 的展示与隐藏：

```ts
export const TestRandomColor: React.FC = () => {
  const [flag, setFlag] = useState(true)

  return (
    <>
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
      <hr />
      {flag && <RandomColor />}
    </>
  )
}
```

在**子组件 `RandomColor`** 中，通过 **`useEffect(fn, \[\])`** 声明一个副作用函数，该副作用函数仅在组件首次渲染完毕后执行。在该副作用函数中，基于 fetch API 请求数据，并且在清理函数中使用 **`AbortController`** 对象自动终止未完成的 Ajax 请求。示例代码如下：

```ts
const RandomColor: React.FC = () => {
  const [color, setColor] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch('https://api.liulongbin.top/v1/color', { signal: controller.signal })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setColor(res.data.color)
      })
      .catch((err) => console.log('消息：' + err.message))

    // return 清理函数
    // 清理函数触发的时机有两个：
    // 1. 组件被卸载的时候，会调用
    // 2. 当 effect 副作用函数被再次执行之前，会先执行清理函数
    return () => controller.abort()
  }, [])

  return (
    <>
      <p>color 的颜色值是：{color}</p>
    </>
  )
}
```

### 3.2 获取鼠标在网页中移动时的位置

示例代码如下，先声明一个 **MouseInfo** 的子组件，用来监听鼠标的移动并打印鼠标的位置：

```ts
const MouseInfo: React.FC = () => {
  // 记录鼠标的位置
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // 副作用函数
  useEffect(() => {
    // 1. 要绑定或解绑的 mousemove 事件处理函数
    const mouseMoveHandler = (e: MouseEvent) => {
      console.log({ x: e.clientX, y: e.clientY })
      setPosition({ x: e.clientX, y: e.clientY })
    }

    // 2. 组件首次渲染完毕后，为 window 对象绑定 mousemove 事件
    window.addEventListener('mousemove', mouseMoveHandler)

    // 3. 返回一个清理的函数，在每次组件卸载时，为 window 对象解绑 mousemove 事件
    return () => window.removeEventListener('mousemove', mouseMoveHandler)
  }, [])

  return (
    <>
      <p>鼠标的位置：{JSON.stringify(position)}</p>
    </>
  )
}
```

再声明一个 **TestMouseInfo** 的父组件，通过布尔值 flag 控制子组件 **MouseInfo** 的显示或隐藏：

```ts
export const TestMouseInfo: React.FC = () => {
  // 定义布尔值 flag，控制子组件的显示或隐藏
  const [flag, setFlag] = useState(true)

  return (
    <>
      <h3>父组件</h3>
      {/* 点击按钮，切换 flag 的值 */}
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
      <hr />
      {flag && <MouseInfo />}
    </>
  )
}
```

#### 获取鼠标位置节流版

在子组件 MouseInfo 中引入定时器 setTimeOut ，父组件 TestMouseInfo 不变

```ts
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
```

## 4. 自定义封装鼠标位置的 hook

在 src 目录下新建 hooks/index.ts 模块，并把刚才获取鼠标位置的代码封装成名为 useMousePosition 的自定义 hook，代码如下：

```ts
import { useState, useEffect } from 'react'

export const useMousePosition = () => {
  // 记录鼠标的位置
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // 副作用函数
  useEffect(() => {
    // 1. 要绑定或解绑的 mousemove 事件处理函数
    const mouseMoveHandler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    // 2. 组件首次渲染完毕后，为 window 对象绑定 mousemove 事件
    window.addEventListener('mousemove', mouseMoveHandler)

    // 3. 返回一个清理的函数，在每次组件卸载时，为 window 对象解绑 mousemove 事件
    return () => window.removeEventListener('mousemove', mouseMoveHandler)
  }, [])

  return position
}
```

在 **MouseInfo** 组件中，可以导入自己封装的 hook 进行使用：

```ts
import { useMousePosition } from '@/hooks/index.ts'

const MouseInfo: React.FC = () => {
  // 调用自定义的 hook，获取鼠标的位置信息
  const position = useMousePosition()

  return (
    <>
      <!-- 输出鼠标的位置信息 -->
      <p>鼠标的位置：{JSON.stringify(position)}</p>
    </>
  )
}
```

在 TestMouseInfo 组件中，也可以导入自己封装的 hook 进行使用：

```ts
import { useMousePosition } from '@/hooks/index.ts'

export const TestMouseInfo: React.FC = () => {
  const [flag, setFlag] = useState(true)
  // 调用自定义的 hook，获取鼠标的位置信息
  const position = useMousePosition()

  return (
    <>
      <!-- 输出鼠标的位置信息 -->
      <h3>父组件 {position.x + position.y}</h3>
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
      <hr />
      {flag && <MouseInfo />}
    </>
  )
}
```

## 5. 自定义封装秒数倒计时的 hook

> #### 功能分析：
>
> ​	1、用户调用 **`useCountDown(5)`** 的 hook，可以传递倒计时的秒数，如果未指定秒数则**默认值**为 `10` 秒
>
> ​	2、在 **`useCountDown`** 中，需要对用户传递进行来的数字进行**非法值的判断和处理**（处理负数、小数、0）
>
> ​	3、每隔1秒让秒数 \-1，并使用一个**布尔值**记录按钮是否被禁用
>
> ​	4、以数组的形式，向外返回每次的秒数和当前的禁用状态，例如 **`return \[count, disabled\]`**

最终，用户可以按照如下的方式，使用我们封装的 `useCountDown hook`：

```ts
import React from 'react'
// 1. 导入自定义的 hook
import { useCountDown } from '@/hooks/index.ts'

export const CountDown: React.FC = () => {
  // 2. 调用自定义的 hook
  const [count, disabled] = useCountDown(3)

  return (
    <>
      <!-- 3. 展示倒计时的秒数，并控制按钮的禁用状态 -->
      <button disabled={disabled} onClick={() => console.log('协议生效！')}>
        {disabled ? `请仔细阅读本协议内容（${count} 秒）` : '确认此协议'}
      </button>
    </>
  )
}
```

接下来，我们可以在 src/hooks/index.ts 模块中，封装名为 useCountDown 的自定义 hook。具体代码如下：

```ts
import { useState, useEffect } from 'react'

// TS 类型
type UseCountDown = (seconds: number) => [number, boolean]

export const useCountDown: UseCountDown = (seconds = 10) => {
  // 对外界传递的数值进行【非法值处理】：
  // 1. 先求绝对值
  // 2. 再对小数进行四舍五入
  // 3. 如果处理的结果为数字 0，则将默认值设为 10
  seconds = Math.round(Math.abs(seconds)) || 10

  // 计数器
  const [count, setCount] = useState(seconds)
  // 倒计时是否结束 disabled 为 false 表示结束，为 true 表示未结束
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (count > 1) {
          // 这里需要用【函数写法】 因为新值依赖旧值
        setCount((prev) => prev - 1)
      } else {
        setDisabled(false)
      }
    }, 1000)

    // 返回清理函数，再次执行 useEffect 的副作用函数之前，先运行上次 return 的清理函数
    return () => clearTimeout(timerId)
  }, [count])

  // 返回 count 和 disabled 供组件使用
  // 1. count 用来显示倒计时的秒数
  // 2. disabled 用来控制按钮是否禁用 Or 倒计时是否结束
  return [count, disabled]
}
```

## 6. useEffect 的使用注意事项

1\. 不要在 **`useEffect`** 中改变**依赖项**的值，会造成死循环。

2\. 多个不同功能的副作用尽量**分开声明**，不要写到一个 **`useEffect`** 中。


# useReducer

当**状态更新逻辑较复杂**时可以考虑使用 useReducer。useReducer 可以同时更新多个状态，而且能把对状态的修改从组件中独立出来。

相比于 useState，useReducer 可以更好的描述“如何更新状态”。例如：组件负责发出行为，useReducer 负责更新状态。

好处是：**让代码逻辑更清晰，代码行为更易预测**。

## 1. useReducer 的语法格式

useReducer 的**基础语法**如下：

```ts
const [state, dispatch] = useReducer(reducer, initState, initAction?)
```

其中：

1\. **reducer** 是一个函数，类似于 (prevState, action) => newState。形参 prevState 表示旧状态，形参 action 表示本次的行为，返回值 newState 表示处理完毕后的新状态。

2\. **initState** 表示**初始状态**，也就是默认值。

3\. **initAction** 是进行状态初始化时候的**处理函数**，它是可选的，如果提供了 initAction 函数，则会把 initState 传递给 initAction 函数进行处理，initAction 的返回值会被当做初始状态。

4\. 返回值 state 是状态值。dispatch 是更新 state 的方法，让他接收 action 作为参数，useReducer 只需要调用 dispatch(action) 方法传入的 action 即可更新 state。

## 2. 定义组件的基础结构

定义名为 Father 的父组件如下：

```ts
import React from 'react'

// 父组件
export const Father: React.FC = () => {
  return (
    <div>
      <button>修改 name 的值</button>
      <div className="father">
        <Son1 />
        <Son2 />
      </div>
    </div>
  )
}
```

定义名为 Son1 和 Son2 的两个子组件如下：

```ts
// 子组件1
const Son1: React.FC = () => {
  return <div className="son1"></div>
}

// 子组件2
const Son2: React.FC = () => {
  return <div className="son2"></div>
}
```

在 index.css 中添加对应的样式：

```css
.father {
  display: flex;
  justify-content: space-between;
  width: 100vw;
}

.son1 {
  background-color: orange;
  min-height: 300px;
  flex: 1;
  padding: 10px;
}

.son2 {
  background-color: lightblue;
  min-height: 300px;
  flex: 1;
  padding: 10px;
}
```

## 3. 定义 useReducer 的基础结构

1、按需导入 useReducer 函数：

```ts
import React, { useReducer } from 'react'
```

2、定义**初始数据**：

```ts
const defaultState = { name: 'liulongbin', age: 16 }
```

3、定义 **`reducer`** 函数，它的**作用**是：**根据旧状态，进行一系列处理，最终返回新状态**：

```ts
// 第一个参数永远是上一次的旧状态
const reducer = (prevState) => {
  // 首次进入页面 不会触发 reducer 函数执行
  console.log('触发了 reducer 函数')
  // 必须向外返回一个处理好的新状态 
  return prevState
}
```

4、在 `Father` 组件中，调用 `useReducer(reducerFn, 初始状态)` 函数，并得到 `reducer` 返回的状态：

```ts
// 父组件
export const Father: React.FC = () => {
  // useReducer(fn, 初始数据, 对初始数据进行处理的fn)
  const [state] = useReducer(reducer, defaultState)
  console.log(state)

  return (
    <div>
      <button>修改 name 的值</button>
      <div className="father">
        <Son1 />
        <Son2 />
      </div>
    </div>
  )
}
```

5、为 `reducer` 中的 `initState` 指定数据类型：

```ts
// 定义状态的数据类型
type UserType = typeof defaultState

const defaultState = { name: 'liulongbin', age: 16 }

// 给 initState 指定类型为 UserType
const reducer = (prevState: UserType) => {
  console.log('触发了 reducer 函数')
  return prevState
}
```

6、接下来，在 Father 组件中使用 state 时，就可以出现类型的**智能提示**啦：

```ts
// 父组件
export const Father: React.FC = () => {
  const [state] = useReducer(reducer, defaultState)
  console.log(state.name, state.age)

  return (
    <div>
      <button>修改 name 的值</button>
      <div className="father">
        <Son1 />
        <Son2 />
      </div>
    </div>
  )
}
```

## 4. 使用 initAction 处理初始数据

定义名为 `initAction` 的处理函数，如果初始数据中的 age 为小数、负数、或 0 时，对 age 进行**非法值**的处理：

```ts
const initAction = (initState: UserType) => {
  // 把 return 的对象，作为 useReducer 的初始值
  return { ...initState, age: Math.round(Math.abs(initState.age)) || 18 }
}
```

在 `Father` 组件中，使用步骤1声明的 `initAction` 函数如下：

```ts
// 父组件
export const Father: React.FC = () => {
  // useReducer(fn, 初始数据, 对初始数据进行处理的fn)
  const [state] = useReducer(reducer, defaultState, initAction)

  // 省略其它代码...
}
```

> 在定义 defaultState 时，为 age 提供非法值，可以看到非法值在 initAction 中被处理掉了。  

## 5. 在 Father 组件中点击按钮修改 name 的值

### **1\. 错误示范：**  

不要像 **vue** 响应式数据一样，直接通过 `state.name = 'escook'` 去修改

```ts
// 父组件
export const Father: React.FC = () => {
  // useReducer(fn, 初始数据, 对初始数据进行处理的fn)
  const [state] = useReducer(reducer, defaultState, initAction)
  console.log(state)

  const onChangeName = () => {
    // 注意：这种用法是错误的，因为不能【直接修改 state 的值】
    // 因为存储在 useReducer 中的数据都是“不可变”的！
    // 要想修改 useReducer 中的数据，必须触发 【reducer】 函数的重新计算，
    // 根据 reducer 形参中的旧状态对象（initState），经过一系列处理，返回一个“全新的”状态对象
    state.name = 'escook'
  }

  return (
    <div>
      <button onClick={onChangeName}>修改 name 的值</button>
      <div className="father">
        <Son1 />
        <Son2 />
      </div>
    </div>
  )
}
```

### **2\. 正确的操作**  

为了能够触发 reducer 函数的重新执行，我们需要在调用 useReducer() 后接收返回的 dispatch 函数。示例代码如下：

```ts
// Father 父组件 
const [state, dispatch] = useReducer(reducer, defaultState, initAction)
```

在 button 按钮的点击事件处理函数中，调用 dispatch() 函数，从而触发 reducer 函数的重新计算：

```ts
// Father 父组件 
const onChangeName = () => { 
    dispatch() 
}
```

点击 Father 组件中如下的 button 按钮：

```ts
<button onClick={onChangeName}>修改 name 的值</button>
```

会触发 reducer 函数的重新执行，并打印 reducer 中的 console.log()，代码如下：

```ts
const reducer = (prevState: UserType) => {
  console.log('触发了 reducer 函数')
  return prevState
}
```

### **3. 调用 dispatch 传递参数给 reducer**

在 Father 父组件按钮的点击事件处理函数 onChangeName 中，调用 **dispatch()** 函数并把参数传递给 **reducer** 的第2个形参，代码如下：

```ts
const onChangeName = () => {
  // 注意：参数的格式为 { type, payload? }
  // 其中：
  // type 的值是一个唯一的标识符，用来【指定本次操作的类型】，一般为大写的字符串
  // payload 是本次操作需要用到的数据，为可选参数。在这里，payload 指的是把用户名改为字符串 '刘龙彬'
  dispatch({type: 'UPDATE_NAME', payload: '刘龙彬'})
}
```

修改 reducer 函数的形参，添加名为 `action` 的第2个形参，**用来接收 dispatch 传递过来的数据**：

```ts
const reducer = (prevState: UserType, action) => {
  // 打印 action 的值，终端显示的值为：
  // {type: 'UPDATE_NAME', payload: '刘龙彬'}
  console.log('触发了 reducer 函数', action)
  return prevState
}
```

在 reducer 中，根据接收到的 `action.type` 标识符，**决定进行怎样的更新操作**，最终 return 一个计算好的新状态。示例代码如下：

```ts
const reducer = (prevState: UserType, action) => {
  console.log('触发了 reducer 函数', action)
  // return prevState

  switch (action.type) {
    // 如果标识符是字符串 'UPDATE_NAME'，则把用户名更新成 action.payload 的值
    // 最后，一定要返回一个新状态，因为 useReducer 中每一次的状态都是“不可变的”
    case 'UPDATE_NAME':
      return { ...prevState, name: action.payload }   // 解除引用，赋予新对象
    // 兜底操作：
    // 如果没有匹配到任何操作，则默认返回上一次的旧状态
    default:
      return prevState
  }
}
```

### 4、为 action 指定类型

在上述的 `switch...case...` 代码期间，没有 `TS` 的类型提示，这在大型项目中是致命的。因此，我们需要为 `reducer` 函数的第2个形参 **`action`** 指定操作的类型：

```ts
// 1. 定义 action 的类型
type ActionType = { type: 'UPDATE_NAME'; payload: string }

// 2. 为 action 指定类型为 ActionType
const reducer = (prevState: UserType, action: ActionType) => {
  console.log('触发了 reducer 函数', action)

  // 3. 删掉之前的代码，再重复编写这段逻辑的时候，会出现 TS 的类型提示，非常 Nice
  switch (action.type) {
    case 'UPDATE_NAME':
      return { ...prevState, name: action.payload }
    default:
      return prevState
  }
}
```

同时，在 `Father` 组件的 `onChangeName` 处理函数内，调用 `dispatch()` 时也有了**类型提示**：

```ts
const onChangeName = () => {
  dispatch({ type: 'UPDATE_NAME', payload: '刘龙彬' })
}
```

> **注意**：在今后的开发中，正确的顺序是
>
> ​	1、先定义 `ActionType` 的类型
>
> ​	2、修改 `reducer` 中的 `switch...case...` 逻辑
>
> ​	3、在组件中调用 `dispatch()` 函数！这样能够充分利用 TS 的类型提示。  

## 6. 把用户信息渲染到子组件中

1、在 Father 父组件中，通过**jsx展开语法**把 `state` 数据对象绑定为 `Son1` 和 `Son2` 的 `props` 属性：

```ts
// 父组件
export const Father: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, defaultState, initAction)

  const onChangeName = () => {
    dispatch({ type: 'UPDATE_NAME', payload: '刘龙彬' })
  }

  return (
    <div>
      <button onClick={onChangeName}>修改 name 的值</button>
      <div className="father">
        <!-- 通过 props 的数据绑定，把数据传递给子组件 -->
        <Son1 {...state} />
        <Son2 {...state} />
      </div>
    </div>
  )
}
```

2、在子组件中，指定 `props` 的类型为 `React.FC<UserType>`，并使用 `props` 接收和渲染数据：

```ts
// 子组件1
const Son1: React.FC<UserType> = (props) => {
  return (
    <div className="son1">
      <p>用户信息：</p>
      <p>{JSON.stringify(props)}</p>
    </div>
  )
}

// 子组件2
const Son2: React.FC<UserType> = (props) => {
  return (
    <div className="son2">
      <p>用户信息：</p>
      <p>{JSON.stringify(props)}</p>
    </div>
  )
}
```

> 修改完成后，点击父组件中的 button 按钮修改用户名，我们发现两个子组件中的数据同步发生了变化。  

## 7. 在子组件中实现点击按钮 age 自增操作  

1、扩充 `ActionType` 的类型如下：

```ts
// 定义 action 的类型 
type ActionType = { type: 'UPDATE_NAME'; payload: string } | { type: 'INCREMENT'; payload: number }
```

2、在 `reducer` 中添加 `INCREMENT` 的 `case` 匹配：

```ts
const reducer = (prevState: UserType, action: ActionType) => {
  console.log('触发了 reducer 函数', action)

  switch (action.type) {
    case 'UPDATE_NAME':
      return { ...prevState, name: action.payload }
    // 添加 INCREMENT 的 case 匹配
    case 'INCREMENT':
      return { ...prevState, age: prevState.age + action.payload }
    default:
      return prevState
  }
}
```

3、在子组件 `Son1` 中添加 `+1` 的 `button` 按钮，并绑定点击事件处理函数：

```ts
// 子组件1
const Son1: React.FC<UserType> = (props) => {
  const add = () => {}

  return (
    <div className="son1">
      <p>用户信息：</p>
      <p>{JSON.stringify(props)}</p>
      <button onClick={add}>+1</button>
    </div>
  )
}
```

4、现在的问题是：子组件 `Son1` 中无法调用到父组件的 `dispatch` 函数。

为了解决这个问题，我们需要在 `Father` 父组件中，通过 `props` 把父组件中的 `dispatch` 传递给子组件：

```ts
// 父组件
export const Father: React.FC = () => {
  // useReducer(fn, 初始数据, 对初始数据进行处理的fn)
  const [state, dispatch] = useReducer(reducer, defaultState, initAction)

  const onChangeName = () => {
    dispatch({ type: 'UPDATE_NAME', payload: '刘龙彬' })
  }

  return (
    <div>
      <button onClick={onChangeName}>修改 name 的值</button>
      <div className="father">
        <Son1 {...state} dispatch={dispatch} />
        <Son2 {...state} />
      </div>
    </div>
  )
}
```

5、在 `Son1` 子组件中，扩充 `React.FC<UserType>` 的类型，并从 `props` 中把 **`dispatch`** 和**用户信息对象**分离出来：

```ts
// 子组件1
const Son1: React.FC<UserType & { dispatch: React.Dispatch<ActionType> }> = (props) => {
  const { dispatch, ...user } = props

  const add = () => dispatch({ type: 'INCREMENT', payload: 1 })

  return (
    <div className="son1">
      <p>用户信息：</p>
      <p>{JSON.stringify(user)}</p>
      <button onClick={add}>+1</button>
    </div>
  )
}
```

## 8. 在子组件中实现点击按钮 age 自减操作

扩充 ActionType 的类型如下：

```ts
// 定义 action 的类型 
type ActionType = { type: 'UPDATE_NAME'; payload: string } | { type: 'INCREMENT'; payload: number } | { type: 'DECREMENT'; payload: number }
```

在 reducer 中添加 DECREMENT 的 case 匹配：

```ts
const reducer = (prevState: UserType, action: ActionType) => {
  console.log('触发了 reducer 函数', action)

  switch (action.type) {
    case 'UPDATE_NAME':
      return { ...prevState, name: action.payload }
    case 'INCREMENT':
      return { ...prevState, age: prevState.age + action.payload }
    // 添加 DECREMENT 的 case 匹配
    case 'DECREMENT':
      return { ...prevState, age: prevState.age - action.payload }
    default:
      return prevState
  }
}
```

在子组件 Son2 中添加 \-5 的 button 按钮，并绑定点击事件处理函数：

```ts
// 子组件2
const Son2: React.FC<UserType> = (props) => {
  const sub = () => { }

  return (
    <div className="son2">
      <p>用户信息：</p>
      <p>{JSON.stringify(props)}</p>
      <button onClick={sub}>-5</button>
    </div>
  )
}
```

现在的问题是：子组件 Son2 中无法调用到父组件的 dispatch 函数。为了解决这个问题，我们需要在 Father 父组件中，通过 props 把父组件中的 dispatch 传递给子组件：

```ts
// 父组件
export const Father: React.FC = () => {
  // useReducer(fn, 初始数据, 对初始数据进行处理的fn)
  const [state, dispatch] = useReducer(reducer, defaultState, initAction)

  const onChangeName = () => {
    dispatch({ type: 'UPDATE_NAME', payload: '刘龙彬' })
  }

  return (
    <div>
      <button onClick={onChangeName}>修改 name 的值</button>
      <div className="father">
        <Son1 {...state} dispatch={dispatch} />
        <Son2 {...state} dispatch={dispatch} />
      </div>
    </div>
  )
}
```

在 Son2 子组件中，扩充 React.FC<UserType> 的类型，并从 props 中把 **dispatch** 和**用户信息对象**分离出来：

```ts
// 子组件2
const Son2: React.FC<UserType & { dispatch: React.Dispatch<ActionType> }> = (props) => {
  const { dispatch, ...user } = props
  const sub = () => dispatch({ type: 'DECREMENT', payload: 5 })

  return (
    <div className="son2">
      <p>用户信息：</p>
      <p>{JSON.stringify(user)}</p>
      <button onClick={sub}>-5</button>
    </div>
  )
}
```

## 9. 在 GrandSon 组件中实现重置按钮

1、扩充 `ActionType` 的类型如下：

```ts
// 定义 action 的类型 
type ActionType = { type: 'UPDATE_NAME'; payload: string } | { type: 'INCREMENT'; payload: number } | { type: 'DECREMENT'; payload: number } | { type: 'RESET' }
```

2、在 `reducer` 中添加 `RESET` 的 `case` 匹配：

```ts
const reducer = (prevState: UserType, action: ActionType) => {
  console.log('触发了 reducer 函数', action)

  switch (action.type) {
    case 'UPDATE_NAME':
      return { ...prevState, name: action.payload }
    case 'INCREMENT':
      return { ...prevState, age: prevState.age + action.payload }
    case 'DECREMENT':
      return { ...prevState, age: prevState.age - action.payload }
    // 添加 RESET 的 case 匹配
    case 'RESET':
      return defaultState
    default:
      return prevState
  }
}
```

3、在 `GrandSon` 组件中，添加**重置按钮**，并绑定点击事件处理函数：

```ts
const GrandSon: React.FC<{ dispatch: React.Dispatch<ActionType> }> = (props) => {
  const reset = () => props.dispatch({ type: 'RESET' })

  return (
    <>
      <h3>这是 GrandSon 组件</h3>
      <button onClick={reset}>重置</button>
    </>
  )
}
```

## 10. 使用 Immer 编写更简洁的 reducer 更新逻辑

> 解决每次重新为 `对象/数组` **解除引用**的问题

1、安装 `immer` 相关的依赖包：

```shell
npm install immer use-immer -S
```

2、从 `use-immer` 中导入 `useImmerReducer` 函数，并替换掉 `React` 官方的 `useReducer` 函数的调用：

```ts
// 1. 导入 useImmerReducer
import { useImmerReducer } from 'use-immer'

// 父组件
export const Father: React.FC = () => {
  // 2. 把 useReducer() 的调用替换成 useImmerReducer()
  const [state, dispatch] = useImmerReducer(reducer, defaultState, initAction)
}
```

3、修改 `reducer` 函数中的业务逻辑，`case` 代码块中不再需要 `return` 不可变的新对象了，只需要在 `prevState` 上进行修改即可。

**Immer 内部会复制并返回新对象**，因此降低了用户的心智负担。改造后的 `reducer` 代码如下：

```ts
const reducer = (prevState: UserType, action: ActionType) => {
  console.log('触发了 reducer 函数', action)

  switch (action.type) {
    case 'UPDATE_NAME':
      // return { ...prevState, name: action.payload }
      prevState.name = action.payload
      break
    case 'INCREMENT':
      // return { ...prevState, age: prevState.age + action.payload }
      prevState.age += action.payload
      break
    case 'DECREMENT':
      // return { ...prevState, age: prevState.age - action.payload }
      prevState.age -= action.payload
      break
    case 'RESET':
      return defaultState
    default:
      return prevState
  }
}
```


# useContext

在 react 函数式组件中，如果组件的嵌套层级很深，当父组件想把数据共享给最深层的子组件时，传统的办法是**使用 props**，**一层一层把数据向下传递**。

使用 props 层层传递数据的维护性太差了，我们可以使用 **`React.createContext() + useContext()`** 轻松实现**多层组件的数据传递**。

![1717935746432](../../../../AppData/Roaming/Typora/typora-user-images/1717935746432.png)

## 1. useContext 的语法格式

主要的**使用步骤**如下：

1\. 在**全局**借助 React.createContext 创建 Context 对象

2\. 在**顶层组件**中使用 Context.Provider + value 提供数据

3\. 在**接收组件**中使用 useContext 使用数据

```ts
import React, { useContext } from 'react'

// 全局
const MyContext = React.createContext(初始数据)

// 父组件
const Father = () => {
  return <MyContext.Provider value={{name: 'escook', age: 22}}>
    <!-- 省略其它代码 -->
  </MyContext.Provider>
}

// 子组件
const Son = () => {
  const myCtx = useContext(MyContext)
  return <div>
    <p>姓名：{myCtx.name}</p>
    <p>年龄：{MyCtx.age}</p>
  </div>
}
```

## 2. 定义组件结构

定义 LevelA，LevelB，LevelC 的组件结构如下：

```ts
import React, { useState } from 'react'

export const LevelA: React.FC = () => {
  // 定义状态
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: 30, backgroundColor: 'lightblue', width: '50vw' }}>
      <p>count值是：{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      {/* 使用子组件 */}
      <LevelB />
    </div>
  )
}

export const LevelB: React.FC = () => {
  return (
    <div style={{ padding: 30, backgroundColor: 'lightgreen' }}>
      {/* 使用子组件 */}
      <LevelC />
    </div>
  )
}

export const LevelC: React.FC = () => {
  return (
    <div style={{ padding: 30, backgroundColor: 'lightsalmon' }}>
      <button>+1</button>
      <button>重置</button>
    </div>
  )
}
```

## 3. createContext 配合 useContext 使用

1、在父组件中，调用 `React.createContext` 向下共享数据

2、在子组件中调用 `useContext()` 获取数据

**示例代码**如下：

```ts
import React, { useState, useContext } from 'react'

// 声明 TS 类型
type ContextType = { count: number; setCount: React.Dispatch<React.SetStateAction<number>> }

// 1. 创建 Context 对象
const AppContext = React.createContext<ContextType>({} as ContextType)

export const LevelA: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: 30, backgroundColor: 'lightblue', width: '50vw' }}>
      <p>count值是：{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      {/* 2. 使用 Context.Provider 向下传递数据 */}
      <AppContext.Provider value={{ count, setCount }}>
        <LevelB />
      </AppContext.Provider>
    </div>
  )
}

export const LevelB: React.FC = () => {
  return (
    <div style={{ padding: 30, backgroundColor: 'lightgreen' }}>
      <LevelC />
    </div>
  )
}

export const LevelC: React.FC = () => {
  // 3. 使用 useContext 接收数据
  const ctx = useContext(AppContext)

  return (
    <div style={{ padding: 30, backgroundColor: 'lightsalmon' }}>
      {/* 4. 使用 ctx 中的数据和方法 */}
      <p>count值是：{ctx.count}</p>
      <button onClick={() => ctx.setCount((prev) => prev + 1)}>+1</button>
      <button onClick={() => ctx.setCount(0)}>重置</button>
    </div>
  )
}
```

## 4. ☆☆☆以【非侵入的方式】使用 Context

在刚才的案例中，我们发现父组件 LevelA 为了向下传递共享的数据，在代码中**侵入**了 **`<AppContext.Provider>`** 这样的代码结构。

为了保证父组件中代码的单一性，也为了提高 **Provider** 的通用性，我们可以考虑把 **Context.Provider** 封装到独立的 **Wrapper** 函数式组件中，例如：

```ts
// 声明 TS 类型
type ContextType = { count: number; setCount: React.Dispatch<React.SetStateAction<number>> }
// 创建 Context 对象
const AppContext = React.createContext<ContextType>({} as ContextType)

// 定义独立的 Wrapper 组件，被 Wrapper 嵌套的子组件会被 Provider 注入数据
export const AppContextWrapper: React.FC<React.PropsWithChildren> = (props) => {
  // 1. 定义要共享的数据
  const [count, setCount] = useState(0)
  // 2. 使用 AppContext.Provider 向下共享数据
  return <AppContext.Provider value={{ count, setCount }}>{props.children}</AppContext.Provider>
}
```

定义好 Wrapper 组件后，我们可以在 App.tsx 中导入并使用 Wrapper 和 LevelA 组件，代码如下：

```ts
import React from 'react'
import { AppContextWrapper, LevelA } from '@/components/use_context/01.base.tsx'

const App: React.FC = () => {
  return (
    <AppContextWrapper>
      <!-- AppContextWrapper 中嵌套使用了 LevelA 组件，形成了父子关系 -->
      <!-- LevelA 组件会被当做 children 渲染到 Wrapper 预留的插槽中 -->
      <LevelA />
    </AppContextWrapper>
  )
}

export default App 
```

这样，组件树的嵌套关系为：App \=> Wrapper \=> LevelA \=> LevelB \=> LevelC。因此在 LevelA、LevelB 和 LevelC 组件中，都可以使用 context 中的数据。例如，LevelA 组件中的代码如下：

```ts
export const LevelA: React.FC = () => {
  // 使用 useContext 接收数据
  const ctx = useContext(AppContext)

  return (
    <div style={{ padding: 30, backgroundColor: 'lightblue', width: '50vw' }}>
      {/* 使用 ctx 中的数据和方法 */}
      <p>count值是：{ctx.count}</p>
      <button onClick={() => ctx.setCount((prev) => prev + 1)}>+1</button>
      <LevelB />
    </div>
  )
}
```

LevelC 组件中的代码如下：

```ts
export const LevelC: React.FC = () => {
  // 使用 useContext 接收数据
  const ctx = useContext(AppContext)

  return (
    <div style={{ padding: 30, backgroundColor: 'lightsalmon' }}>
      {/* 使用 ctx 中的数据和方法 */}
      <p>count值是：{ctx.count}</p>
      <button onClick={() => ctx.setCount((prev) => prev + 1)}>+1</button>
      <button onClick={() => ctx.setCount(0)}>重置</button>
    </div>
  )
}
```

> **核心思路**：
>
> ​	1、每个 Context 都创建一个对应的 Wrapper 组件，在 Wrapper 组件中使用 Provider 向 children 注入数据
>
> ​	2、实际上就是为了避免不必要的代码污染父组件，请来了一个顶层组件 Wrapper，并将需要传递的状态以及 provider 放在该组件中，后续使用流程不变
>
> ​	3、最大的优点是通用性

## 5. 使用 useContext 重构 useReducer 案例

1、定义 Context 要向下共享的数据的 TS 类型，代码如下：

```ts
// 1. 定义 Context 的 TS 类型
// 在这一步，我们必须先明确要向子组件注入的数据都有哪些
type UserInfoContextType = { user: UserType; dispatch: React.Dispatch<ActionType> } 
```

2、使用 React.createContext 创建 Context 对象：

```ts
// 2. 创建 Context 对象 
const UserInfoContext = React.createContext<UserInfoContextType>({} as UserInfoContextType)
```

3、**创建 ContextWrapper 组件如下，把 Father 组件中的 useImmerReducer 调用过程，抽离到 ContextWrapper 中：**

```ts
// 3. 创建 ContextWrapper 组件
export const UserInfoContextWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, defaultState, initAction)
  return <UserInfoContext.Provider value={{ user: state, dispatch }}>{children}</UserInfoContext.Provider>
}
```

4、改造 Father 组件，调用 useContext 获取并使用 Context 中的数据。同时，Father 组件也不必再使用 props 把 state 和 dispatch 函数传递给 Son 组件：

```ts
export const Father: React.FC = () => {
  // 4. 调用 useContext 导入需要的数据
  const { user: state, dispatch } = useContext(UserInfoContext)

  const changeUserName = () => dispatch({ type: 'UPDATE_NAME', payload: '刘龙彬' })

  return (
    <div>
      <button onClick={changeUserName}>修改用户名</button>
      <p>{JSON.stringify(state)}</p>
      <div className="father">
        {/* 5. 这里没有必要再往子组件传递 props 了 */}
        {/* <Son1 {...state} dispatch={dispatch} />
        <Son2 {...state} dispatch={dispatch} /> */}
        <Son1 />
        <Son2 />
      </div>
    </div>
  )
}
```

5、改造 App 根组件，分别导入 UserInfoContextWrapper 和 Father 组件，并形成父子关系的嵌套，这样 Father 及其子组件才可以访问到 Context 中的数据：

```ts
import React from 'react'
import { UserInfoContextWrapper, Father } from '@/components/use_reducer/01.base.tsx'

const App: React.FC = () => {
  return (
    <UserInfoContextWrapper>
      <Father />
    </UserInfoContextWrapper>
  )
}

export default App
```

6、最后，改造 Son1，Son2 和 GrandSon 组件，删除 props 及其类型定义，改用 useContext() 来获取 UserInfoContextWrapper 向下注入的数据：

```ts
const Son1: React.FC = () => {
  // 6. 把 props 替换为 useContext() 的调用
  const { dispatch, user } = useContext(UserInfoContext)

  const add = () => dispatch({ type: 'INCREMENT', payload: 1 })

  return (
    <div className="son1">
      <p>{JSON.stringify(user)}</p>
      <button onClick={add}>年龄+1</button>
    </div>
  )
}

const Son2: React.FC = () => {
  // 7. 把 props 替换为 useContext() 的调用
  const { dispatch, user } = useContext(UserInfoContext)

  const sub = () => dispatch({ type: 'DECREMENT', payload: 5 })

  return (
    <div className="son2">
      <p>{JSON.stringify(user)}</p>
      <button onClick={sub}>年龄-5</button>
      <hr />
      <GrandSon />
    </div>
  )
}

const GrandSon: React.FC = () => {
  // 8. 把 props 替换为 useContext() 的调用
  const { dispatch } = useContext(UserInfoContext)
  const reset = () => dispatch({ type: 'RESET' })

  return (
    <>
      <h3>这是 GrandSon 组件</h3>
      <button onClick={reset}>重置</button>
    </>
  )
}
```

> 快乐学习，开心生活~


# useMemo 和 memo 函数

## 1\. memo 函数

当父组件被重新渲染的时候，也会触发子组件的重新渲染，这样就多出了**无意义的性能开销**。如果子组件的状态没有发生变化，则子组件是必须要被重新渲染的。

在 React 中，我们可以使用 **`React.memo()`** 函数来解决上述的问题，从而达到**提高性能**的目的。

**`React.memo()`** 的**语法格式**如下：

```ts
const 组件 = React.memo(函数式组件)
```

例如，在下面的代码中，父组件声明了 count 和 flag 两个状态，子组件依赖于父组件通过 props 传递的 num。当父组件修改 flag 的值时，会导致子组件的重新渲染：

```ts
import React, { useEffect, useState } from 'react'

// 父组件
export const Father: React.FC = () => {
  // 定义 count 和 flag 两个状态
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  return (
    <>
      <h1>父组件</h1>
      <p>count 的值是：{count}</p>
      <p>flag 的值是：{String(flag)}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
      <hr />
      <Son num={count} />
    </>
  )
}

// 子组件：依赖于父组件通过 props 传递进来的 num
export const Son: React.FC<{ num: number }> = ({ num }) => {
  useEffect(() => {
    console.log('触发了子组件的渲染')
  })
  return (
    <>
      <h3>子组件 {num}</h3>
    </>
  )
}
```

**【解决方案】**我们使用 **`React.memo(函数式组件)`** 将子组件**包裹**起来，只有**子组件依赖的 `props`** 发生变化的时候，才会触发子组件的重新渲染。示例代码如下：

```ts
// 子组件：依赖于父组件通过 props 传递进来的 num
export const Son: React.FC<{ num: number }> = React.memo(({ num }) => {
  useEffect(() => {
    console.log('触发了子组件的渲染')
  })
  return (
    <>
      <h3>子组件 --- {num}</h3>
    </>
  )
})
```

## 2\. useMemo - 问题引入  

进一步改造前面的案例：我们希望在 Father 组件中添加一个“计算属性”，根据 flag 值的真假，**动态**返回一段文本内容，并把计算的结果显示到页面上。示例代码如下：

```ts
// 父组件
export const Father: React.FC = () => {
  // 定义 count 和 flag 两个状态
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  // 根据布尔值进行计算，动态返回内容
  const tips = () => {
    console.log('触发了 tips 的重新计算')   // 我们希望只有 flag 的变化 ，才会导致函数重新计算（结果）
    return flag ? <p>哪里贵了，不要睁着眼瞎说好不好</p> : <p>这些年有没有努力工作，工资涨没涨</p>
  }

  return (
    <>
      <h1>父组件</h1>
      <p>count 的值是：{count}</p>
      <p>flag 的值是：{String(flag)}</p>
       // 通过函数执行触发动态渲染
      {tips()}
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
      <hr />
      <Son num={count} />
    </>
  )
}
```

代码编写完毕后，我们点击父组件中的 **+1 按钮**，发现 count 在自增，而 flag 的值不会发生变化。此时也会触发 tips 函数的重新执行，这就造成了性能的浪费。

我们希望如果 flag 没有发生变化，则避免 tips 函数的重新计算，从而优化性能。此时需要用到 React Hooks 提供的 **useMemo** API。  

## 3\. useMemo - 语法格式  

**`useMemo`** 的**作用**是对**函数计算结果**进行缓存，返回值是一个**数值**，语法格式如下：

```ts
const memorizedValue = useMemo(callback, array)

// 【注意】 useMemo的返回值是一个值，使用时不需要加（）
const memoValue = useMemo(() => {
  return 计算得到的值
}, [value]) // 表示监听 value 的变化
```

其中：

1\. **callback**：这是一个函数，用户处理计算的逻辑，必须使用 return 返回**计算的结果**；

2\. **array**：这个数组中存储的是依赖项，只有**依赖项**发生变化，都会触发 **`callback`** 的重新执行。

> 使用 array 需要注意以下3点：
> 
> ​	1、不传数组，每次更新都会重新计算
> 
> ​	2、空数组，只会计算一次
> 
> ​	3、依赖对应的值，对应的值发生变化时会重新执行 **`callback`**

## 4\. useMemo - 使用 useMemo 解决刚才的问题

导入 useMemo：

```ts
import React, { useEffect, useState, useMemo } from 'react'
```

在 Father 组件中，使用 **useMemo** 对 **tips** 进行改造：

```ts
// 根据布尔值进行计算，动态返回内容
const tips = useMemo(() => {
  console.log('触发了 tips 的重新计算')
  return flag ? <p>哪里贵了，不要睁着眼瞎说好不好</p> : <p>这些年有没有努力工作，工资涨没涨</p>
}, [flag])

return (
    <>
      // 此时这里直接写变量名 tips
      {tips}
    </>
  )
```

此时，点击 Father 中的 +1 按钮，并不会触发 tips 的重新计算，而是会使用上一次缓存的值进行渲染。只有依赖项 flag 变化时，才会触发 tips 的重新计算。



# useCallback

## 1\. 语法格式

之前我们所学的 **`useMemo`** 能够达到缓存某个**变量值**的效果，而当前要学习的 **`useCallback`** 用来对组件内的函数进行缓存，它返回的是**缓存的函数**。它的语法格式如下：

```ts
const memoCallback = useCallback(cb, array)
```

**`useCallback`** 会返回一个 **`memorized`** 回调函数供组件使用，从而防止组件每次 rerender 时反复创建相同的函数，能够节省内存开销，提高性能。其中：

1\. cb 是一个函数，用于处理业务逻辑，这个 cb 就是**需要被缓存的函数**

2\. array 是**依赖项列表**，当 array 中的**依赖项**变化时才会重新执行 **`useCallback`**。

>  a. 如果省略 array，则每次更新都会重新计算
>
>  b. 如果 array 为空数组，则只会在组件第一次初始化的时候计算一次
>
>  c. 如果 array 不为空数组，则只有当依赖项的值变化时，才会重新计算
>

## 2\. 基本示例  

接下来，我们通过下面的例子演示使用 **`useCallback`** 的必要性：当输入框触发 onChange 事件时，会给 kw 重新赋值。

kw 值的改变会导致组件的 rerender，而组件的 rerender 会导致反复创建 **onKwChange** 函数并添加到 Set 集合中，造成了不必要的内存浪费。代码如下：

```ts
import React, { useState, useCallback } from 'react'

// 用来存储函数的 set 集合
const set = new Set()

export const Search: React.FC = () => {
  const [kw, setKw] = useState('')

  const onKwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.currentTarget.value)
  }

  // 把 onKwChange 函数的引用，存储到 set 集合中
  set.add(onKwChange)
  // 打印 set 集合中元素的数量
  console.log('set 中函数的数量为：' + set.size)

  return (
    <>
      <input type="text" value={kw} onChange={onKwChange} />
      <hr />
      <p>{kw}</p>
    </>
  )
}
```

运行上面的代码，我们发现每次文本框的值发生变化，都会打印 set.size 的值，而且这个值一直在自增 +1，因为每次组件 rerender 都会创建一个新的 onKwChange 函数添加到 **set** 集合中。

为了防止 Search 组件 rerender 时每次都会重新创建 onKwChange 函数，我们可以使用 **`useCallback`** 对这个函数进行缓存。改造后的代码如下：

```ts
import React, { useState, useCallback } from 'react'

// 用来存储函数的 set 集合
const set = new Set()

export const Search: React.FC = () => {
  const [kw, setKw] = useState('')

  const onKwChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.currentTarget.value)
  }, [])

  // 把 onKwChange 函数的引用，存储到 set 集合中
  set.add(onKwChange)
  // 打印 set 集合中元素的数量
  console.log('set 中函数的数量为：' + set.size)

  return (
    <>
      <input type="text" value={kw} onChange={onKwChange} />
      <hr />
      <p>{kw}</p>
    </>
  )
}
```

运行改造后的代码，我们发现无论 input 的值如何发生变化，每次打印的 set.size 的值都是 1。证明我们使用 useCallback 实现了对函数的缓存。  

## 3. 搜索案例  

### **3.1 问题引入**

1、导入需要的 hooks 函数，并定义需要的 TS 类型：

```ts
import React, { useEffect, useState, useCallback } from 'react'

// 文本框组件的 props 类型
type SearchInputType = { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }
// 单词对象的 TS 类型
type WordType = { id: number; word: string }
```

2、定义 **SearchInput** 搜索框子组件，接收父组件传递进来的 **onChange** 处理函数，每当 input 触发 onChange 事件时，调用 props.onChange 进行处理：

```ts
// 子组件
const SearchInput: React.FC<SearchInputType> = (props) => {
  useEffect(() => {
    console.log('触发了 SearchInput 的 rerender')
  })

  return <input onChange={props.onChange} placeholder="请输入搜索关键字" />
}
```

3、定义 **SearchResult** 搜索结果子组件，接收父组件传递进来的 **query** 搜索关键字，在 useEffect 中监听 props.query 的变化，从而请求搜索的结果：

```ts
// 子组件：搜索结果
const SearchResult: React.FC<{ query: string }> = (props) => {
  const [list, setList] = useState<WordType[]>([])

  useEffect(() => {
    // 如果 query 为空字符串，则清空当前的列表
    if (!props.query) return setList([])

    // 查询数据
    fetch('https://api.liulongbin.top/v1/words?kw=' + props.query)
      .then((res) => res.json())
      .then((res) => {
        // 为列表赋值
        setList(res.data)
      })
  }, [props.query])

  // 渲染列表数据
  return list.map((item) => <p key={item.id}>{item.word}</p>)
}
```

4、定义父组件 **SearchBox** 并渲染 **SearchInput** 组件和 **SearchResult** 组件。在父组件中监听 **SearchInput** 的 onChange 事件，并把父组件中定义的处理函数 onKwChange 传递进去。同时，把父组件中定义的搜索关键字 kw 传递给 **SearchResult** 组件。示例代码如下：

```ts
// 父组件
export const SearchBox: React.FC = () => {
  const [kw, setKw] = useState('')

  const onKwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.currentTarget.value)
  }

  return (
    <div style={{ height: 500 }}>
      <SearchInput onChange={onKwChange} />
      <hr />
      <SearchResult query={kw} />
    </div>
  )
}
```

5、经过测试后，我们发现：

其实，子组件根本不需要被重新渲染，因为 props.onChange 函数的处理逻辑没有发生变化，只是它的引用每次都在变。为了解决这个问题，我们需要用到 **useCallback** 和 **React.memo**。

​	1\. 每当子组件的文本框内容发生变化，都会调用 props.onChange 把数据发送给父组件。

​	2\. 相应的，父组件通过 **onKwChange** 函数可以获取到子组件的值，并把值更新到 kw 中。当 kw 发生变化，会触发父组件的 rerender。

​	3\. 而父组件的 rerender 又会重新生成 **onKwChange** 函数并把函数的引用作为 props 传递给子组件。

​	4\. 这样，子组件就监听到了 `props` 的变化，最终导致子组件的 rerender。

其实，子组件根本不需要被重新渲染，因为 props.onChange 函数的处理逻辑没有发生变化，只是它的引用每次都在变。为了解决这个问题，我们需要用到 **useCallback** 和 **React.memo**。

### **3.2 问题解决**

1、首先，我们需要让子组件 SearchInput 被缓存，所以我们需要使用 **`React.memo`** 对其进行改造：

```ts
// 子组件：搜索框
const SearchInput: React.FC<SearchInputType> = React.memo((props) => {
  useEffect(() => {
    console.log('触发了 SearchInput 的 rerender')
  })

  return <input onChange={props.onChange} placeholder="请输入搜索关键字" />
})
```

2、使用 React.memo 对组件进行缓存后，如果子组件的 **props** 在两次更新前后没有任何变化，则被 memo 的组件不会 rerender。

所以为了实现 SearchInput 的缓存，还需要基于 useCallback 把父组件传递进来的 **onChange** 进行缓存。

在父组件中针对 **onKwChange** 调用 useCallback，示例代码如下：

```ts
const onKwChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  setKw(e.currentTarget.value)
}, []) 
```

经过测试，我们发现每当文本框内容发生变化，不会导致 SearchInput 组件的 rerender。