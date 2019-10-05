import PropTypes from 'prop-types';
import {
  Card, CardContent, CardImage, Content, Image,
  Media, MediaContent, Subtitle, Title,
} from 'bloomer';

const MovieCard = ({ cover, genres, releaseDate, title }) => (
  <Card>
    <CardImage>
      <Image
        isRatio="16:9"
        src={cover}
      />
    </CardImage>
    <CardContent>
      <Media>
        <MediaContent>
          <Title>{title}</Title>
        </MediaContent>
      </Media>
      <Content>
        <p><strong>Release date:</strong> {releaseDate}</p>
        <p><strong>Genres:</strong> {genres}</p>
      </Content>
    </CardContent>
  </Card>
);

MovieCard.propTypes = {
  cover: PropTypes.string.isRequired,
  genres: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MovieCard;
