const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "31cb068812af405c01f4970c47e71427",
  w500ImagePath: `https://image.tmdb.org/t/p/w500${imagePath}`,
  originalImage: (imagePath) =>
    `https://image.tmdb.org/t/p/original/${imagePath}`,
};
