import React from 'react'
import { useOptionFormContext } from '@/context/form/OptionFormContext'
import { Setting } from './setting'

function AdvancedSettings({ className }) {
  const { formData } = useOptionFormContext()
  return (
    <>
      {Object.keys(formData.advancedSettings).map(
        (el, index) =>
          (el !== 'optionType' && el !== 'modelParams')  && (
            <Setting
              name={el}
              value={formData.advancedSettings[el]}
              className={className}
            />
          ),
      )}
    </>
  )
}

export default AdvancedSettings
