import { Route, Routes } from 'react-router-dom'
import Landing from './views/Landing'
import NearbyCinemas from './views/NearbyCinemas'
import Functions from './views/Functions'
import AdminLogin from './views/AdminLogIn'

export default function RoutesFunction () {
  return (
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path='/nearbyCinemas' element={<NearbyCinemas />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route exact path="/movieInfo" element={<Functions/>}/>
        <Route exact path="/admin" element={<AdminLogin />} />
     </Routes>

  )
}
