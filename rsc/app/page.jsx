import { Suspense } from 'react';
import Like from './Like.jsx';

async function News() {
	async function fetchNews() {
		const apiKey = '2f51b119b4ea4c7ea40e453d3748c17f';
		const response = await fetch(
			`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
		);
		if (!response.ok) {
			throw new Error('Failed to fetch news');
		}
		return await response.json();
	}

	let articles = [];
	try {
		const newsData = await fetchNews();
		articles = newsData.articles;
	} catch (error) {
		console.error('Error fetching news:', error);
		articles = [];
	}

	if (!articles) return <div className="text-center text-lg">Loading news...</div>;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{articles.map((article, index) => (
				<div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
					<div className="relative">
						<img
							src={article.urlToImage || '/default-news-image.jpg'}
							alt={article.title}
							className="w-full h-64 object-cover brightness-90 hover:brightness-100 transition-all duration-300"
						/>
						<Like className="absolute bottom-2 right-2"/>
					</div>
					<div className="p-6">
						<h3 className="text-2xl font-semibold mb-3 line-clamp-2">{article.title}</h3>
						<p className="text-gray-700 text-sm mb-4 line-clamp-3">{article.description}</p>
						<a
							href={article.url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-indigo-600 font-medium hover:text-indigo-500 transition-colors"
						>
							Read More
						</a>
					</div>
				</div>
			))}
		</div>
	);
}

export default async function Page() {
	return (
		<>
			<h1 className="text-6xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">Top US Headlines</h1>
			<Suspense fallback={<div className="text-center text-lg">Getting news</div>}>
				<News />
			</Suspense>
		</>
	);
}
