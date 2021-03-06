import React from 'react';
import merge from 'lodash/merge';
import { Redirect, withRouter } from 'react-router-dom';

import SearchContainer from '../search/search_container';
import HeaderContainer from '../header/header_container';

import ModalRelayContainer from './modal_relay_container';
import { SmallLogo, FrameLogo, FrameLogoWhite } from '../header/new_logo';


class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      currentModal: ((this.props.currentModal) ? this.props.currentModal : null),
      currentUser: this.props.currentUser,
      modalProps: {},
      modalType: null,
      show: this.props.currentModal.isShowing,
      unfix: this.props.unfixHeader,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
      currentModal: nextProps.currentModal,
      unfix: nextProps.unfixHeader,
    });
  }

  handleClick() {
    this.props.history.push('/search');
  }

  selectLogo() {
    if (this.props.location.pathname === '/') {
      return (
        <FrameLogoWhite />
      )
    } else {
      return (
        <FrameLogo />
      )
    }
  }

  render() {
    const toggleType = (
      this.state.show
        ) ? (
          [this.props.hideModal, "modal-backdrop"]
        ) : (
          [this.props.showModal, "no-modal"]
    );

    const modProps = merge(
      {},
      this.state.modalProps,
      { toggle: toggleType[0],
        fetch: this.props.fetchModal,
        show: this.state.show }
    );

    const { unfix, currentModal } = this.state
    return (
      <main className="modal">
        <header className={(unfix) ? "main-header unfix" : "main-header"}>
          <div className="small-logo-wrap" onClick={this.handleClick}>
            { this.selectLogo() }
          </div>
          <HeaderContainer modProp={modProps} unfix={unfix}/>
        </header>
        <div className={toggleType[1]}>
          <div className="modal-detail-box">
            <section className="modal-inner-detail-box">

              <ModalRelayContainer
                modProps={modProps}
                currentModal={currentModal} />
            </section>
          </div>
        </div>
        {this.props.children}
        <div className="contact-footer">
          <div className="contact-github">
            <a href="https://www.github.com/carib">
              <i className="fab fa-github"></i>
            </a>
          </div>
          <div className="contact-linkedin">
            <a href="https://www.linkedin.com/in/carib">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
            <div className="contact-angelist">
            <a href="https://angel.co/carib">
              <i className="fab fa-angellist"></i>
            </a>
          </div>
        </div>
      </main>
    );
  }

}

export default withRouter(Modal);
