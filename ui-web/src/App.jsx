import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './assets/theme.jsx';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
//import './App.css'

import Title from './pages/Title.jsx';
import Home from './pages/Home';
import CategoryArticlesList from './pages/CategoryArticlesList.jsx';
import HotTopics from './pages/HotTopics.jsx';
import Article from './pages/Article.jsx';
import CreateArticle from './pages/CreateArticle';
import CreateArticleTinyMCE from './pages/CreateArticleTinyMCE';
import EditArticle from './pages/EditArticle';

function App() {
	const [count, setCount] = useState(0);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
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
						<Route path="/hot-topics" element={<HotTopics />} />
						{/* <Route path="/auth/create-article/" element={<CreateArticle />} /> */}
						<Route path="/auth/create-article" element={<CreateArticleTinyMCE />} />
						<Route path="/auth/create-article/:id" element={<EditArticle />} />
					</Routes>
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
