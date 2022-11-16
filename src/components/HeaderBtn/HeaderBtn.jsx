import React from 'react';
import BtnFilter from '../BtnFilter/BtnFilter';
import style from './HeaderBtn.module.css';

const HeaderBtn = ({ title }) => {
	return (
		<div className={style.mainContainer}>
			<div className={style.infoContainer}>
				<h1 className={style.title}>{title}</h1>
				<BtnFilter />
			</div>
			<hr />
		</div>
	);
};

export default HeaderBtn;