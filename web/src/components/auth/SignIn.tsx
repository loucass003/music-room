import { Button } from "../commons/ui/Button";
import { Input } from "../commons/ui/Input";


export function SignIn() {
  return (
    <div>
      <div className="text-5xl">Sign In</div>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <ul className="list-disc space-y-2">
              <li className="flex items-start">
                <Input placeholder="toto" error="ceci est une erreur"></Input>
              </li>
              <li className="flex items-start">
                <Input></Input>
              </li>
              <li className="flex items-start">
                <Input></Input>
              </li>
            </ul>
          </div>
          <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
            <Button>Submit</Button>
          </div>
        </div>
    </div>
  )
}