const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export const searchYouTubeMusic = async (query = "latest hindi songs") => {
  const url = `${BASE_URL}?key=${YOUTUBE_API_KEY}&part=snippet&type=video&maxResults=12&q=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`YouTube API Error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.items || [];
};
