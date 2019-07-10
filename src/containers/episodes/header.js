import './index.css';
import React from 'react';
import { Podcast } from 'components/cards';
import { H1 } from 'components/texts';

function Header(props) {
  return (
    <Podcast className="episodes-header">
      <H1 left>Episodes: {props.numberOfEpisodes}</H1>
    </Podcast>
  );
}

export default Header;
