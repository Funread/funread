import ContentImage from "../ContentImage/ContentImage";

const PageContainer = ({ title, image, width, height, imageAlt, text }) => {
  return (
    // <div className="container-fluid">
    //   <div className="row">
    //     <div className="col">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">{title}</h6>
            </div>

            <div className="card-body">
              <div className="card shadow mb-4">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-center">
                    <ContentImage
                      image={image}
                      width={width}
                      height={height}
                      imageAlt={imageAlt}
                    />
                  </div>
                  <div className="text-center mt-2">{text}</div>
                </div>
              </div>
            </div>
          </div>
        /* </div>
      </div>
    </div> */
  );
};

export default PageContainer;
