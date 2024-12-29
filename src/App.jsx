import Navbar from './component/Navbar'
import './App.css'
import Manager from './component/Manager'
import Footer from './component/Footer'
function App() {

  return (
    <>
      <Navbar />
      <div className='bg-blue-100 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
        <Manager />
      </div>

      <Footer />
    </>
  )
}

export default App
