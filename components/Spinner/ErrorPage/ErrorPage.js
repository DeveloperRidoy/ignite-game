
export default function ErrorPage() {
    return (
        <div className="container">
            <div className="col-md-6 mx-auto text-center shadow-lg p-4" style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <div className="display-4">Oops! something went wrong</div>
                <p>check your internet connection or try again later.</p>
            </div>
        </div>
    )
}
