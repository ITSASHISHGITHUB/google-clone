import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Layout from './components/Layouts';


const App = () => {
  const [go, setGo] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <Navbar setGo={setGo} setSearchTerm={setSearchTerm} />
      <Layout go={go} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
