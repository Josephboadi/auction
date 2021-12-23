import React from 'react';
import './Contact.css';
import { Button } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const Contact1 = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:boadijoseph151@gmail.com">
        <MailOutlineIcon className="mailIcon" fontSize="large" />
        <Button>Mail us</Button>
      </a>
    </div>
  );
};

export default Contact1;
