import { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Column, Columns, Container, Title, Button, Field, Control, Input } from 'bloomer';
import Page from '../components/Page';
import MovieCard from '../components/MovieCard';
import { getUpcomingMovies, searchMovie } from '../services/api';
import { formatDate } from '../services/filters';

const Index = ({ movies }) => {
  const [list, setList] = useState(movies.results);
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const loadUpcomingMovies = async () => {
    setLoading(true);
    setCurrentPage(1);

    const response = await getUpcomingMovies();

    setList(response.data.results);
    setLoading(false);
  };

  const showMovie = (id) => {
    Router.push({
      pathname: `/show`,
      query: { id },
    });
  };

  const isLastPage = () => currentPage >= movies.total_pages;

  const loadNextPage = async () => {
    setLoading(true);

    const nextPage = currentPage + 1;
    const response = await getUpcomingMovies(nextPage);

    setList([...list, ...response.data.results]);
    setCurrentPage(nextPage);
    setLoading(false);
  };

  const search = async (query) => {
    setLoading(true);

    const response = await searchMovie(query);

    setSearching(true);
    setList(response.data.results);
    setLoading(false);
  };

  const clearSearch = () => {
    setSearching(false);
    setQuery('');
    loadUpcomingMovies();
  };

  return (
    <Page>
      <Head>
        <title>Upcoming Movies</title>
      </Head>
      <Container>
        <Columns isCentered>
          <Column>
            <Title
              isSize={1}
              hasTextAlign="centered"
            >
              Upcoming Movies
            </Title>
          </Column>
        </Columns>
        <Columns isCentered>
          <Column>
            <Field isGrouped style={{ justifyContent: 'center' }}>
              <Control>
                <Input
                  isColor="primary"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setQuery(event.target.value);
                  }}
                  placeholder="Search"
                  value={query}
                />
              </Control>
              <Control>
                {
                  !searching
                  ? (
                    <Button
                      isColor="primary"
                      onClick={() => search(query)}
                    >
                      Search
                    </Button>
                  )
                  : (
                    <Button
                      isColor="primary"
                      onClick={() => clearSearch()}
                    >
                      Clear
                    </Button>
                  )
                }
              </Control>
            </Field>
          </Column>
        </Columns>
        <Columns isMultiline>
          {list.map((movie) => (
            <Column
              isSize={{
                mobile: 'full',
                tablet: '1/2',
                desktop: '1/3',
                widescreen: '1/4',
              }}
              key={movie.id}
              onClick={() => showMovie(movie.id)}
            >
              <MovieCard
                cover={movie.backdrop}
                genres={movie.genres.join(', ')}
                releaseDate={formatDate(movie.release_date)}
                title={movie.title}
              />
            </Column>
          ))}
        </Columns>
        <Columns>
          <Column hasTextAlign="centered">
            {!searching && (
              <Button
                disabled={isLastPage()}
                isColor="primary"
                isLoading={isLoading}
                onClick={loadNextPage}
              >
                Load more
              </Button>
            )}
          </Column>
        </Columns>
      </Container>
    </Page>
  );
};

Index.getInitialProps = async () => {
  const response = await getUpcomingMovies();

  return { movies: response.data };
};

export default Index;
