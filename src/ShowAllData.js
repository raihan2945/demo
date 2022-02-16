import React, { Fragment } from 'react'

const ShowAllData = () => {
  return (
    <Fragment>
        <div>
            {props.children}
        </div>
    </Fragment>
  )
}

export default ShowAllData