import { Outlet } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import FooterBar from './components/FooterBar'


function App() {
  return (
    <div className='min-h-[100dvh] grid grid-rows-[clamp(3rem,6vh,4.5rem)_1fr_clamp(3.5rem,8vh,5.5rem)] bg-gray-asparagus-500'>
      <header>
        <NavigationBar />
      </header>
      {/* Pages render here */}
      <main className='min-h-0 px-1'>

        <div className='w-full h-full px-4 rounded-xl shadow-xl bg-vanilla-200 overflow-y-auto'>
          <div className="mx-auto max-w-6xl px-4 text-vanilla-900 h-full flex flex-col">
            <Outlet />
          </div>
        </div>
      </main>
      <footer>
        <FooterBar />
      </footer>
    </div>
  )
}

export default App
