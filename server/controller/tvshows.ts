import { Request, Response, NextFunction } from "express";
import {
  ApiTvShowById,
  ApiTvShowData,
  ApiWatchProviderData,
  TvShow,
} from "../model/util";

// Helpers

const genresList = [
  {
    id: 10759,
    name: "Action & Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
  {
    id: 37,
    name: "Western",
  },
];

type tvShowType = {
  adult: boolean;
  genreIds: number[];
  id: number;
  name: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
  firstAirDate: string;
  rating: number;
  ratingCount: number;
};

const tvShowsHelper = (route: string, params?: {} | null) => {
  let genreParams = "";
  if (params) {
    genreParams = "?" + new URLSearchParams(params).toString();
  }

  return fetch(`${route}${genreParams}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      return response.json();
    })
    .then((body: ApiTvShowData) => {
      const data = body.results;
      const outgoingData = data.map((item) => ({
        adult: item.adult,
        genreIds: item.genre_ids,
        id: item.id,
        name: item.name,
        posterPath: item.poster_path,
        backdropPath: item.backdrop_path,
        overview: item.overview,
        firstAirDate: item.first_air_date,
        rating: item.vote_average,
        ratingCount: item.vote_count,
      }));
      return outgoingData;
    });
};

// Controllers

const getTvShows = (req: Request, res: Response, next: NextFunction) => {
  let params: {} | null = null;
  if (req.query.page) {
    params = {
      page: req.query.page,
      language: "en-US",
    };
  }
  tvShowsHelper("https://api.themoviedb.org/3/discover/tv", params)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getPopular = (req: Request, res: Response, next: NextFunction) => {
  let params: {} | null = null;
  if (req.query.page) {
    params = {
      page: req.query.page,
      language: "en-US",
    };
  }
  tvShowsHelper("https://api.themoviedb.org/3/tv/popular", params)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getTopRated = (req: Request, res: Response, next: NextFunction) => {
  let params: {} | null = null;
  if (req.query.page) {
    params = {
      page: req.query.page,
      language: "en-US",
    };
  }
  tvShowsHelper("https://api.themoviedb.org/3/tv/top_rated", params)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getOnNetflix = (req: Request, res: Response, next: NextFunction) => {
  let params: {} | null = null;
  if (req.query.page) {
    params = {
      page: req.query.page,
      watch_region: "US",
      language: "en-US",
      with_watch_providers: "8",
    };
  }

  console.log(params);

  tvShowsHelper("https://api.themoviedb.org/3/discover/tv", params)
    .then((data) => {
      console.log(data);

      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);

      res.status(400).json({ err: "something went wrong" });
    });
};

const getTvShowsAiringToday = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let params: {} | null = null;
  if (req.query.page) {
    params = {
      page: req.query.page,
      language: "en-US",
    };
  }
  tvShowsHelper(
    "https://api.themoviedb.org/3/tv/airing_today?with_origin_country=US",
    params
  )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getTvShowsOnTheAir = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let params: {} | null = null;
  if (req.query.page) {
    params = {
      language: "en-US",
      with_origin_country: "US",
      sort_by: "popularity.desc",
      page: req.query.page,
    };
  }
  tvShowsHelper("https://api.themoviedb.org/3/discover/tv", params)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getTvShowById = (req: Request, res: Response, next: NextFunction) => {
  Promise.all([
    fetch(
      `https://api.themoviedb.org/3/tv/${req.params.id}?append_to_response=videos,images`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      return response.json();
    }),
    fetch(`https://api.themoviedb.org/3/tv/${req.params.id}/watch/providers`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }).then((res) => res.json()),
    tvShowsHelper(
      `https://api.themoviedb.org/3/tv/${req.params.id}/recommendations`
    ),
    tvShowsHelper(`https://api.themoviedb.org/3/tv/${req.params.id}/similar`),
  ])
    .then(
      (
        body: [
          ApiTvShowById,
          ApiWatchProviderData,
          Array<tvShowType>,
          Array<tvShowType>
        ]
      ) => {
        console.log("xx");

        // if (!body[1]?.results["IN"]) {
        //   body[1].results["IN"] = { buy: [], flatrate: [] };
        // } else if (!body[1]?.results["IN"]?.flatrate) {
        //   body[1].results["IN"].flatrate = [];
        // }
        // const allProviders = [...body[1].results["IN"]?.flatrate];
        // console.log(allProviders);
        // const tvShowWatchProvider = allProviders.map((provider) => ({
        //   logoPath: provider.logo_path,
        //   providerName: provider.provider_name,
        // }));

        const outgoingData = {
          adult: body[0].adult,
          backdropPath: body[0].backdrop_path,
          genres: body[0].genres,
          homepage: body[0].homepage,
          logoPath: body[0].images.logos[0]?.file_path,
          id: body[0].id,
          tvShowWatchProvider: [],
          overview: body[0].overview,
          posterPath: body[0].poster_path,
          status: body[0].status,
          name: body[0].name,
          rating: body[0].vote_average,
          ratingCount: body[0].vote_count,
          seasons: body[0].seasons,
          inProduction: body[0].in_production,
          number_of_episodes: body[0].number_of_episodes,
          firstAirDate: body[0].first_air_date,
          lastAirDate: body[0].last_air_date,
          recommendations: body[2],
          similar: body[3],
        };
        res.status(200).send(outgoingData);
      }
    )
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

const getSearchTvShow = (req: Request, res: Response, next: NextFunction) => {
  let params = `?query=${req.params.searchString}`;
  if (req.query.page) {
    params = `?query=${req.params.searchString}:page=${req.query.page};`;
  }
  fetch(`https://api.themoviedb.org/3/search/tv${params}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      return response.json();
    })
    .then((body: ApiTvShowData) => {
      const data = body.results;
      const outgoingData = data.map((item) => ({
        adult: item.adult,
        genreIds: item.genre_ids,
        id: item.id,
        name: item.name,
        posterPath: item.poster_path,
        backdropPath: item.backdrop_path,
        overview: item.overview,
        firstAirDate: item.first_air_date,
        rating: item.vote_average,
        ratingCount: item.vote_count,
      }));
      res.status(200).send(outgoingData);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};
const getGenre = (req: Request, res: Response, next: NextFunction) => {
  const genrePromiseList: Array<
    Promise<{
      genre: { id: number; name: string };
      allGenreMovieLists: Array<TvShow>;
    }>
  > = [];
  genresList.map((genre) => {
    genrePromiseList.push(
      fetch(
        `https://api.themoviedb.org/3/discover/tv?with_genres=${genre.id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        }
      )
        .then((res) => res.json())
        .then((body: ApiTvShowData) => {
          console.log(body);
          return { genre, allGenreMovieLists: body.results };
        })
    );
  });
  return Promise.all(genrePromiseList).then(
    (
      body: Array<{
        genre: { id: number; name: string };
        allGenreMovieLists: Array<TvShow>;
      }>
    ) => {
      const genreList: Array<{
        genre: { id: number; name: string };
        movie: TvShow;
      }> = [];
      body.forEach((movieList) => {
        movieList.allGenreMovieLists.every((movie) => {
          let isInFlag = false;
          genreList.every((genreMovie) => {
            if (genreMovie.movie.id === movie.id) {
              isInFlag = true;
              return false;
            }
            return true;
          });
          if (!isInFlag) {
            genreList.push({ genre: movieList.genre, movie });
            return false;
          }
          return true;
        });
      });
      res.status(200).json(
        genreList.map((genreItem) => ({
          genre: genreItem.genre,
          backdrop: genreItem.movie.backdrop_path,
        }))
      );
      return;
    }
  );
};

const getTvShowsWithGenres = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let genreParams: {} | undefined;

  genresList.forEach((genre) => {
    if (genre.name.toLowerCase() === req.params.genre.toLocaleLowerCase())
      genreParams = req.query.page
        ? { with_genres: genre.id, page: req.query.page }
        : { with_genres: genre.id };
    return;
  });

  if (!genreParams) {
    res.status(400).json({ err: "invalid genre" });
    return;
  }

  tvShowsHelper("https://api.themoviedb.org/3/discover/tv", genreParams)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: "something went wrong" });
    });
};

export default {
  getTvShows,
  getPopular,
  getTopRated,
  getOnNetflix,
  getGenre,
  getTvShowsAiringToday,
  getTvShowsOnTheAir,
  getTvShowById,
  getSearchTvShow,
  getTvShowsWithGenres,
};
