import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import DataList from "./Data-List";

function App() {
  const [listData, setListData] = useState();
  const [groupData, setGroupData] = useState();
  const [groupName, setGroupName] = useState();

  // const [allGroupData, setAllGroupData] = useState();

  const [singleG, setSingleG] = useState();
  const [singleGN, setSingleGN] = useState();

  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://hpedelta.com:8983/solr/credits/select?fq=standard_credits:[*%20TO%20101]&group.field=title&group.limit=10&group.mincount=1&group.sort=standard_credits%20asc&group=true&indent=on&q=*:*&wt=json"
      )
      .then((res) => {
        const fetchedData = res.data;
        const groupDatas = fetchedData.grouped.title.groups;
        setGroupData(groupDatas);

        // console.log("data is : ", groupDatas);

        setSingleG(groupDatas[0].doclist.docs);
        setSingleGN(groupDatas[0].groupValue);
      });
  }, []);

  // console.log("single g is : ", singleG);

  const setListAarray = (e) => {
    const data = JSON.parse(e);
    setListData(data.doclist.docs);
    setGroupName(data.groupValue);
  };

  // console.log(viewAll)

  // if(viewAll){

  //   return groupData.map(group=>{
  //    return <DataList
  //       groupName={group.groupValue}
  //       listData={group.doclist.docs}
  //     />
  //   })}

  // }

  return (
    <div className="App">
      <div className="groupDataSection">
        <div className="groupData">
          <h1 className="service-header">Servie Credits Recommendation</h1>

          <div className="filter-section">
            <div className="select Group">
              <label for="tutorial_choice" className="choose-filter"></label>

              <select onChange={(e) => setListAarray(e.target.value)}>
                <option value="">Filter</option>
                {groupData &&
                  groupData.map((data) => {
                    return (
                      <option
                        key={data.groupValue}
                        value={JSON.stringify(data)}
                      >
                        {data.groupValue}
                      </option>
                    );
                  })}
              </select>
            </div>

            <button onClick={() => setViewAll(!viewAll)} className={viewAll ? "view-all-2" : "view-all"}>
              {viewAll ? "Close View All" :  "View All Services"}
            </button>
          </div>
        </div>
      </div>

      {viewAll ? (
        groupData.map((group) => {
          return (
            <DataList
              groupName={group.groupValue}
              listData={group.doclist.docs}
            />
          );
        })
      ) : (
        <div className="data-list">
          {(groupName && <h1>{groupName}</h1>) || <h1>{singleGN}</h1>}
          {listData ? (
            <table className="list-table">
              <thead>
                <tr>
                  <th className="table-head">Service Activity</th>
                  <th className="table-head">Service Description</th>
                  <th className="table-head">Service Credits</th>
                  <th className="table-head"> Action </th>
                </tr>
              </thead>
              <tbody>
                {listData &&
                  listData.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td className="table-body">{data.service_activity}</td>
                        <td className="table-body">
                          {data.service_description}
                        </td>
                        <td className="table-body standart-credits">
                          {data.standard_credits}
                        </td>
                        <td className="table-body">
                          <button className="select-button">Select</button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <table className="list-table">
              <thead>
                <tr>
                  <th className="table-head">Service Activity</th>
                  <th className="table-head">Service Description</th>
                  <th className="table-head">Service Credits</th>
                  <th className="table-head"> Action </th>
                </tr>
              </thead>
              <tbody>
                {singleG &&
                  singleG.map((data) => {
                    return (
                      <tr key={data.id}>
                        <td className="table-body">{data.service_activity}</td>
                        <td className="table-body">
                          {data.service_description}
                        </td>
                        <td className="table-body standart-credits">
                          {data.standard_credits}
                        </td>
                        <td className="table-body">
                          <button className="select-button">Select</button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* <div className="data-list">
        {(groupName && <h1>{groupName}</h1>) || <h1>{singleGN}</h1>}
        {listData ? (
          <table className="list-table">
            <thead>
              <tr>
                <th className="table-head">Service Activity</th>
                <th className="table-head">Service Description</th>
                <th className="table-head">Service Credits</th>
                <th className="table-head"> Action </th>
              </tr>
            </thead>
            <tbody>
              {listData &&
                listData.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td className="table-body">{data.service_activity}</td>
                      <td className="table-body">{data.service_description}</td>
                      <td className="table-body standart-credits">
                        {data.standard_credits}
                      </td>
                      <td className="table-body">
                        <button className="select-button">Select</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <table className="list-table">
            <thead>
              <tr>
                <th className="table-head">Service Activity</th>
                <th className="table-head">Service Description</th>
                <th className="table-head">Service Credits</th>
                <th className="table-head"> Action </th>
              </tr>
            </thead>
            <tbody>
              {singleG &&
                singleG.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td className="table-body">{data.service_activity}</td>
                      <td className="table-body">{data.service_description}</td>
                      <td className="table-body standart-credits">
                        {data.standard_credits}
                      </td>
                      <td className="table-body">
                        <button className="select-button">Select</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div> */}
      {/* <DataList
        groupName={groupName}
        singleGN={singleGN}
        listData={listData}
        singleG={singleG}
      /> */}
    </div>
  );
}

export default App;
