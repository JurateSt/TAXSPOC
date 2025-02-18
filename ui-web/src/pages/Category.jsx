import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainBar from '../components/MainBar';
// api
import api from '../api/axios';

const Category = () => {
	const { category } = useParams();
	const [articles, setArticles] = useState([]);

	const getArticles = async () => {
		const { data } = await api.get(`/category/${category}`);
		setArticles(data);
	};

	useEffect(() => {
		getArticles();
	}, [category]);

	return (
		<>
			<MainBar />
			<div>CATEGORY {category}</div>

			{articles.map((item) => (
				<div key={item.id} className="mt-2">
					<div>{item.header}</div>
					<div>{JSON.stringify(item.categories)}</div>
				</div>
			))}
		</>
	);
};

export default Category;
