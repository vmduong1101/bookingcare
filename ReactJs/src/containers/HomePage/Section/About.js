import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage} from 'react-intl';





class About extends Component {
    render() {
        
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói về hệ thống đặt lịch
                </div>
                <div className="section-about-content">
                    <div className="section-left">
                        <iframe width="100%" height="350" 
                        src="https://www.youtube.com/embed/eJSD1CgHcKI" 
                        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                        </iframe>
                    </div>
                    <div className="section-right">
                        <p>"Trở thành một bác sĩ mang lại sự kết hợp và sự liên tục 
                            hoàn chỉnh nhất của ba phẩm chất có sức quyến rũ lớn nhất đối với 
                            những trí tuệ trong sáng và năng động, 
                            đó là sự mới lạ, sự hữu dụng và lòng bác ái."</p>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
