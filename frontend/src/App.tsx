import { Outlet } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import FooterBar from './components/FooterBar' 


function App() {
  return (
    <div className='h-screen grid grid-rows-[auto_1fr_auto] bg-gray-asparagus-500 overflow-hidden'>
      <header className='sticky top z-50'>
        <NavigationBar />
      </header>
      {/* Pages render here */}
      <main className='h-full w-full px-1 overflow-hidden'>

        <div className='w-full h-full px-4 rounded-xl shadow-xl bg-vanilla-200 overflow-hidden'>
          <div className="mx-auto max-w-6xl px-4 text-vanilla-900 h-full flex flex-col overflow-y-auto">
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
