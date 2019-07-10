import 'flexboxgrid';
import './index.css';
import React from 'react';
import { Podcast } from 'components/cards';

function List(props) {
  const { episodesAllIds, episodes } = props;
  return (
    <Podcast className="episodes-list">
      {episodesAllIds.map(episodesID => (
        <div
          key={episodesID}
          className="row start-xs middle-xs episodes-list-line"
        >
          <div className="col-xs-6">{episodes[episodesID].trackName}</div>
          <div className="col-xs-3">
            {new Intl.DateTimeFormat(navigator.languages).format(
              new Date(episodes[episodesID].releaseDate)
            )}
          </div>
          <div className="col-xs-3">???</div>
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
