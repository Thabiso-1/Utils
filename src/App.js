import './App.css';
import Posts from './components/posts/posts';
import Download from './components/download.components';
import Navigation from './components/navigation/navigation.components';
import Upload from './components/upload/upload.components';
//import TableDisplay from './components/tableDisplay.components';

function App() {
  return (
    <div>
      <Navigation />
      <Upload />
      <Posts />
      <Download />
    </div>
  );
}

export default App;
