export default function Footer(): JSX.Element {
    return (
        <div className="container-fluid bg-light footer  wow fadeIn" data-wow-delay="0.1s">
        <div className="container">
            <div className="row g-5">
                <div className="col-md-12">
                    <h1 className="text-primary mb-3"><img className="img-fluid me-2" src="img/icon-1.png" alt="" style={{width: 45 +'px'}}/>CredCheck</h1>
                    <span>Your best friend to keep your credit card bills in check.</span>
                </div>
            </div>
        </div>
        <div className="container-fluid copyright">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <a href="#">CredCheck</a>, All Right Reserved.
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}