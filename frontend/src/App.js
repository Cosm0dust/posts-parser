import { Flex } from 'antd';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Flex style={{ width: '100%' }} vertical>
      <Header />
      <Outlet />
    </Flex>
  );
}

export default App;
