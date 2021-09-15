import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export function FullscreenLoader() {
  return (
    <div id="loading-screen" className="w-full h-full fixed top-0 left-0 opacity-75 z-50">
      <span className="text-primary-600 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
        <FontAwesomeIcon icon={faCircleNotch} spin size="3x"></FontAwesomeIcon>
      </span>
    </div>
  )
}