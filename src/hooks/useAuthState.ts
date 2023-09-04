import {useState} from "react"
import {getAuth, onAuthStateChanged} from "firebase/auth"

export const useAuthState = () => {
	const auth = getAuth()
	const [loading, setLoading] = useState<boolean>(true)
	const [userState, setUserState] = useState<boolean>(false)

	onAuthStateChanged(auth, (user) => {
		if (user) {
			setUserState(true)
			setLoading(false)
		} else {
			setLoading(false)
			setUserState(false)
		}
	})

	return {userState, auth, loading}
}