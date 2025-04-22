import React from "react";
import './A_generate.css';
import axios from "axios";

class Generate_interest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGenerated: false,
            lastGeneratedDate: null
        };
    }

    componentDidMount() {
        this.fetchLastDate();
    }

    fetchLastDate = () => {
        axios.post("http://localhost/digital_miniloan_backend/A_last_due.php").then(response => {
            if (response.data !== "") {
                const last = response.data.last;

                this.setState({ lastGeneratedDate: last }, () => {
                    const today = new Date();
                    const day = String(today.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
                    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month (0-based) and pad
                    const year = today.getFullYear(); // Get the full year

                    // Format as "d-m-Y"
                    const formattedDate = `${day}-${month}-${year}`;

                    if (this.state.lastGeneratedDate === formattedDate) {
                        this.setState({ isGenerated: true });
                    }
                });
            } else {
                this.setState({ lastGeneratedDate: null });
            }
        });
    };

    handleGenerateInterests = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month (0-based) and pad
        const year = today.getFullYear(); // Get the full year

        // Format as "d-m-Y"
        const formattedDate = `${day}-${month}-${year}`;

        if (this.state.lastGeneratedDate === formattedDate) {
            alert("Interests can only be generated once per day.");
            this.setState({ isGenerated: true });
            return;
        }

        axios.post("http://localhost/digital_miniloan_backend/intrest.php").then(response => {
            if (response.data === "Success") {
                alert("Interests Updated Successfully");
                this.setState({
                    isGenerated: true,
                    lastGeneratedDate: formattedDate
                });
            } else {
                alert("Interests Updation Failed");
            }
        }).catch(error => {
            console.error("Failed to generate interests", error);
            alert("Failed to generate interests. Please try again.");
        });
    };

    render() {
        const { isGenerated, lastGeneratedDate } = this.state;
        const today = new Date().toLocaleDateString();

        return (
            <div className="generate-interest-container">
                <div className="generate-interest-card">
                    <h1 className="page-title">Generate Interests</h1>

                    <div className="info-banner">
                        <i className="info-icon">ℹ️</i>
                        <p className="info-text">
                            Administrators are only permitted to generate interests once per day.
                            Subsequent attempts will be restricted.
                        </p>
                    </div>

                    <div className="generate-button-section">
                        <button
                            onClick={this.handleGenerateInterests}
                            disabled={isGenerated}
                            className={`generate-button ${isGenerated ? 'generated' : ''}`}
                        >
                            {isGenerated ? (
                                <>
                                    <span className="checkmark">✓</span>
                                    Interests Generated
                                </>
                            ) : (
                                "Generate Interests"
                            )}
                        </button>

                        {isGenerated && (
                            <div className="generation-confirmation">
                                Interests were successfully generated on {today}
                            </div>
                        )}
                    </div>

                    <div className="generation-footer">
                        <p className="last-generation">
                            Last Generation: {lastGeneratedDate ? lastGeneratedDate : 'Never'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Generate_interest;
