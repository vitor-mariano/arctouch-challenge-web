import { useState } from 'react';
import Head from 'next/head';
import { Column, Columns, Container, Title, Button } from 'bloomer';
import axios from 'axios';
import moment from 'moment';
import Page from '../components/Page';
import MovieCard from '../components/MovieCard';
import { getUpcomingMovies } from '../services/api';

const Index = ({ movies }) => {
  const [list, setList] = useState(movies.results);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const isLastPage = () => currentPage >= movies.total_pages;

  const loadNextPage = async () => {
    setLoading(true);

    const nextPage = currentPage + 1;
    const response = await getUpcomingMovies(nextPage);

    setList([...list, ...response.data.results]);
    setCurrentPage(nextPage);
    setLoading(false);
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
            >
              <MovieCard
                cover={movie.backdrop}
                genres={movie.genres.join(', ')}
                releaseDate={moment(movie.release_date).format('MMMM D, YYYY')}
                title={movie.title}
              />
            </Column>
          ))}
        </Columns>
        <Columns>
          <Column hasTextAlign="centered">
            <Button
              disabled={isLastPage()}
              isColor="primary"
              isLoading={isLoading}
              onClick={loadNextPage}
            >
              Load more
            </Button>
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
