import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { debounce } from "lodash"
import Layout from "../components/layouts/Layout";
import {Option} from "../components/molecules/Select";
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchTracks, trackSelector } from "../features/tracks";
import Loader from "../components/atoms/Loader";

const Home = () => {
    const dispatch = useAppDispatch();

    const options: Option[] = [
        {title: 'All', name: 'q'}, 
        {title: 'Artist', name: 'artist'}, 
        {title: 'Label', name: 'label'}, 
        {title: 'Album', name: 'album'}
    ];
    const [search, setSearch] = useState<string>('');
    const [type, setType] = useState<string>('q');

    const {pending, tracks} = useAppSelector(trackSelector);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.value;
        setType(name);
    }

    // delay dispatch for 500 miliseconds to avoid multiple request to API
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedDispatch = useCallback(
        debounce((type_, search_) => {
            dispatch(fetchTracks({params: `${type_}=${search_}`}))
        }, 500)
      , []);

    useEffect(() => {
        debouncedDispatch(type, search)
    }, [debouncedDispatch, type, search])

    return (
        <Layout>
            <>
                <div className="w-full flex justify-center p-5 shadow-sm bg-gray-100">
                    <div className=" bg-gray-300 inset-y-0 flex items-center border-1 border-slate-600">
                        <select
                            id="type"
                            name="type"
                            className="h-full bg-gray-100 rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-teal-500 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                            onChange={handleSelect}
                            value={type}
                        >
                            {options.map(item =>(<option key={item.name} value={item.name}>{item.title}</option>))}
                        </select>
                    </div>
                    <input
                        type="text"
                        name="serach"
                        id="search"
                        value={search}
                        className="block w-3/4 h-10 pl-1 bg-gray-100 border-2 border-gray-200 border-r-0 focus:outline-none sm:text-sm"
                        placeholder="Eminem"
                        onChange={onChange}
                    />
                    <div className="bg-gray-100 border-2 border-gray-200 border-l-0 rounded-r-sm inset-y-0 flex items-center px-2">
                    <MagnifyingGlassIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:gap-4 w-full px-10 py-5">
                    {tracks && tracks.map((track, index) => (
                        <div className="bg-gray-100 rounded-lg border-2 border-slate-200 mb-5" key={track.id}>
                            <div className="w-full h-auto bg-teal-100">
                                <img src={track.artist.picture} alt="Song cover" className="w-full rounded-t-sm" />
                            </div>
                            <div className="p-5">
                                <div className="text-teal-600 font-bold text-xl">{track.title}</div>
                                <div className="text-sm font-thin">By <Link to={`/artist/${track.artist.id}`} className="text-sm text-sky-700 font-bold underline">{track.artist.name}</Link></div>
                                <div className="text-sm font-light"><span className="text-xs font-semibold">Album:</span> {track.album.title}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col w-full px-10 py-5">
                    {(!pending && tracks.length === 0) && (
                        <div className="text-3xl font-bold text-teal-400 text-center w-full">
                            No Tracks found. Update search values 
                        </div>
                    ) }
                    {pending && (<Loader />)}
                </div>
            </>
        </Layout>
    )
}

export default Home;