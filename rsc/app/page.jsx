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

	if (!articles) return <div>Loading news...</div>;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{articles.map((article, index) => (
				<div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
					<img
						src={article.urlToImage || 'default-news-image.jpg'}
						alt={article.title}
						className="w-full h-48 object-cover"
					/>
					<div className="p-4">
						<h3 className="text-xl font-bold mb-2">{article.title}</h3>
						<p className="text-sm text-gray-600">{article.description}</p>
						<a
							href={article.url}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block mt-2 text-blue-600 hover:underline"
						>
							Read More
						</a>
					</div>
					<Like/>
				</div>
			))}
		</div>
	);
}

export default async function Page() {
	return (
		<>
			<h1 className="text-5xl font-bold text-center text-gray-800 mb-8">Top US Headlines</h1>
			<Suspense fallback="Getting news">
				{/* @ts-expect-error 'Promise<Element>' is not a valid JSX element. */}
				<News />
			</Suspense>
		</>
	);
}
