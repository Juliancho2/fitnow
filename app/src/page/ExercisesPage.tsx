

import HeaderApp from '../components/HeaderApp'
import ListOfBodyParts from '../components/ListOfBodyParts'
import { bodyParts } from '../static'

const ExercisesPage = () => {
    return (
        <div className='min-h-[100vh] relative'>
            <HeaderApp />
            <div className='absolute opacity-10'>
                <img src="https://district0x.io/images/hero-blobs.png" alt="" />
            </div>
            <ListOfBodyParts data={bodyParts} />
        </div>
    )
}

export default ExercisesPage
