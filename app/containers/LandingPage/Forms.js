import React from 'react';
// import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Form, Label, Input } from '../../components/Forms';
import { FORMS } from './AuthForm';
import { BaseButton } from '../../components/Buttons';
import {
	BREAKPOINT_MOBILE_LARGE,
	BREAKPOINT_MOBILE_SMALL,
} from '../../config/constants';

const PillContainer = styled.div`
	width: 100%;
	background-color: lightgrey;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	> div {
		display: inline-flex;
		vertical-align: middle;
		height: 50px;
		line-height: 50px;
		font-size: 24px;
		font-weight: 600;
		padding: 0 20px;
		@media only screen and (max-width: ${BREAKPOINT_MOBILE_LARGE}px) {
			height: 50px;
			line-height: 50px;
			padding: 0 10px;
			font-size: 18px;
		}
		@media only screen and (max-width: ${BREAKPOINT_MOBILE_SMALL}px) {
			font-size: 14px;
		}
	}
	> div:first-of-type {
		border-top-left-radius: 8px;
	}
	> div:last-of-type {
		border-top-right-radius: 8px;
	}
`;
const Pill = styled.div`
	position: relative;
	z-index: ${({ active }) => (active ? 1 : 0)};
	width: 50%;
	box-sizing: border-box;
	cursor: ${({ active }) => !active && 'pointer'};
	user-select: none;
	background-color: ${({ active }) => active && '#ffffff'};
	> div {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	&:nth-of-type(1) {
		border-top-right-radius: ${({ active }) => active && '8px'};
		border-bottom-right-radius: ${({ active }) => !active && '8px'};
		&::before {
			content: '';
			z-index: ${({ active }) => (active ? 1 : 0)};
			position: absolute;
			border-bottom-left-radius: ${({ active }) => (active ? '8px' : 0)};
			background-color: ${({ active }) => (active ? 'lightgrey' : '#ffffff')};
			left: ${({ active }) => (active ? '100%' : 'calc(100% - 8px)')};
			right: ${({ active }) => (active ? '-8px' : '0')};
			height: 100%;
		}
	}
	&:nth-of-type(2) {
		border-top-left-radius: ${({ active }) => active && '8px'};
		border-bottom-left-radius: ${({ active }) => !active && '8px'};
		&::before {
			content: '';
			z-index: ${({ active }) => (active ? 1 : 0)};
			position: absolute;
			border-bottom-right-radius: ${({ active }) => (active ? '8px' : 0)};
			background-color: ${({ active }) => (active ? 'lightgrey' : '#ffffff')};
			right: ${({ active }) => (active ? '100%' : 'calc(100% - 8px)')};
			left: ${({ active }) => (active ? '-8px' : '0')};
			height: 100%;
		}
	}
`;
const PillShadow = styled.div`
	width: 8px;
	padding: 0 !important;
	background-color: #ffffff;
`;

const StyledForm = styled(Form)`
	border-top-left-radius: ${({ hasHeader }) => (hasHeader ? 'unset' : '8px')};
	border-top-right-radius: ${({ hasHeader }) => (hasHeader ? 'unset' : '8px')};
	> input {
		margin-bottom: 15px;
	}
	> input:last-of-type {
		margin-bottom: 20px;
	}
`;

const FormToggle = ({ activeTab = FORMS.basic, onUpdate }) => (
	<PillContainer>
		<Pill
			id="basic-form-toggle"
			active={activeTab === FORMS.basic}
			onClick={() => onUpdate(FORMS.basic)}
		>
			<div>Easy Signup</div>
		</Pill>
		<Pill
			id="full-form-toggle"
			active={activeTab === FORMS.full}
			onClick={() => onUpdate(FORMS.full)}
		>
			<div>Full Signup</div>
		</Pill>
	</PillContainer>
);

const INPUTS = {
	username: {
		label: 'Username',
		name: 'username',
		type: 'text',
	},
	password: {
		label: 'Password',
		name: 'password',
		type: 'password',
	},
	confirm: {
		label: 'Confirm Password',
		name: 'confirm',
		type: 'password',
	},
};

const FormBuilder = ({
	isLogin,
	signupType,
	formState = {},
	onChange,
	onSubmit,
}) => {
	const showPwField = isLogin || signupType === FORMS.full;
	const fields = [INPUTS.username];

	if (showPwField) fields.push(INPUTS.password);
	if (signupType === FORMS.full) fields.push(INPUTS.confirm);

	return (
		<StyledForm hasHeader onSubmit={onSubmit}>
			{fields.map(({ label, name, type }) => (
				<>
					<Label htmlFor={name}>{label}</Label>
					<Input
						id={name}
						name={name}
						type={type}
						placeholder={name}
						value={formState[name]}
						onChange={onChange}
					/>
				</>
			))}
			<BaseButton>Login</BaseButton>
		</StyledForm>
	);
};

FormBuilder.propTypes = {};

export const UniversalForm = ({ formType, updateFormType, ...rest }) => {
	const isLogin = formType === FORMS.login;
	return (
		<>
			{isLogin ? (
				<PillContainer>
					<Pill active>Login</Pill>
					<PillShadow />
				</PillContainer>
			) : (
				<FormToggle activeTab={formType} onUpdate={updateFormType} />
			)}
			<FormBuilder isLogin={isLogin} signupType={formType} {...rest} />
		</>
	);
};

UniversalForm.propTypes = {};