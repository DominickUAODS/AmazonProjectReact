import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, useLocation } from 'react-router-dom';

function AppWrapper() {
	const location = useLocation();
	const background = location.state?.background;
  
	return <App location={location} background={background} />;
  }
  
  createRoot(document.getElementById('root')!).render(
	<StrictMode>
	  <BrowserRouter>
		<AppWrapper />
	  </BrowserRouter>
	</StrictMode>
  );
