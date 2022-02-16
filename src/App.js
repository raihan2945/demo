import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import DataList from "./Data-List";

function App() {
  const [listData, setListData] = useState();
  const [groupData, setGroupData] = useState();
  const [groupName, setGroupName] = useState();

  // const [allGroupData, setAllGroupData] = useState();

  // const [singleG, setSingleG] = useState();
  // const [singleGN, setSingleGN] = useState();

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

        // setSingleG(groupDatas[0].doclist.docs);
        // setSingleGN(groupDatas[0].groupValue);
      });
  }, []);

  // console.log("single g is : ", singleG);

  const setListAarray = (e) => {
    if(e == "" || undefined){
      setListData();
      setGroupName();

      return;
    }
    const data = JSON.parse(e);
    setListData(data.doclist.docs);
    setGroupName(data.groupValue);
  };

  return (
    <div className="App">
      <div className="groupDataSection">
        <div className="groupData">
          <h1 className="service-header">Servie Credits Recommendation</h1>

          <div className="filter-section">
            <div className="select Group">
              <label for="tutorial_choice" className="choose-filter">Filter</label>

              <select onChange={(e) => setListAarray(e.target.value)}>
                <option style={{backgroundColor:"red", color:"white"}} value="">No Filter</option>
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
          </div>
        </div>
      </div>

      {listData && groupName ? (
        <DataList groupName={groupName} listData={listData} />
      ) : (
        groupData && groupData.map((group) => {
          // console.log("I'm called");
          return (
            <DataList
              key={group.groupValue}
              groupName={group.groupValue}
              listData={group.doclist.docs}
            />
          );
        })
      )}
    </div>
  );
}

export default App;
