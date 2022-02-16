import React from 'react'

const DataList = (props) => {
    const {groupName,  listData } = props;
  return (
    <div className="data-list">
        {(groupName && <h1>{groupName}</h1>)}
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
      </div>
  )
}

export default DataList