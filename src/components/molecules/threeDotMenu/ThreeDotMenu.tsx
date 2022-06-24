import { useState } from "react";

import { Menu, MenuItem } from "@mui/material";

import ThreeDot from "components/atoms/button/threeDot/ThreeDot";
// import { userBlogTitlesMenuItem } from "./menuItem";

// type PROPS = {
//   blankRemovalName: string;
//   category: string;
//   fileNames: string[];
//   draftBlogId: string;
//   imageDbUrls: string[];
//   likes: string[];
//   mainWorld: string;
//   publicBlogId: string;
//   textArea: string;
//   title: string;
//   user: USER;
// };

const ThreeDotMenu = () => {
  // const {
  //   blankRemovalName,
  //   category,
  //   fileNames,
  //   draftBlogId,
  //   imageDbUrls,
  //   likes,
  //   mainWorld,
  //   publicBlogId,
  //   textArea,
  //   title,
  //   user,
  // } = props;

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
        {/* {userBlogTitlesMenuItem.map((item) => */}
        item.title === "日記を公開する" ? (
        <MenuItem
        // onClick={() =>
        //   item.onClick(
        //     blankRemovalName,
        //     category,
        //     fileNames,
        //     draftBlogId,
        //     imageDbUrls,
        //     likes,
        //     mainWorld,
        //     publicBlogId,
        //     textArea,
        //     title,
        //     user
        //   )

        // key={item.title}
        >
          {/* {item.title} */}
        </MenuItem>
        ) : (
        <MenuItem
        // onClick={() =>
        //   item.onClick(blankRemovalName, draftBlogId, publicBlogId)
        // }
        // key={item.title}
        >
          {/* {item.title} */}
        </MenuItem>
        ){/* )} */}
      </Menu>
    </div>
  );
};

export default ThreeDotMenu;
