import React from 'react'
import InfoBox from '@/components/InfoBox'
const InfoBoxes = () => {
  return (
    <div>
      <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
           <InfoBox
                heading='For Renters'
                backgroundColor='bg-gray-100'
                buttonInfo={{
                  link: '/properties',
                  backgroundColor: 'bg-black',
                  text: 'Browse Properties'
                }}
            >
                Find your dream rental property. Bookmark properties and contact owners.
            </InfoBox>
            <InfoBox
                heading='For Owners'
                backgroundColor='bg-blue-100'
                buttonInfo={{
                  link: '/properties/add',
                  backgroundColor: 'bg-blue-500',
                  text: 'Add Property'
                }}
            >
                List your property for rent. Rent as an airbnb or long-term rental.
            </InfoBox>
        </div>
      </div>
    </section>
    </div>
  )
}

export default InfoBoxes
