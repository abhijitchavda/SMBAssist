import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Header from 'Containers/Header';
import Footer from 'Components/Footer';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';

import { getForums, updateCurrentForum, getUser } from './actions';

class AppContainer extends Component {
  componentDidMount() {
    const {
      params,
      updateCurrentForum,
      getForums,
      getUser,
    } = this.props;

    
    getForums();

    
    getUser();

    
    const currentForum = params.forum || '';
    updateCurrentForum(currentForum);
  }

  componentDidUpdate() {
    const {
      forums,
      params,
      currentForum,
      updateCurrentForum,
    } = this.props;

    let newCurrentForum = '';
    if (params.forum) newCurrentForum = params.forum;
    else if (forums) newCurrentForum = forums[0].forum_slug;

    
    if (newCurrentForum !== currentForum) updateCurrentForum(newCurrentForum);
  }

  render() {
    const { forums } = this.props;

    
    if (forums) {
      return (
        <div>


          <Header />
          {this.props.children}
          <Footer />
        </div>
      );
    }

    return (
      <div className={styles.loadingWrapper}>Loading...</div>
    );
  }
}

export default connect(
  (state) => { return {
    forums: state.app.forums,
    currentForum: state.app.currentForum,
  }; },
  (dispatch) => { return {
    getForums: () => { dispatch(getForums()); },
    updateCurrentForum: (currentForum) => { dispatch(updateCurrentForum(currentForum)); },
    getUser: () => { dispatch(getUser()); },
  }; }
)(AppContainer);
