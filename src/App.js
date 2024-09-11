import React from 'react';
import { NotSignedInSection } from './components/NotSignedInSection';

function App() {
  const UserProfile = null;
  return (
    <>
    {
      UserProfile ? 
      <div>
        hi
      </div> 
      : 
      <NotSignedInSection />
    }
    </>
  );
}

export default App;
