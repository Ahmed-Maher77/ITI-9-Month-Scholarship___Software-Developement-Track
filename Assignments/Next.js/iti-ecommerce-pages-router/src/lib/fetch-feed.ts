export interface FeedQuote {
  id: number;
  quote: string;
  author: string;
}

export interface FeedNews {
  id: number;
  title: string;
  body: string;
}

export interface FeedData {
  quotes: FeedQuote[];
  news: FeedNews[];
}

export async function getFeed(): Promise<FeedData> {
  try {
    const [quotesRes, newsRes] = await Promise.all([
      fetch('https://dummyjson.com/quotes?limit=3', { next: { revalidate: 300 } }),
      fetch('https://dummyjson.com/posts?limit=3', { next: { revalidate: 300 } }),
    ]);

    const quotesData = quotesRes.ok ? await quotesRes.json() : { quotes: [] };
    const newsData = newsRes.ok ? await newsRes.json() : { posts: [] };

    return {
      quotes: (quotesData.quotes ?? []).map(
        (q: { id: number; quote: string; author: string }) => ({
          id: q.id,
          quote: q.quote,
          author: q.author,
        })
      ),
      news: (newsData.posts ?? []).map(
        (p: { id: number; title: string; body: string }) => ({
          id: p.id,
          title: p.title,
          body: p.body.slice(0, 120) + (p.body.length > 120 ? '…' : ''),
        })
      ),
    };
  } catch {
    return { quotes: [], news: [] };
  }
}
