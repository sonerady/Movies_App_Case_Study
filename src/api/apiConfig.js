const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "31cb068812af405c01f4970c47e71427",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
