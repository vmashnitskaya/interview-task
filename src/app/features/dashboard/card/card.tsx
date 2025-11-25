import React, { memo } from 'react';
import {
  Button,
  CardActionArea,
  CardActions,
  Card as CardComponent,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

export interface CardProps {
  id: string;
  buttonLabel: string;
  description: string;
  header: string;
  imageUrl: string;
  imageAlt: string;
  onButtonClick: (id: string) => void;
}

const CardElement = ({
  buttonLabel,
  description,
  header,
  id,
  imageAlt,
  imageUrl,
  onButtonClick,
}: CardProps) => {
  const onClick = () => {
    onButtonClick(id);
  };

  return (
    <CardComponent sx={{ maxWidth: 345, minWidth: 345 }}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={imageAlt}
          sx={{ minHeight: 140 }}
        />
        <CardContent sx={{ height: 135, minHeight: 135 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {header}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onClick}>
          {buttonLabel}
        </Button>
      </CardActions>
    </CardComponent>
  );
};

export const Card = memo(CardElement);
