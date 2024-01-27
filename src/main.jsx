import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <Router>
   <App />
   </Router>
  </Provider>
)
