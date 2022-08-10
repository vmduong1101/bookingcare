import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage} from 'react-intl';





class HomeFooter extends Component {
    render() {
        
        return (
            <div className="home-footer section-homefooter">
                <p>&copy; 2022 Huỳnh Kim Anh Booking. More information, please visit my fb.<a target="_blank" href='https://www.facebook.com/anhbian.hka/'> &#8594;Click here &#8592;</a></p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
