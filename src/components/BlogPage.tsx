'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // next/link ইম্পোর্ট করা হয়েছে
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRight, Search } from 'lucide-react';

// Redux থেকে হুক এবং অ্যাকশন ইম্পোর্ট করুন
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchBlogData } from '@/redux/slice/blogSlice';

export default function BlogPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { articles, categories, status, error } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBlogData());
    }
  }, [status, dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredArticles = useMemo(() => {
    return articles
      .filter(article => selectedCategory ? article.category === selectedCategory : true)
      .filter(article => searchTerm ? article.title.toLowerCase().includes(searchTerm.toLowerCase()) : true);
  }, [articles, searchTerm, selectedCategory]);

  if (status === 'loading' || status === 'idle') {
    return <div className="container mx-auto text-center py-20 font-semibold text-xl">Loading Blog...</div>;
  }

  if (status === 'failed') {
    return <div className="container mx-auto text-center py-20 text-red-500 text-xl">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Our Blog</h1>
          <div className="relative w-full md:w-80">
            <Input
              type="text"
              placeholder="Search our blog..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 h-10 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-10 px-4 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4 lg:sticky top-8 self-start">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-5 text-gray-800 border-b pb-3">Categories</h2>
            <ul className="space-y-1">
              <li>
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors text-gray-700 ${!selectedCategory ? 'bg-blue-50 text-blue-600 font-semibold' : 'hover:bg-gray-100'}`}
                >
                    All Categories
                </button>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors text-gray-700 ${selectedCategory === category ? 'bg-blue-50 text-blue-600 font-semibold' : 'hover:bg-gray-100'}`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-5 text-gray-800 border-b pb-3">Recent Articles</h2>
            <ul className="space-y-4">
              {articles.slice(0, 3).map((article) => (
                <li key={article.id}>
                  {/* --- পরিবর্তন এখানে: Recent Articles এখন ক্লিকযোগ্য --- */}
                  <Link href={`/blog/${article.id}`} className="flex items-start space-x-4 group">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image src={article.image} alt={article.title} layout="fill" objectFit="cover" className="rounded-md" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors leading-snug">{article.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{article.date}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="w-full lg:w-3/4">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredArticles.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group">
                  <Link href={`/blog/${post.id}`} className="relative h-52 w-full block">
                    <Image src={post.image} alt={post.title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" />
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="font-medium text-blue-600 mr-3">{post.category}</span>
                      <span>•</span>
                      <span className="ml-3">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">{post.description}</p>
                    
                    {/* --- পরিবর্তন এখানে: <a> ট্যাগ এখন <Link> --- */}
                    <Link href={`/blog/${post.id}`} className="text-blue-600 font-semibold flex items-center mt-auto group">
                      Read More <ChevronRight className="ml-1 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700">No Articles Found</h2>
                <p className="text-gray-500 mt-2">Try adjusting your search or category filters.</p>
                <Button onClick={() => { setSearchTerm(''); setSelectedCategory(null); }} className="mt-6">Clear All Filters</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}