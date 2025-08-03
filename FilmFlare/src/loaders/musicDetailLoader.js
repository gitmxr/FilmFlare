export const musicDetailLoader = async ({ request, params }) => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const { id } = params;
  const url = new URL(request.url);
  const pageToken = url.searchParams.get("pageToken") || "";

  const detailRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`
  );
  const detailData = await detailRes.json();
  const video = detailData.items?.[0];

  const similarUrl = new URL("https://www.googleapis.com/youtube/v3/search");
  similarUrl.searchParams.set("part", "snippet");
  similarUrl.searchParams.set("type", "video");
  similarUrl.searchParams.set("maxResults", "8");
  similarUrl.searchParams.set("key", API_KEY);
  similarUrl.searchParams.set("q", video.snippet.title);
  if (pageToken) similarUrl.searchParams.set("pageToken", pageToken);

  const searchRes = await fetch(similarUrl);
  const searchData = await searchRes.json();

  return {
    videoId: id,
    title: video.snippet.title,
    channelTitle: video.snippet.channelTitle,
    similarSongs: searchData.items.filter((s) => s.id.videoId !== id),
    nextPageToken: searchData.nextPageToken,
    prevPageToken: searchData.prevPageToken,
  };
};
