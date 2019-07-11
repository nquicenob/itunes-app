import 'flexboxgrid';
import './index.css';
import React from 'react';
import { Podcast } from 'components/cards';
import { P } from 'components/texts';
import { Link } from 'react-router-dom';

function List(props) {
  const { episodes, podcastID } = props;
  return (
    <Podcast className="episodes-list">
      <div className="row start-xs middle-xs episodes-list-line--header">
        <div className="col-xs-6">
          <P bold>Title</P>
        </div>
        <div className="col-xs-3">
          <P bold>Date</P>
        </div>
        <div className="col-xs-3">
          <P bold>Duration</P>
        </div>
      </div>
      {episodes.map((episode, key) => (
        <div
          key={`episode_${key}`}
          className="row start-xs middle-xs episodes-list-line"
        >
          <div className="col-xs-6">
            <P>
              <Link
                className="link"
                to={`/podcast/${podcastID}/episode/${key}`}
              >
                {episode.title}
              </Link>
            </P>
          </div>
          <div className="col-xs-3">
            <P>
              {new Intl.DateTimeFormat(navigator.languages).format(
                new Date(episode.pubDate)
              )}
            </P>
          </div>
          <div className="col-xs-3">
            <P>???</P>
          </div>
        </div>
      ))}
    </Podcast>
  );
}

export default List;

// título, -> trackCensoredName
// fecha de publicación -> releaseDate
// duración.
// {
//   "1243393016_0": {
//     "wrapperType": "track",
//     "kind": "podcast",
//     "collectionId": 1243393016,
//     "trackId": 1243393016,
//     "artistName": "Lofi Hip Hop Producer Andre Ramone",
//     "collectionName": "Lofi Beats Radio",
//     "trackName": "Lofi Beats Radio",
//     "collectionCensoredName": "Lofi Beats Radio",
//     "trackCensoredName": "Lofi Beats Radio",
//     "collectionViewUrl": "https://podcasts.apple.com/us/podcast/lofi-beats-radio/id1243393016?uo=4",
//     "feedUrl": "http://feeds.feedburner.com/lofibeatsradiopodcast",
//     "trackViewUrl": "https://podcasts.apple.com/us/podcast/lofi-beats-radio/id1243393016?uo=4",
//     "artworkUrl30": "https://is4-ssl.mzstatic.com/image/thumb/Music123/v4/73/2c/a6/732ca632-8c4d-7697-ee70-cc3c0449883e/source/30x30bb.jpg",
//     "artworkUrl60": "https://is4-ssl.mzstatic.com/image/thumb/Music123/v4/73/2c/a6/732ca632-8c4d-7697-ee70-cc3c0449883e/source/60x60bb.jpg",
//     "artworkUrl100": "https://is4-ssl.mzstatic.com/image/thumb/Music123/v4/73/2c/a6/732ca632-8c4d-7697-ee70-cc3c0449883e/source/100x100bb.jpg",
//     "collectionPrice": 0,
//     "trackPrice": 0,
//     "trackRentalPrice": 0,
//     "collectionHdPrice": 0,
//     "trackHdPrice": 0,
//     "trackHdRentalPrice": 0,
//     "releaseDate": "2019-02-07T01:38:00Z",
//     "collectionExplicitness": "cleaned",
//     "trackExplicitness": "cleaned",
//     "trackCount": 10,
//     "country": "USA",
//     "currency": "USD",
//     "primaryGenreName": "Music",
//     "contentAdvisoryRating": "Clean",
//     "artworkUrl600": "https://is4-ssl.mzstatic.com/image/thumb/Music123/v4/73/2c/a6/732ca632-8c4d-7697-ee70-cc3c0449883e/source/600x600bb.jpg",
//     "genreIds": [
//       "1310",
//       "26",
//       "1301"
//     ],
//     "genres": [
//       "Music",
//       "Podcasts",
//       "Arts"
//     ],
//     "__id": "1243393016_0"
//   }
// }
