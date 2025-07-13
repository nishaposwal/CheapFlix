import './App.css';
import Body from './components/Body';
import { Provider, useDispatch } from 'react-redux';
import appStore from './Store/appStore';


function App() {

  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  )
}

export default App;
