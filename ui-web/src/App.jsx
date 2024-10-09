import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { HelmetProvider } from 'react-helmet-async';
// MUI
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './assets/theme.jsx';

//import './App.css'
// pages
import Title from './pages/Title.jsx';
import Login from './pages/Login';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import CategoryArticlesList from './pages/CategoryArticlesList.jsx';
import ArticlesCategoryList from './pages/ArticlesCategoryList.jsx';
import HotTopic from './pages/HotTopic.jsx';
import Article from './pages/Article.jsx';
import CreateArticle from './pages/CreateArticle';
import CreateArticleTinyMCE from './pages/CreateArticleTinyMCE';
import EditArticle from './pages/EditArticle';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import TermsOfUse from './pages/TermsOfUse.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiesPolicy from './pages/CookiesPolicy';
import AdvertiseWithUs from './pages/AdvertiseWithUs';
import NoPermission from './components/Auth/NoPermission.jsx';

function App() {
	const [count, setCount] = useState(0);

	return (
		<HelmetProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline>
					<BrowserRouter>
						<AuthProvider>
							<Routes>
								<Route element={<ProtectedRoute />}>
									<Route path="/cms/auth/create-article" element={<CreateArticleTinyMCE />} />
									<Route path="/cms/auth/create-article/:id" element={<EditArticle />} />
								</Route>

								<Route path="/cms/login" element={<Login />} />
								<Route path="/cms/no-permission" element={<NoPermission />} />

								<Route path="/" element={<Home />} />
								<Route path="/home" element={<Home />} />
								<Route path="/home2" element={<Home2 />} />
								<Route path="/category/articles" element={<CategoryArticlesList />} />
								<Route path="/articles/category" element={<ArticlesCategoryList />} />

								<Route path="/articles/:slug" element={<Article />} />
								<Route path="/hot-topics/:number" element={<HotTopic />} />

								<Route path="/about-us" element={<AboutUs />} />
								<Route path="/contact-us" element={<ContactUs />} />
								<Route path="/terms-of-use" element={<TermsOfUse />} />
								<Route path="/privacy-policy" element={<PrivacyPolicy />} />
								<Route path="/cookies-policy" element={<CookiesPolicy />} />
								<Route path="/advertise-with-us" element={<AdvertiseWithUs />} />
							</Routes>
						</AuthProvider>
					</BrowserRouter>
				</CssBaseline>
			</ThemeProvider>
		</HelmetProvider>
	);
}

export default App;
