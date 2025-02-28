import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Principal from'./pages/principal/Principal'
import Navegacion from'./pages/navegacion/Navegacion'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Navegacion />
  )
}

export default App
