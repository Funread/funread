import ContentImage from "../ContentImage/ContentImage";

const PageContainer = ({ title, image, imageWidth, imageAlt, text }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">{title}</h6>
            </div>

            <div className="card-body">
              <div className="card shadow mb-4">
                <div className="card-body">
                  <div className="text-center">
                    <ContentImage
                      image={image}
                      imageWidth={imageWidth}
                      imageAlt={imageAlt}
                    />
                    <p>{text}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
