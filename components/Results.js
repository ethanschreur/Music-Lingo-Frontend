import SongsRow from '../components/SongsRow';
import { v4 as uuid } from 'uuid';

export default function Results({ results }) {
    console.log(results)
    const rows = [
        { country: 'Russia', results, whichGroup: 0 },
        { country: 'Belarus', results, whichGroup: 0 },
        { country: 'Latvia', results, whichGroup: 0 },
        { country: 'Ukraine', results, whichGroup: 0 },
        { country: 'Kazakhstan', results, whichGroup: 0 },
    ];

    return [...rows.map((row) => {
        return <div className="relative" key={new uuid()}>
            <div className="mt-6 px-10 text-4xl font-black tracking-widest">{row.country}</div>
            <SongsRow row={row} />
        </div >
    })]
}
