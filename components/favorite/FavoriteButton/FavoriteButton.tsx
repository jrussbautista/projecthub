import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

interface Props {
  isFavorite: boolean;
  onClick(): void;
}

const FavoriteButton = ({ isFavorite, onClick }: Props) => {
  return (
    <IconButton aria-label="add to favorites" onClick={onClick}>
      {isFavorite ? (
        <FavoriteIcon color="error" />
      ) : (
        <FavoriteBorderIcon color="error" />
      )}
    </IconButton>
  );
};

export default FavoriteButton;
