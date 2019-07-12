import 'flexboxgrid';
import React, { memo } from 'react';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import classnames from 'classnames';

import { Podcast } from 'components/cards';
import { P } from 'components/texts';
import { Link } from 'react-router-dom';

import './index.css';

function EpisodeEle(props) {
  const { index, data, podcastID, style } = props;
  const episode = data[index];
  return (
    <div
      key={`episode_${index}`}
      className="row start-xs middle-xs episodes-list-line"
      style={style}
    >
      <div className="col-xs-6">
        <P>
          <Link className="link" to={`/podcast/${podcastID}/episode/${index}`}>
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
        <P>
          {episode.minutes}:{episode.seconds}
        </P>
      </div>
    </div>
  );
}

const EpisodeEleWithMemo = memo(EpisodeEle);

function List(props) {
  const { episodes, podcastID } = props;
  const numberOfEpisodes = episodes.length;
  const classNames = classnames('episodes-list', {
    'episodes-list--max-height': numberOfEpisodes > 7,
    'episodes-list--md-height': numberOfEpisodes >= 4
  });

  return (
    <Podcast className={classNames}>
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
      <AutoSizer>
        {({ height, width }) => (
          <VariableSizeList
            height={height - 70}
            itemCount={numberOfEpisodes}
            itemData={episodes}
            itemSize={() => 86}
            width={width}
          >
            {props => <EpisodeEleWithMemo {...props} podcastID={podcastID} />}
          </VariableSizeList>
        )}
      </AutoSizer>
    </Podcast>
  );
}

export default List;
