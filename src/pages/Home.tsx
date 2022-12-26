import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useSearchParams, useLocation } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import find from "lodash/find";

import Modal from "../components/modal/Modal";
import DetailView from "../components/detailView/DetailView";
import PageContainer from "../layouts/PageContainer";
import PERSONS from "../data/person.json";
import DataGrid from "../components/dataGrid/DataGrid";
import { PersonProps } from "../components/detailView/DetailView";

import "../api/index";

const Home = () => {
  const [listData, setListData] = useState<PersonProps[]>([]);
  const [stack, setStack] = useState<PersonProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>({});

  const [searchParams, setSearchParams] = useSearchParams();
  const search = useLocation().search;
  //reading query param id
  const id = new URLSearchParams(search).get("id");

  useEffect(() => {
    //api call to get list of persons
    getList();
  }, []);

  const getList = async () => {
    setLoading(true);
    const { data } = await axios.get("employees");
    setListData(data.persons);
    //if query param present, finding that item from list and setting to state.
    if (id) {
      const selected = find(PERSONS.persons, function (o) {
        return o.id === parseInt(id);
      });
      setSelectedRow(selected);
    }
    setLoading(false);
  };

  const handleSearchParams = (data: PersonProps) => {
    const { id } = data;
    setSelectedRow(data);
    //adding id param to route
    setSearchParams({ id: id.toString() });
  };

  const handleRowClick = (data: PersonProps) => {
    handleSearchParams(data);

    const currentStack = [...stack];
    //adding item to stack array
    currentStack.push(data);
    setStack(currentStack);
  };

  const handleBack = () => {
    const currentStack = [...stack];
    //removing last item from stack array
    currentStack.pop();
    setStack(currentStack);

    const data = currentStack[currentStack.length - 1];
    handleSearchParams(data);
  };

  const recommendedList: PersonProps[] = useMemo(() => {
    if (isEmpty(selectedRow)) return [];
    let list: any = [];
    //addedIds used to avoid duplication in list
    let addedIds: number[] = [];
    listData.map((data: any) => {
      selectedRow.specialities.map((speciality: string) => {
        //finding persons with same specialities
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
