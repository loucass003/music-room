import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cntl from "cntl";


const loaderCN = ({ relative }: { relative: boolean }) => cntl`
w-full
h-full
${!relative && cntl`
  fixed 
  top-0 
  left-0 
  opacity-75 
  z-50
`}

`

export function FullscreenLoader({ relative = false }: { relative?: boolean }) {
  return (
    <div id="loading-screen" className={loaderCN({ relative })}>
      <span className="text-primary-600 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
        <FontAwesomeIcon icon={faCircleNotch} spin size="3x"></FontAwesomeIcon>
      </span>
    </div>
  )
}