import { useState } from "react";

export default function InvestmentForm({ onChangeDispatched, userInput }) {

    return (
        <form id="user-input">
            <div className="input-group">
                <div>
                    <p>
                        <label htmlFor="">INITIAL INVESTMENT</label>
                        <input type="number"
                            onChange={(event) => { onChangeDispatched('initialInvestment', event.target.value) }}
                            required
                            value={userInput.initialInvestment}
                        />
                    </p>
                </div>
                <div>
                    <p>
                        <label htmlFor="">ANNUAL INVESTMENT</label>
                        <input type="number"
                            onChange={(event) => { onChangeDispatched('annualInvestment', event.target.value) }}
                            required
                            value={userInput.annualInvestment}
                        />
                    </p>
                </div>
            </div>
            <div className="input-group">
                <div>
                    <p>
                        <label htmlFor="">EXPECTED RETURN</label>
                        <input type="number"
                            onChange={(event) => { onChangeDispatched('expectedReturn', event.target.value) }}
                            required
                            value={userInput.expectedReturn}
                        />
                    </p>
                </div>
                <div>
                    <p>
                        <label htmlFor="">DURATION</label>
                        <input type="number"
                            onChange={(event) => { onChangeDispatched('duration', event.target.value) }}
                            required
                            value={userInput.duration}
                        />
                    </p>
                </div>
            </div>
        </form>
    );
}