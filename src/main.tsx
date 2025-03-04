import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {store} from './store/index.ts'; 
import './index.css';
import App from './App.tsx';
import {BrowserRouter} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
);

