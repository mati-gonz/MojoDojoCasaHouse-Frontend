import { Route, Routes } from 'react-router-dom'
import Landing from './views/Landing'

export default function RoutesFunction () {
  return (
      <Routes>
        <Route exact path="/" element={<Landing />} />
      </Routes>
  )
}
