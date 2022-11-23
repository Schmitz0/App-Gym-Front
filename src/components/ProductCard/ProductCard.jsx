import React from 'react';
import { seterItem } from "../../redux/actions/defaultAction";
import { useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import style from './ProductCard.module.css';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProductCard = ({ id, title, unit_price, description, picture_url, stock, quantity, render }) => {

	const [expanded, setExpanded] = useState(false);
	const dispatch = useDispatch();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

	const handlerSaveInCheckOut = (event) => {
		event.preventDefault();
		localStorage.setItem(
			`item_${title}`,
			JSON.stringify({
				id: id,
				title: title,
				unit_price: unit_price,
				description: description,
				picture_url: picture_url,
				stock: stock,
				quantity: quantity,
			})
		);
		dispatch(seterItem(localStorage))
		render(`item_${title}`);
	};

	return (
		<Card
			className={style.cardProduct}
			sx={{
				width: 250,
				height: 'fit-content',
				position: 'relative',
				transition: 'all 0.2s ease-out',
			}}
		>
			<CardMedia
				component='img'
				image={picture_url}
				alt='Paella dish'
				sx={{ maxHeight: '200px', margin: '0px auto', width: 'auto' }}
			/>
			<hr className={style.line} />
			<div className={style.priceContainer}>
				<h1>{unit_price}</h1>
				<CardActions sx={{ padding: '0px' }}>
					<Button
						onClick={(event) => handlerSaveInCheckOut(event)}
						variant='outlined'
						startIcon={<ShoppingCartIcon />}
						sx={{
							padding: '5px 10px',
							fontSize: '0.7rem',
							'& .css-1d6wzja-MuiButton-startIcon': {
								marginRight: '6px',
								marginLeft: '0px',
							},
							'& .css-4tfxnd-MuiSvgIcon-root': {
								fontSize: '18px',
							},
						}}
					>
						Agregar
					</Button>
				</CardActions>
			</div>
			<div className={style.nameContainer}>
				<h2>{title}</h2>
				<CardActions sx={{ padding: '0px' }}>
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label='show more'
					>
						<ExpandMoreIcon />
					</ExpandMore>
				</CardActions>
			</div>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<Typography
					paragraph
					sx={{ padding: '0px 12px 12px', marginBottom: '0px' }}
				>
					{description}
				</Typography>
			</Collapse>
		</Card>
	);
};

export default ProductCard;
