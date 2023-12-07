import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import Loader from "../Layout/Loader";
import "./Profile.css";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.userAuth);

  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <MetaData title={"Profile"}></MetaData>
          <div className="container container-fluid">
            <h2 className="mt-5 ml-5">My Profile</h2>
            <div className="row justify-content-around mt-5 user-info">
              <div className="col-12 col-md-3">
                <figure className="avatar avatar-profile">
                  <img className="rounded-circle img-fluid" src="" alt="" />
                </figure>
                <Link 
                  to={"/update"}                  
                  id="edit_profile"
                  className="btn btn-primary btn-block my-5"
                >
                  Edit Profile
                </Link>
              </div>

              <div className="col-12 col-md-5">
                <h4>Full Name</h4>
                <p>Ghulam Abbas</p>

                <h4>Email Address</h4>
                <p>{user && user.email}</p>

                <Link to={"/orders/user"} className="btn btn-danger btn-block mt-5">
                  My Orders
                </Link>

                <Link to={"/password/apdate"} className="btn btn-primary btn-block mt-3">
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
