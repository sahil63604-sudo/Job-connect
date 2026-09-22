import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="py-4 shadow-md px-8 flex justify-between items-center sticky top-0 bg-white">
      <Link to="/">
        <div className="font-bold text-2xl">JOB CONNECT</div>
      </Link>

      <div className="space-x-8">
        <Link className="hover:text-blue-600" to='/'>Home</Link>
        <Link className="hover:text-blue-600" to='/login'>Login</Link>
        <Link className="hover:text-blue-600" to='/register'>Register</Link>
      </div>
    </nav>
  )
}

export default Navbar