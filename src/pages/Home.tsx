import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import find from "lodash/find";

import Modal from "../components/modal/Modal";
import DetailView from "../components/detailView/DetailView";
import PageContainer from "../layouts/PageContainer";
import PERSONS from "../data/person.json";
import DataGrid from "../components/dataGrid/DataGrid";
import { useSearchParams, useLocation } from "react-router-dom";
import "../api/index";

const Home = () => {
  const [listData, setListData] = useState<any>([]);
  const [stack, setStack] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    const { data } = await axios.get("employees");
    setListData(data.persons);
    if (id) {
      const selected = find(PERSONS.persons, function (o) {
        return o.id === parseInt(id);
      });
      setSelectedRow(selected);
    }
    setLoading(false);
  };

  const handleRowClick = (data: any) => {
    const { id } = data;
    setSelectedRow(data);
    setSearchParams({ id: id.toString() });

    const currentStack = [...stack];

    currentStack.push(data);
    setStack(currentStack);
  };

  const handleBack = () => {
    const currentStack = [...stack];
    currentStack.pop();
    setStack(currentStack);

    const data = currentStack[currentStack.length - 1];
    const { id } = data;
    setSelectedRow(data);
    setSearchParams({ id: id.toString() });
  };

  const recommendedList: any = useMemo(() => {
    if (isEmpty(selectedRow)) return [];
    let list: any = [];
    let addedIds: string[] = [];
    listData.map((data: any) => {
      selectedRow.specialities.map((speciality: any) => {
        if (
          data.specialities.includes(speciality) &&
          !addedIds.includes(data.id) &&
          data.id !== selectedRow.id
        ) {
          addedIds.push(data.id);
          list.push(data);
        }
      });
    });
    return list;
  }, [listData, selectedRow]);

  return (
    <div>
      <PageContainer>
        <DataGrid
          datas={listData}
          onRowClick={handleRowClick}
          loading={loading}
          className="table-center"
        />
      </PageContainer>

      <Modal
        show={!isEmpty(selectedRow)}
        title={selectedRow.personName}
        onClose={() => {
          setSelectedRow({});
          setSearchParams({});
          setStack([]);
        }}
        onBack={handleBack}
        showBackBtn={stack.length > 1}
      >
        <DetailView
          details={selectedRow}
          recommendedList={recommendedList}
          onListClick={handleRowClick}
        />
      </Modal>
    </div>
  );
};

export default Home;
