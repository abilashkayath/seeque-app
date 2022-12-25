import Loader from "../ui/Loader/Loader";
import _ from "lodash";
import "./DataGrid.css";

export type DataGridProps = {
  datas: any;
  onRowClick: any;
  loading: boolean;
};

const DataGrid = ({ datas, loading, onRowClick }: DataGridProps) => {
  console.log();
  return (
    <div className="data-grid">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job title</th>
          </tr>
        </thead>
        {loading ? (
          <Loader />
        ) : _.isEmpty(datas) ? (
          <div className="data-grid-nodata">
            <h5>No data present</h5>
          </div>
        ) : (
          <tbody>
            {datas.map((data: any) => (
              <tr key={data.id} onClick={() => onRowClick(data)}>
                <td>{data.personName}</td>
                <td>{data.jobTitle}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default DataGrid;