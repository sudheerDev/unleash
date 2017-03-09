import React, { Component } from 'react';
import map from 'lodash/map';
import values from 'lodash/values';
import set from 'lodash/set';
import Avatar from 'material-ui/Avatar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { FormattedDate } from 'react-intl';
import { Chronology } from 'react-chronos';

import Loading from './Loading';

let styles = {};

class Dashboard extends Component {

  componentDidMount() {
    this.props.actions.announcementList();
    this.props.actions.newsList();
  }

  renderAnnouncement(announcement) {
    return (
      <article key={announcement.id}>
        <Avatar className="avatar" style={styles.avatar} />
        <div className="event" style={styles.event}>
          <Card style={styles.card}>
            <div style={styles.arrowShadow} />
            <div style={styles.arrow} />
            <CardHeader
              title={announcement.title}
              subtitle={
                <FormattedDate
                  value={announcement.date}
                  year="numeric"
                  month="long"
                  day="2-digit"
                />
              }
            />
            <CardText>{announcement.body}</CardText>
          </Card>
        </div>
      </article>
    );
  }

  renderNews(news) {
    return (
      <article key={news.id}>
        <Avatar className="avatar" style={styles.avatar} />
        <div className="event" style={styles.event}>
          <Card style={styles.card}>
            <div style={styles.arrowShadow} />
            <div style={styles.arrow} />
            <CardHeader
              title={news.title}
              subtitle={
                <FormattedDate
                  value={news.date}
                  year="numeric"
                  month="long"
                  day="2-digit"
                />
              }
            />
          </Card>
        </div>
      </article>
    );
  }

  renderEvent(event) {
    let eventRenderer;
    if (event.type === 'announcement') {
      eventRenderer = this.renderAnnouncement;
    } else if (event.type === 'news') {
      eventRenderer = this.renderNews;
    }

    return eventRenderer(event);
  }

  render() {
    const { announcements, news } = this.props;

    if (announcements.isLoading || announcements.list === null
      || news.isLoading || news.list === null) {
      return <Loading />;
    }

    const announcementList = values(announcements.list)
      .map(item => set(item, 'type', 'announcement'));
    const newsList = values(news.list)
      .map(item => set(item, 'type', 'news'));

    const events = announcementList.concat(newsList)
      .sort((a, b) => b.date - a.date);

    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Today</h2>
        <Chronology
          type="vertical"
          eventSelector=".event"
          markerSelector=".avatar"
          timelineStyle={styles.timeline}
        >
          {map(events, event => this.renderEvent(event))}
        </Chronology>
      </div>
    );
  }
}

Dashboard.propTypes = {
  actions: React.PropTypes.shape({
    announcementList: React.PropTypes.func,
    newsList: React.PropTypes.func,
  }).isRequired,
  announcements: React.PropTypes.shape({
    isLoading: React.PropTypes.bool,
    list: React.PropTypes.object,
  }).isRequired,
  news: React.PropTypes.shape({
    isLoading: React.PropTypes.bool,
    list: React.PropTypes.object,
  }).isRequired,
};

styles = {
  container: {
    margin: '0 20px',
  },
  heading: {
    height: '60px',
    lineHeight: '60px',
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
  },
  timeline: {
    width: '2px',
    backgroundColor: '#aaa',
  },
  event: {
    width: '45%',
  },
  avatar: {
    marginBottom: '10px',
  },
  card: {
    position: 'relative',
    marginBottom: '40px',
  },
};

export default Dashboard;
