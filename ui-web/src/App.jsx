import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
// MUI
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './assets/theme.jsx';

//import './App.css'

import Title from './pages/Title.jsx';
import Login from './pages/Login';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import CategoryArticlesList from './pages/CategoryArticlesList.jsx';
import HotTopic from './pages/HotTopic.jsx';
import Article from './pages/Article.jsx';
import CreateArticle from './pages/CreateArticle';
import CreateArticleTinyMCE from './pages/CreateArticleTinyMCE';
import EditArticle from './pages/EditArticle';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import TermesOfUse from './pages/TermesOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiesPolicy from './pages/CookiesPolicy';
import AdvertiseWithUs from './pages/AdvertiseWithUs';
import NoPermission from './components/Auth/NoPermission.jsx';

function App() {
	const [count, setCount] = useState(0);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<BrowserRouter>
					<AuthProvider>
						<Routes>
							<Route element={<ProtectedRoute />}>
								<Route path="/auth/create-article" element={<CreateArticleTinyMCE />} />
								<Route path="/auth/create-article/:id" element={<EditArticle />} />
							</Route>

							<Route path="/login" element={<Login />} />
							<Route path="/no-permission" element={<NoPermission />} />
							{/* <Route path="/auth/create-article" element={<CreateArticleTinyMCE />} />
						<Route path="/auth/create-article/:id" element={<EditArticle />} /> */}

							<Route path="/" element={<Home />} />
							<Route path="/home" element={<Home />} />
							<Route path="/home2" element={<Home2 />} />
							<Route
								path="/articles/indirect-tax"
								element={<CategoryArticlesList category={'Indirect Tax'} />}
							/>
							<Route
								path="/articles/direct-tax"
								element={<CategoryArticlesList category={'Direct Tax'} />}
							/>
							<Route
								path="/articles/transfer-pricing"
								element={<CategoryArticlesList category={'Transfer Pricing'} />}
							/>
							<Route
								path="/articles/tax-technology"
								element={<CategoryArticlesList category={'Tax Technology'} />}
							/>
							<Route
								path="/articles/customs"
								element={<CategoryArticlesList category={'Customs'} />}
							/>
							<Route path="/articles/:id" element={<Article />} />
							<Route path="/hot-topics/:number" element={<HotTopic />} />
							{/* <Route path="/auth/create-article/" element={<CreateArticle />} /> */}

							<Route path="/about-us" element={<AboutUs />} />
							<Route path="/contact-us" element={<ContactUs />} />
							<Route path="/termes-of-use" element={<TermesOfUse />} />
							<Route path="/privacy-policy" element={<PrivacyPolicy />} />
							<Route path="/cookies-policy" element={<CookiesPolicy />} />
							<Route path="/advertise-with-us" element={<AdvertiseWithUs />} />
						</Routes>
					</AuthProvider>
				</BrowserRouter>
			</CssBaseline>
		</ThemeProvider>
		// <>
		//   <div>
		//     <a href="https://vitejs.dev" target="_blank">
		//       <img src={viteLogo} className="logo" alt="Vite logo" />
		//     </a>
		//     <a href="https://react.dev" target="_blank">
		//       <img src={reactLogo} className="logo react" alt="React logo" />
		//     </a>
		//   </div>
		//   <h1>TAXSPOC</h1>
		//   <div className="card">
		//     <button onClick={() => setCount((count) => count + 1)}>
		//       Let's start {count}
		//     </button>
		// 	<Button variant="contained">Hello world</Button>

		//   </div>
		//   <p className="read-the-docs">
		//     Click on the Vite and React logos to learn more
		//   </p>
		// </>
	);
}

export default App;
