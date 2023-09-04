import {FC, ReactNode, memo} from "react"
import {Navigate} from "react-router-dom"

interface ProtectedRouteProps {
    redirectPath: string
    isAllowed: boolean
    children: ReactNode
}

const ProtectedRoute: FC<ProtectedRouteProps> = memo(({redirectPath, isAllowed, children}) => {

    if (!isAllowed) return <Navigate to={redirectPath} replace />

    return (
        <>
            {children}
        </>
    )
})

export default ProtectedRoute