import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import ThreeDot from "components/atoms/button/threeDot/ThreeDot";

type menuLists = {
  title: string;
  onClick: any;
}[];

const ThreeDotMenu = (props: { menuLists: menuLists; id: number }) => {
  const { menuLists, id } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ThreeDot onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuLists.map((list) => (
          <MenuItem key={list.title} onClick={() => list.onClick(id)}>
            {list.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ThreeDotMenu;
