import { Responsive, WidthProvider } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import UserTable from "./molecules/user.table";
import UserForm from "./molecules/user.register";
import { useEffect, useState } from "react";
import { getUserData } from "./services/user.service";

const ResponsiveGridLayout = WidthProvider(Responsive);
// Determines the screen breakpoints for the columns
const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 320 };
// How many columns are available at each breakpoint
const cols = { lg: 4, md: 4, sm: 1, xs: 1, xxs: 1 };

function App() {

  const [users, setUsers] = useState([]);

  const [selectedUser , setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(true);

  const [reLoading, setreLoading] = useState(true);


  useEffect(() => {
    getUserData()
      .then((users: any) => {
        setUsers(users);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() =>{
    getUserData()
    .then((users: any) => {
      setUsers(users);
    })
    .finally(() => {
      setLoading(false);
    });
  } , [reLoading])

  return (
    <div>
      <ResponsiveGridLayout
        isDraggable={true}
        isResizable={true}
        breakpoints={breakpoints}
        cols={cols}
      >
        <div key="1" id="1" data-grid={{ x: 0, y: 0, w: 1, h: 3.5 }}>
          <UserForm reLoading={reLoading} setreLoading={setreLoading} selectedUser={selectedUser}/>
        </div>
        <div key="2" id="2" data-grid={{ x: 2, y: 0, w: 3, h: 3.5 }}>
          <div className="container mt-5 center">
            <UserTable selectedUser={selectedUser} setSelectedUser={setSelectedUser} users={users} loading={loading}/>
          </div>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}

export default App;
