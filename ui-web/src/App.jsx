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
import NotFound from './pages/NotFound.jsx';
// CMS
import CMSHome from './pages/CMS/Home.jsx';
import CMSAuthors from './pages/CMS/Authors.jsx';
import CMSArticles from './pages/CMS/Articles.jsx';
import CMSArticle from './pages/CMS/Article.jsx';
import PreviewArticle from './pages/CMS/PreviewArticle.jsx';

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
									<Route path="/cms/auth/home" element={<CMSHome />} />
									<Route path="/cms/auth/authors" element={<CMSAuthors />} />
									<Route path="/cms/auth/articles" element={<CMSArticles />} />
									<Route path="/cms/auth/articles/:id" element={<CMSArticle />} />
									<Route path="/cms/auth/create-article" element={<CreateArticleTinyMCE />} />
									<Route path="/cms/auth/create-article/:id" element={<EditArticle />} />
									<Route path="/cms/auth/articles/preview/:slug" element={<PreviewArticle />} />
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

								<Route path="/about" element={<AboutUs />} />
								<Route path="/contact" element={<ContactUs />} />
								<Route path="/terms-of-use" element={<TermsOfUse />} />
								<Route path="/privacy-policy" element={<PrivacyPolicy />} />
								<Route path="/cookies-policy" element={<CookiesPolicy />} />
								<Route path="/advertise-with-us" element={<AdvertiseWithUs />} />
								<Route path="/404" element={<NotFound />} />
								<Route path="*" element={<NotFound />} />
							</Routes>
						</AuthProvider>
					</BrowserRouter>
				</CssBaseline>
			</ThemeProvider>
		</HelmetProvider>
	);
}

export default App;
