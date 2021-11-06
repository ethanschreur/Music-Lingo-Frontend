import Thumbnail from '../components/Thumbnail';
import { v4 as uuid } from 'uuid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useState } from 'react'

export default function SongsRow({ row }) {
    const [results, setResults] = useState(row);

    const goLeft = () => {
        setTimeout(() => {
            setResults((r) => {
                const newR = { ...r };
                newR.whichGroup -= 1;
                return newR;
            })
        }, 400);
    };

    const goRight = () => {
        if (row.results.length / 4 - 1 >= results.whichGroup) {
            setTimeout(() => {
                setResults((r) => {
                    const newR = { ...r };
                    newR.whichGroup += 1;
                    return newR;
                })
            }, 400);
        }
    }

    return (
        <div className="">
            {results.whichGroup !== 0 ? <div onClick={goLeft} className="absolute group inset-y-0 left-0 flex items-center justify-start z-50 hover:bg-gradient-to-r from-[#fdfdfd] dark:from-[#2a2e45] w-1/12 h-full">
                <ChevronLeftIcon className="h-8 group-hover:h-10 mb-1" />
            </div> : <></>}
            <div onClick={goRight} className="absolute group inset-y-0 right-0 flex items-center justify-end z-50 hover:bg-gradient-to-l from-[#fdfdfd] dark:from-[#2a2e45] w-1/12 h-full">
                <ChevronRightIcon className="h-8 group-hover:h-10 mb-1 d-hidden hover:block" />
            </div>
            <div className='px-8 sm-px-12 mt-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl2:grid-cols-4'>
                {[[...results.results].splice(results.whichGroup * 4, 4).map((r) => {
                    return <Thumbnail key={uuid()} res={r} />;
                })
                ]}
            </div>
        </div>
    )
}
