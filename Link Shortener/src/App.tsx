import { useState } from 'react';
import './App.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
function App() {
  const [url, setUrl] = useState()
  const [shortendUrl, setShortenedUrl] = useState('')
  const shortenUrl = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${url}`
      )
      const data = await response.json()
      setShortenedUrl(data.result.full_short_link);
    } catch (e) {
      alert(e);
    }
};
  return (
    <div className="app">
      <div className='shortener'>
        <h2>URL shortener</h2>
        {/* form to enter URL to be shortened */}
        <form onSubmit={shortenUrl}>
          <input
            placeholder='Enter URL'
            value={url}
            onChange={(e) => setUrl(e.target.value)}/>
          <button>Submit</button>
        </form>
        {/* Section to view shortened URLS */}
        {shortendUrl &&
          <div className='shortener__viewShot'>
             {shortendUrl}
  <CopyToClipboard text={shortendUrl}>
    <button onClick={() => alert("The URL has been copied")}>copy</button>
  </CopyToClipboard>
          
          </div>
        }
      </div>
    </div>
  );
}
export default App;