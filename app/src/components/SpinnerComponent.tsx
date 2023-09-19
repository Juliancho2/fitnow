import React from 'react'

type Props={
  styles:string
}
const SpinnerComponent = ({ styles }:Props) => {
  return (
    <div className={styles}>

    </div>
  )
}

export default SpinnerComponent
