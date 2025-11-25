// src/app/blog/[id]/page.tsx

'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchBlogData } from '@/redux/slice/blogSlice';
import { ArrowLeft } from 'lucide-react';

export default function BlogDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const { id } = params;

  const { articles, status, error } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBlogData());
    }
  }, [status, dispatch]);

  // URL থেকে পাওয়া id দিয়ে নির্দিষ্ট আর্টিকেলটি খুঁজে বের করা
  const article = articles.find(art => art.id === Number(id));

  if (status === 'loading' || status === 'idle') {
    return <div className="text-center py-20 font-semibold">Loading article...</div>;
  }
  
  if (status === 'failed') {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  if (!article) {
    return <div className="text-center py-20 font-semibold">Article not found.</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <main className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog Link */}
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:underline mb-8 group">
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to All Articles
          </Link>

          {/* Article Header */}
          <div className="mb-6">
            <span className="text-blue-600 font-semibold">{article.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 my-3">{article.title}</h1>
            <p className="text-gray-500">{article.date}</p>
          </div>

          {/* Article Image */}
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
            <Image src={article.image} alt={article.title} layout="fill" objectFit="cover" />
          </div>

          {/* Article Content */}
          <article className="prose lg:prose-xl max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg italic text-gray-600 mb-6">{article.description}</p>
            {/* details section */}
            <p>{article.details}</p>
          </article>
        </div>
      </main>
    </div>
  );
}