import React, { useContext } from 'react';
import GameCard from '../components/GameCard';
import { AppContext } from '../App';

function MyLibrary() {
    const { library } = useContext(AppContext);

    return (
        <section id="library" className="library section">
            <div className="container-fluid">
                <div className="row mb-3">
                    <h1>My Library</h1>
                </div>

                <div className="row">
                    {library.length === 0 ? (
                        <div className="empty-library">
                            <h2>Your library is empty</h2>
                            <p>Go explore games and click the heart icon!</p>
                        </div>
                    ) : (
                        library.map(game => (
                            <GameCard key={game._id} game={game} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

export default MyLibrary;