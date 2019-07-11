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
