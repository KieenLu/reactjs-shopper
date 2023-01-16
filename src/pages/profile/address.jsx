import React from "react";

export const ProfileAddress = () => {
  return (
    <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
      <div className="row">
        <div className="col-12 col-lg-6">
          {/* Card */}
          <div className="card card-lg bg-light mb-8">
            <div className="card-body">
              {/* Heading */}
              <h6 className="mb-6">Shipping Address</h6>
              {/* Text */}
              <p className="text-muted mb-0">
                Daniel Robinson <br />
                3997 Raccoon Run <br />
                Kingston <br />
                45644 <br />
                United States <br />
                6146389574
              </p>
              {/* Action */}
              <div className="card-action card-action-right">
                {/* Button */}
                <a
                  className="btn btn-xs btn-circle btn-white-primary"
                  href="account-address-edit.html"
                >
                  <i className="fe fe-edit-2" />
                </a>
                {/* Button */}
                <button className="btn btn-xs btn-circle btn-white-primary">
                  <i className="fe fe-x" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          {/* Card */}
          <div className="card card-lg bg-light mb-8">
            <div className="card-body">
              {/* Heading */}
              <h6 className="mb-6">Billing Address</h6>
              {/* Text */}
              <p className="text-muted mb-0">
                Daniel Robinson <br />
                3997 Raccoon Run <br />
                Kingston <br />
                45644 <br />
                United States <br />
                6146389574
              </p>
              {/* Action */}
              <div className="card-action card-action-right">
                {/* Button */}
                <a
                  className="btn btn-xs btn-circle btn-white-primary"
                  href="account-address-edit.html"
                >
                  <i className="fe fe-edit-2" />
                </a>
                {/* Button */}
                <button className="btn btn-xs btn-circle btn-white-primary">
                  <i className="fe fe-x" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          {/* Button */}
          <a
            className="btn btn-block btn-lg btn-outline-border"
            href="account-address-edit.html"
          >
            Add Address <i className="fe fe-plus" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default ProfileAddress;
