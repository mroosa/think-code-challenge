import { useState } from 'react';
import { InputSelect, InputRadio, InputNumber } from './Inputs'

const Main = () => {

    const [loading, setLoading] = useState('loaded');

    if (loading === 'loading') {
        return (
            <>
                <main className="loading">
                    <h2>Loading...</h2>
                </main>
                <footer></footer>
            </>
        )
    }

    return (
        <>
            <main>

                <div className="input-row">
                    <InputSelect />
                </div>

                <div className="input-row">
                    <InputSelect />
                </div>

                <div className="input-row">
                    <InputRadio />
                </div>

                <div className="input-row">
                    <InputNumber />
                </div>

            </main>
        </>
    )
}

export default Main