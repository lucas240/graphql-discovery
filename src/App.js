import "./App.css";
import { useQuery, gql } from "@apollo/client";

const LAUNCH_QUERY = gql`
  {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(LAUNCH_QUERY);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.launches.map(({ launch_date_utc, details, rocket, links }) => (
    <div key={launch_date_utc}>
      <h3>{rocket.rocket_name}</h3>
      <p>date: {launch_date_utc}</p>
      <p>details: {details}</p>
      <a href={links.video_link}> launch link</a>
    </div>
  ));
}

export default App;
