import Badge from "../ui/Badge/Badge";
import DataGrid from "../dataGrid/DataGrid";
import { Text, Title } from "../ui/Typography/Typography";
import "./DetailView.css";

export type DetailViewProps = {
  details: any;
  recommendedList: any;
  onListClick: any;
};
export type DetailRowProps = {
  name: string;
  value: string;
};

const DetailRow = ({ name, value }: DetailRowProps) => {
  return (
    <div className="detail-content-row">
      <div className="detail-content-item-label">
        <Title level={4} text={name} />
        <Title text={":"} />
      </div>
      <div className="detail-content-item-value">
        <Text text={value} />
      </div>
    </div>
  );
};

const DetailView = ({
  details,
  recommendedList,
  onListClick,
}: DetailViewProps) => {
  const { location, jobTitle, jobDescription, specialities } = details;
  return (
    <div className="detail">
      <div className="detail-content">
        <DetailRow name="Location" value={location} />
        <DetailRow name="Title" value={jobTitle} />
        <DetailRow name="Description" value={jobDescription} />
        <div className="detail-content-row">
          <div className="detail-content-item-label">
            <Title level={4} text="Skills" />
            <Title text=":" />
          </div>
          <div className="detail-content-item-value detail-content-skills">
            {specialities &&
              specialities.map((item: any) => <Badge text={item} key={item} />)}
          </div>
        </div>
      </div>

      <div className="detail-list">
        <Title text="Persons with same skill set" />
        <DataGrid
          datas={recommendedList}
          onRowClick={(data: any) => {
            onListClick(data);
          }}
          loading={false}
          className="table-full"
        />
      </div>
    </div>
  );
};

export default DetailView;
