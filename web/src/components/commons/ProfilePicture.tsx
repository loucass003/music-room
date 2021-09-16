import cntl from "cntl";
import { useMemo } from "react";
import { useUserQuery } from "../../graphql/generated-types";

interface InternalProfilePictureProps {
  userId: string;
}

interface ProfilePictureState {
  loading: boolean;
}

type ProfilePictureProps = InternalProfilePictureProps & React.HTMLAttributes<HTMLDivElement>;

const ProfilePictureCN = ({ className, loading }: ProfilePictureProps & ProfilePictureState) => cntl`
  rounded-full
  bg-gray-300
  flex
  items-center
  justify-center
  text-lg
  font-bold  
  ${loading && 'loading-effect'}
  ${className}
`


export function ProfilePicture(props: ProfilePictureProps) {

  const {data, loading} = useUserQuery({ variables: { id: props.userId }, nextFetchPolicy: 'cache-first' })

  const name = useMemo(() => {
    const str = data?.user?.name.toUpperCase() || ''
    const words = str?.split(/-_/) || [];
    if (words.length > 1)
      return `${words[0].charAt(0)}${words[1].charAt(0)}`
    return str.length > 1 ? str.substr(0, 2) : str;
  }, [data])

  return (
    <div className={ProfilePictureCN({ ...props, loading })}>
      {name}
    </div>
  )
}