/**
 *
 * HomePage
 *
 */

import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectHomePage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";


export function HomePage() {
	useInjectReducer({ key: "homePage", reducer });
	useInjectSaga({ key: "homePage", saga });

	return (
		<div>
			This is the home page
		</div>
	)
}

HomePage.propTypes = {
	dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
	homePage: makeSelectHomePage()
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps
);

export default compose(withConnect)(HomePage);
