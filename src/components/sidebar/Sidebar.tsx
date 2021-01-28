import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

type Anchor = "top" | "left" | "bottom" | "right";

interface Props {
  anchor: Anchor;
  open: boolean;
  toggle(): void;
}

const useStyles = makeStyles({
  sidebarContainer: {
    width: 250,
    padding: 10,
  },
});

const Sidebar: React.FC<Props> = ({
  children,
  anchor,
  open = false,
  toggle,
}) => {
  const classes = useStyles();

  const toggleDrawer = () => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    toggle();
  };

  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onClose={toggleDrawer()}
      onOpen={toggleDrawer()}
    >
      <div className={classes.sidebarContainer}>{children}</div>
    </SwipeableDrawer>
  );
};

export default Sidebar;
