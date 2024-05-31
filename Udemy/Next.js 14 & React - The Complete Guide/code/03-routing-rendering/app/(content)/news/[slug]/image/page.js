import { notFound } from 'next/navigation';

import { DUMMY_NEWS } from '@/dummy-news';

export default function ImagePage({ params }) {
  const newsItemSlug = params.slug;
  const newsItem = DUMMY_NEWS.find((newsItem) => {
    return newsItem.slug === newsItemSlug;
  });
  console.log('Console ~ newsItem ~ newsItem:', newsItem);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
}
