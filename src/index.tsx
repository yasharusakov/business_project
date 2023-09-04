import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux"
import store from './redux/store'
import App from "./components/app"
import './firebase'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
)