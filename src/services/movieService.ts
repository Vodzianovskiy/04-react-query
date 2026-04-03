import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { Movie } from "../types/movie";
import { url } from "../types/movie";

interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
}

const fetchMovies = async (
  query: string,
  page: number,
): Promise<FetchMoviesResponse> => {
  const response = await axios.get(url, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
  return response.data;
};

export function useMovies(query: string, page: number) {
  return useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
  });
}
