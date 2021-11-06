import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import $ from 'jquery'
import { getNavItems } from '../utils/navUtils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useContext } from "react";
import UserContext from "../UserContext";
import { codeToLanguage } from '../utils/languageUtils'

export default function Nav({ type }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const router = useRouter();
    const navItems = getNavItems(type);
    const scrollPercent = 0.8;
    const [parentSize, setParentSize] = useState()
    const [initialClicksRemaining, setInitialClicksRemaining] = useState(0)
    const [totalClicksForward, setTotalClicksForward] = useState(0);
    const [blnHideBackward, setBlnHideBackward] = useState(true)
    const [blnHideForward, setBlnHideForward] = useState(true)

    useEffect(() => {
        const newChildSize = $('.nav')[0].scrollWidth;
        const newParentSize = $(document).width();
        setParentSize(newParentSize);
        const newInitialClicksRemaining = (Math.abs(Math.ceil((newChildSize - newParentSize) / (newParentSize * scrollPercent))))
        setInitialClicksRemaining(newInitialClicksRemaining);
        setBlnHideBackward(true);
        setBlnHideForward(newChildSize < newParentSize)
    }, [])

    const recalculateScrollProps = () => {
        const newChildSize = $('.nav')[0].scrollWidth;
        const newParentSize = $(document).width();
        setParentSize(newParentSize);
        const newInitialClicksRemaining = (Math.abs(Math.ceil((newChildSize - newParentSize) / (newParentSize * scrollPercent))))
        setInitialClicksRemaining(newInitialClicksRemaining);
        setBlnHideBackward(true);
        setBlnHideForward(newChildSize < newParentSize)
        $('.nav').animate({ scrollLeft: 0 }, 600)
        setTotalClicksForward(0)
    }

    useEffect(() => {
        window.addEventListener('resize', recalculateScrollProps);
        return () => {
            window.removeEventListener('resize', recalculateScrollProps)
        }
    })

    const goBackward = () => {
        $('.nav').animate({ scrollLeft: parentSize * scrollPercent * (totalClicksForward - 1) }, 600)
        setBlnHideBackward(totalClicksForward === 1)
        setBlnHideForward(totalClicksForward === initialClicksRemaining - 1)
        if (totalClicksForward >= 0) {
            setTotalClicksForward(tc => tc - 1)
        }
    }

    const goForward = () => {
        $('.nav').animate({ scrollLeft: parentSize * scrollPercent * (totalClicksForward + 1) }, 600)
        setBlnHideBackward(false)
        setBlnHideForward(totalClicksForward === initialClicksRemaining - 1)
        if (totalClicksForward < initialClicksRemaining) {
            setTotalClicksForward(tc => tc + 1)
        }
    }

    return (
        <nav className="relative overflow-y-visible ">
            {!blnHideBackward ? <div onClick={() => { goBackward() }} className="absolute group inset-y-0 left-0 top-1 flex items-center justify-start z-50 hover:bg-gradient-to-r from-[#fdfdfd] dark:from-[#2a2e45] w-1/12 h-full">
                <ChevronLeftIcon className="h-8 group-hover:h-10 mb-1" />
            </div> : <></>}
            {!blnHideForward ? <div onClick={() => { goForward() }} className="absolute group inset-y-0 right-0 top-1 flex items-center justify-end z-50 hover:bg-gradient-to-l from-[#fdfdfd] dark:from-[#2a2e45] w-1/12 h-full">
                <ChevronRightIcon className="h-8 group-hover:h-10 mb-1 d-hidden hover:block" />
            </div> : <></>}
            <div className="nav flex px-10 sm:px-20 text-2xl whitespace-nowrap space-x-10 sm:space-x-20
             overflow-x-scroll overflow-y-visible scrollbar-hide">
                {navItems.map((opt) => (
                    <h2 key={uuid()} onClick={() => { }}
                        className="py-5 last:pr-24 cursor-pointer transition duration-100
                        transform hover:scale-125 hover:text-[#2a2e45] dark:hover:text-[#fdfdfd]">
                        <a href={opt !== 'Logout' ? `/${codeToLanguage[currentUser?.current_language]?.toLowerCase()}/songs?p=${opt.toLowerCase().replace(' ', '-')}` : '/logout'}> {opt}</a>
                    </h2>

                ))}

            </div>
            {!blnHideBackward ? <div className="absolute top-0 left-0 bg-gradient-to-r from-[#fdfdfd] dark:from-[#2a2e45] h-full w-1/6 flex justify-end" /> : <></>}
            {!blnHideForward ? <div className="absolute top-0 right-0 bg-gradient-to-l from-[#fdfdfd] dark:from-[#2a2e45] h-full w-1/6 flex justify-end" /> : <></>}
        </nav >

    )
}
