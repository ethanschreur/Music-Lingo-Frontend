import Image from 'next/image';
import { forwardRef } from 'react';

// forward ref was mentioned in the hulu video
const Thumbnail = forwardRef(({ res }, ref) => {
    return (
        < div ref={ref} className='p-2 group cursor-pointer transition duration-200 ease-in
           transform hover:scale-105 z-20 hover:z-30'>
            <Image className="rounded-lg" layout="responsive" src={`https://i.ytimg.com/vi/${res.track.video_id}/maxresdefault.jpg`} height={360} width={640} />
            <div className="p-2">
                <h2 className="mt-1 text-2xl text-[#2a2e45] dark:text-[#e6e2e7] transition-all 
                    duration-100 ease-in-out group-hover:font-bold">
                    {res.track.track_name}
                </h2>
                <div className="mt-1 text-1xl">{res.track.artist_name}</div>
            </div>
        </div >
    )
})

export default Thumbnail;