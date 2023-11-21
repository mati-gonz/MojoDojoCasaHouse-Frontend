import { Route, Routes } from 'react-router-dom'
import Landing from './views/Landing'
import Functions from './views/Functions'

export default function RoutesFunction () {
  return (
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/functions" element={<Functions/>}/>
      </Routes>
  )
}
