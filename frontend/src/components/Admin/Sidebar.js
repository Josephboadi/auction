import React from "react";
import "./sidebar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.seller);
  return (
    <div className="sidebar">
      <Link to="#">
        <img
          style={{
            borderRadius: "100%",
            marginLeft: 20,
            width: 100,
            height: 100,
          }}
          src={user?.avatar?.url}
          alt="Ecommerce"
        />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link>
        {/* <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}>
          <TreeItem nodeId="1" label="Products"> */}
        <Link to="/admin/products">
          {/* <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} /> */}
          <p>
            <PostAddIcon />
            Products
          </p>
        </Link>

        {/* <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView> */}
      </Link>
      {/* <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link> */}
      {/* <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link> */}
    </div>
  );
};

export default Sidebar;
