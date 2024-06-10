import React from 'react';
import { Father } from '@/components/useContext/reducer'
import { ReduceContextWrapper } from '@/components/useContext/reducer'

// React.FC 表示类型为函数组件
const App:React.FC = () => {

  return (
    <ReduceContextWrapper>
      <Father />
    </ReduceContextWrapper>
  )
}

export default App