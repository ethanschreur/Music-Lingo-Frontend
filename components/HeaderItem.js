import router from "next/router"

export default function HeaderItem({ title, Icon, to }) {
    return (<a href={to}>
        <div className={title === 'SIGNUP' || title === 'LOGIN' ? "mx-5 flex flex-col items-center cursor-pointer group w-12 sm:w-20 text-[#2a2e45] dark:text-[#fdfdfd]" : "flex flex-col items-center cursor-pointer group w-12 sm:w-20 text-[#2a2e45] dark:text-[#fdfdfd]"}

        >
            <Icon className={"h-8 mb-1 group-hover:animate-bounce"} />
            <p className={title === 'SIGNUP' || title === 'LOGIN' ? "tracking-widest" : "opacity-0 group-hover:opacity-100 tracking-widest"}>{title}</p>

        </div> </a>
    )
}