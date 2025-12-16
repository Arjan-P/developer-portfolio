import { Outlet } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import FooterBar from './components/FooterBar' 


function App() {
  return (
    <div className='min-h-screen grid grid-rows-[auto_1fr_auto] bg-gray-asparagus-500'>
      <header>
        <NavigationBar />
      </header>
      {/* Pages render here */}
      <main className='w-full px-1'>
        <div className='w-full h-full px-4 rounded-xl shadow-xl bg-vanilla-200'>
          <div className="mx-auto max-w-6xl px-4 text-vanilla-900">
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
