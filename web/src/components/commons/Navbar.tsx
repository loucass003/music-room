import { faBell, faComments, faSearch, faStream, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useSession } from "../../hooks/session";
import { Box } from "./ui/Box";

export function UserDrawer() {

  const [open, setOpen] = useState(false);
  const { logout, session } = useSession();

  const toogleDrawer = (event: MouseEvent) => {
    setOpen((prev) => !prev);
    event.stopPropagation();
  }

  return (
    <button className="relative mr-3 cursor-pointer hover:text-gray-700" onClick={toogleDrawer}>
      <span className="mx-4">{session.session?.me.name}</span>
      <span className="bg-gray-200 rounded-full p-2">
        <FontAwesomeIcon icon={faUser} className="w-4 h-4"/>
      </span>
      {open && 
        <div className="text-left absolute right-0 w-32 mt-2 py-2 bg-white border rounded shadow-xl">   
          <Link to="/settings" className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-primary-400 hover:text-white">Settings</Link>
          <div className="py-2"><hr></hr></div>
          <span className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-primary-400 hover:text-white" onClick={() => logout()}>
            Logout
          </span>
        </div>
      }
    </button>
  )
}

export function Navbar() {
 
  return (
    <Box className="p-3 m-4 capitalize text-gray-900 font-medium">
      <span className="px-2 mr-2 border-r border-gray-800">
        Music Room
      </span>
      <span className="px-2 py-1 cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-sm rounded mb-5">
        <span className="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon icon={faStream} className="w-4 h-4"/>
        </span>
        <span className="mx-1">playlists</span>
      </span>
      {/* <span className="px-2 py-1 cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-sm rounded mb-5">
        <span className="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon icon={faTh} className="w-4 h-4"/>
        </span>
        <span className="mx-1">menu</span>
      </span> */}
      <span className="px-1 cursor-pointer hover:text-gray-700">
        <span className="bg-gray-200 rounded-full p-2">
          <FontAwesomeIcon icon={faSearch} className="w-4 h-4"/>
        </span>
      </span>

      <span className="float-right">
        <UserDrawer></UserDrawer>
        <Link to="/conversation/list" className="px-1 mr-3 w-8 relative cursor-pointer hover:text-gray-700">
          <span className="bg-gray-200 rounded-full p-2">
            <FontAwesomeIcon icon={faComments} className="w-4 h-4"/>
          </span>
        </Link>
        <span className="px-1 w-8 relative cursor-pointer hover:text-gray-700">
          <span className="bg-gray-200 rounded-full p-2">
            <FontAwesomeIcon icon={faBell} className="w-4 h-4"/>
          </span>
          <span
            className="absolute right-0 top-0 -mt-2 -mr-2 text-xs bg-red-500 text-white font-medium px-2 shadow-lg rounded-full">3</span>
        </span>
      </span>
    </Box>
  )
}