import Loader from "../ui/Loader/Loader";
import _ from "lodash";
import "./DataGrid.css";

export type DataGridProps = {
  datas: any;
  onRowClick: any;
  loading: boolean;
  className?: string;
};

const DataGrid = ({ datas, loading, className, onRowClick }: DataGridProps) => {
  return (
    <div className="data-grid">
      <table className={className}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job Title</th>
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
