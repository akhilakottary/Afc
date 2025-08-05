import './home-page.css';
import Button from '../../common-components/button';
import clglogo from '../../assets/clg-logo.png';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    const navigate = useNavigate();

    const handleFoodCourtClick = () => {
        navigate('/fc-menu');
        // navigate('/food-court');
    };

    const handleSavouryClick = () => {
        navigate('/savoury-menu');
        // navigate('/savoury');
    };

    return (
        <div className="home-page">
            <div className="overlay-bg">
                <div className="home-wrapper">
                    <div>
                        <img
                            src={clglogo}
                            alt="AIMIT Logo"
                            className="aimit-logo"
                        />
                    </div>

                    <div className="home-buttons">
                        <Button
                            text="Food Court"
                            onClick={handleFoodCourtClick}
                        />
                        <Button
                            text="Savoury"
                            onClick={handleSavouryClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;