import axios from 'axios';
import { useEffect, useState } from 'react';
import { toCommas, useDebounce } from './utils';
import SkeletonStats from './components/SkeletonStats';

const api = 'https://corona.lmao.ninja/v2/all?yesterday';

function App() {
  const [stats, setStats] = useState();
  const [term, setTerm] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const debounce = useDebounce(term, 300);
  const countryApi = `https://corona.lmao.ninja/v2/countries/${debounce}?yesterday=true&strict=true&query`;

  useEffect(() => {
    const fetchApi = async () => {
      setError(false);
      setLoading(true);
      try {
        const { data } = await axios.get(`${debounce ? countryApi : api}`);
        setStats(data);
      } catch (err) {
        setError(true);
        console.log(err)
      }
      setLoading(false);
    };
    fetchApi();
  }, [debounce, countryApi]);

  return (
    <div className='app-container'>
      <h1 className='font-lg header-text'>Covid-19 Tracker</h1>
      <input
        placeholder='Find your country'
        onChange={(e) => setTerm(e.target.value)}
        className='search-box'
        value={term}
        type='text'
      />

      {loading ? (
        <SkeletonStats />
      ) : error ? (
        <div>
          Something went wrong <br /> Please try again
        </div>
      ) : stats ? (
        <div className='container'>
          <div className='country'>
            {stats.countryInfo && (
              <img src={stats.countryInfo.flag} alt='flag' />
            )}
            <span className='text-bold'>{stats.country || 'World'}</span>
          </div>

          <div>
            <span className='text-highlight'>Total confirmed</span>
            <p className='text-bold font-lg confirmed-cases'>
              {toCommas(stats.cases)}
            </p>
            <span className='green-text'>(+{toCommas(stats.todayCases)})</span>
          </div>

          <div className='divider' />

          <div>
            <span className='text-highlight'>Total deaths</span>
            <p className='text-bold font-md confirmed-deaths'>
              {toCommas(stats.deaths)}
            </p>
            <span className='green-text'>(+{toCommas(stats.todayDeaths)})</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
