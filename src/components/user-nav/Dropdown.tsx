import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useAuth } from "contexts";

interface Props {
  onClose(): void;
  anchorEl: null | HTMLElement;
}

const Dropdown: React.FC<Props> = ({ onClose, anchorEl }) => {
  const { currentUser, logout } = useAuth();

  const history = useHistory();

  const handleNavigateDropDownMenu = (value: string) => {
    onClose();
    switch (value) {
      case "logout":
        logout();
        break;
      case "settings":
        history.push("/settings");
        break;
      case "profile":
        history.push(`/user/${currentUser?.id}`);
        break;
      case "favorites":
        history.push("/favorites");
        break;
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={() => handleNavigateDropDownMenu("profile")}>
        My Profile
      </MenuItem>
      <MenuItem onClick={() => handleNavigateDropDownMenu("favorites")}>
        My Favorites
      </MenuItem>
      <MenuItem onClick={() => handleNavigateDropDownMenu("settings")}>
        My Settings
      </MenuItem>
      <MenuItem onClick={() => handleNavigateDropDownMenu("logout")}>
        <Button color="primary">Log Out</Button>
      </MenuItem>
    </Menu>
  );
};

export default Dropdown;
