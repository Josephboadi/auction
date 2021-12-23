import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Navbar.css';
import { useHistory } from 'react-router';
// import avatar from '../../assets/driver.jpg';
// import { logoutAction } from '../../redux/actions/authActions';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // const dispatch = useDispatch();
  // const [role1, setRole1] = useState(null);
  // const history = useHistory();

  // const {
  //   authenticated,
  //   account: { role },
  //   // role,
  //   name,
  //   firstName,
  //   lastName,
  //   pic,
  //   address,
  //   imageUrl,
  // } = useSelector((state) => state.auth);

  // const dat = useSelector((state) => state.auth);

  // // console.log(dat);

  // // useEffect(() => {
  // //   if (dat) {
  // //     setRole1(dat?.role);
  // //   }
  // // }, [role1, setRole1, dat]);

  // const handleLogout = () => {
  //   dispatch(logoutAction(history));
  // };

  return (
    <div className="navbar">
      <div className="nav_icon">
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left"></div>
      <div className="navbar__right">
        {/* {authenticated && role === "ROLE_COMPANY" ? (
          <>
            <Link to="#!">
              <img
                width="30"
                height="30"
                style={{ borderRadius: "50%" }}
                src={dat.imageUrl[0].img}
                alt="avatar"
              />
            </Link>
            <div className="navbar__logout">
              <i className="fa fa-power-off"></i>
              <Link to="/signin" onClick={handleLogout}>
                Log out
              </Link>
            </div>
          </>
        ) : null} */}
      </div>
    </div>
  );
};

export default Navbar;
