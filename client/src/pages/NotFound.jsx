import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css"

export default function NotFound(){
    //useNavigate lets me move the user to another page when they click a button
    const navigate = useNavigate();

    //sends the user back to the landing page
    const handleGoHome = () =>{
        navigate("/");
    };
    //sends the user to the dashboard if they want to continue using the app
const handleGoDashboard = () => {
    navigate("/account");
};
return(
    <main className="notfound-page">
        <section className="notfound-shell">
            {/*main card container*/}
            <div className="notfound-hero">
                {/*small label above the heading */}
                <p className="notfound-text">404 Error</p>
                {/*main page heading */}
                <h1 className="notfound-title">Page Not Found</h1>

                {/* explanation for thge user */}
                <p className="notfound-subtitle">
                    Sorry, the page you're looking for doesnt exist or may have been moved.
                </p>

                {/*large 404*/}
                <div className="notfound-code">404</div>
                
                {/*cta section which gives the user clear next steps*/}
                <section className="notfound-actions">
                    <button className="primary-btn"
                    type="button"
                    onClick={handleGoHome}
                    >Go Home</button>

                    {/*back to dashboard btn */}
                    <button
                    className="notfound-secondary-btn"
                    type="button"
                    onClick={handleGoDashboard}>
                        Back to Dashboard
                    </button>
                </section>
            </div>
        </section>
    </main>
    );
}
