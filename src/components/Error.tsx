import { ReactNode } from "react"


//Error for form

type ErrorProps = {
    children:ReactNode
}
function Error({children}:ErrorProps) {
  return (
    <p className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase text-sm">{children}</p>
  )
}

export default Error