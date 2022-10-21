import React from 'react'
import Popup from 'reactjs-popup'
import cx from 'classnames'
import { Icon } from '@/components/kit'
import { useFormContext } from '@/context/form/formContext'

function DropDown({ name, array, ActionType }) {
  // const { handleFormChange } = useContext(FormContext)
  const { dispatch } = useFormContext()

  return (
    <Popup
      trigger={
        <button className="menu-item flex my-auto ">
          <span>{array[0]}</span>
          <Icon
            className={cx('text-[#726DA6]', '')}
            icon="arrowDown"
            width={19}
            height={19}
          />
        </button>
      }
      position="bottom left"
      on="hover"
      closeOnDocumentClick
      // mouseLeaveDelay={100}
      mouseEnterDelay={0}
      contentStyle={{
        padding: '0px',
        border: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        maxWidth: '200px',
        // maxHeight: '40px'
      }}
      arrow={false}
    >
      <div className="menu">
        {array.map((el, index) => {
          if (index > 0)
            return (
              <div className="menu-item bg-black  h-10" key={index}>
                <button
                  onClick={() =>
                    dispatch({
                      type: ActionType,
                      name: name,
                      value: el,
                    })
                  }
                  className="bg-black w-full text-left hover:bg-[#fff]/20 px-2 py-1 rounded-md"
                  style={{ outline: 'none' }}
                >
                  {el}
                </button>
              </div>
            )
        })}
      </div>
    </Popup>
  )
}

export default DropDown
