import Head from 'next/head';
import Link from 'next/link';
import { Column, Columns, Container, Title, Breadcrumb, BreadcrumbItem, Image, Content } from 'bloomer';
import Page from '../components/Page';
import { getMovieById } from '../services/api';
import { formatDate } from '../services/filters';

const Show = ({ movie }) => {
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
        <Columns>
          <Column>
            <Breadcrumb>
              <ul>
                <BreadcrumbItem>
                  <Link href="/">
                    <a>Upcoming Movies</a>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem isActive>
                  <a>{movie.title}</a>
                </BreadcrumbItem>
              </ul>
            </Breadcrumb>
          </Column>
        </Columns>
        <Columns>
          <Column
            isSize={{
              tablet: 4,
              widescreen: 3,
            }}
          >
            <Image src={movie.poster} />
          </Column>
          <Column
            isSize={{
              tablet: 8,
              widescreen: 9,
            }}
          >
            <Title>{movie.title}</Title>
            <Content>
              <p>{movie.overview}</p>
              <p><strong>Release date:</strong> {formatDate(movie.release_date)}</p>
              <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
            </Content>
          </Column>
        </Columns>
      </Container>
    </Page>
  );
}

Show.getInitialProps = async ({ query }) => {
  const { id } = query;

  const response = await getMovieById(id);

  return { movie: response.data };
};

export default Show;
