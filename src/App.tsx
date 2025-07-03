import './App.css'
import { useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <main>
        <h1>Vite + React</h1>
        <div className="card">
          <button className='button button-primary' onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </main>
      <Footer />
    </>
  )
}

export default App
