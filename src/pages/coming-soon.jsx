import React from "react";

const ComingSoonPage = () => {
  return (
    <section
      className="bg-cover"
      style={{
        marginTop: "-90px",
        backgroundImage: "url(./img/covers/cover-22.jpg)",
      }}
    >
      <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center min-vh-100 pt-13 pb-12">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center text-white">
            {/* Heading */}
            <h1>We are Coming Soon</h1>
            {/* Text */}
            <p className="mb-9 font-size-lg">
              Our team have been working on somesing amazing.
            </p>
            {/* Counter */}
            <div
              className="d-flex justify-content-center mb-10"
              data-countdown
              data-date="Jan 5, 2021 15:37:25"
            >
              <div className="text-center">
                <div className="font-size-h1 font-weight-bolder" data-days>
                  00
                </div>
                <div className="heading-xxs">Days</div>
              </div>
              <div className="px-1 px-md-4">
                <div className="font-size-h2 font-weight-bolder">:</div>
              </div>
              <div className="text-center">
                <div className="font-size-h1 font-weight-bolder" data-hours>
                  00
                </div>
                <div className="heading-xxs">Hours</div>
              </div>
              <div className="px-1 px-md-4">
                <div className="font-size-h2 font-weight-bolder">:</div>
              </div>
              <div className="text-center">
                <div className="font-size-h1 font-weight-bolder" data-minutes>
                  00
                </div>
                <div className="heading-xxs">Minutes</div>
              </div>
              <div className="px-1 px-md-4">
                <div className="font-size-h2 font-weight-bolder">:</div>
              </div>
              <div className="text-center">
                <div className="font-size-h1 font-weight-bolder" data-seconds>
                  00
                </div>
                <div className="heading-xxs">Seconds</div>
              </div>
            </div>
            {/* Form */}
            <form>
              <div className="form-row">
                <div className="col-12 col-md">
                  {/* Input */}
                  <div className="form-group mb-md-0">
                    <label className="sr-only" htmlFor="comingSoonEmail" />
                    <input
                      className="form-control form-control-dark"
                      id="comingSoonEmail"
                      type="email"
                      placeholder="Enter Email *"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-auto">
                  {/* Button */}
                  <button className="btn btn-dark" type="submit">
                    Notify me!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonPage;
