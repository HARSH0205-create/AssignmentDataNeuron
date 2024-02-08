import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function UserTable(props: any) {
  let { users, loading , setSelectedUser , selectedUser } = props;

  return (
    <div className="card">
      {loading ? (
        <div className="container">Loading</div>
      ) : (
        <>
          <h1>User Count {users.length}</h1>
          <DataTable
            value={users}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
            selectionMode="single" selection={selectedUser} onSelectionChange={(e) => setSelectedUser(e.value)}
          >
            <Column
              field="first_name"
              sortable
              header="First Name"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="last_name"
              sortable
              header="Last Name"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="email"
              sortable
              header="Email"
              style={{ width: "50%" }}
            ></Column>
          </DataTable>
        </>
      )}
    </div>
  );
}

export default UserTable;
